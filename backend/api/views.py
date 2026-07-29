from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Sum, Count, Q
from django.utils import timezone
from datetime import timedelta
import json

from .models import (
    Category, Brand, Product, Order, OrderItem, ShippingAddress,
    ContactMessage, PartnerLead
)
from .serializers import (
    CategorySerializer, BrandSerializer, ProductSerializer, OrderSerializer,
    ContactMessageSerializer, PartnerLeadSerializer
)



class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    lookup_field = 'slug'

class BrandViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Brand.objects.filter(is_active=True)
    serializer_class = BrandSerializer
    lookup_field = 'slug'

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProductSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True).select_related('category', 'brand').prefetch_related('gallery_images', 'variants', 'videos')
        
        # Filtering
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
            
        brand_slug = self.request.query_params.get('brand')
        if brand_slug:
            queryset = queryset.filter(brand__slug=brand_slug)
            
        search_query = self.request.query_params.get('search')
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) | 
                Q(meta_keywords__icontains=search_query) |
                Q(tags__icontains=search_query) |
                Q(description__icontains=search_query)
            )
            
        # Quick flags
        if self.request.query_params.get('is_bestseller') == 'true':
            queryset = queryset.filter(is_bestseller=True)
        if self.request.query_params.get('new_arrival') == 'true':
            queryset = queryset.filter(new_arrival=True)
            
        return queryset

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    
    def get_queryset(self):
        # Customers can only see their own orders. Admins can see all.
        user = self.request.user
        if user.is_staff:
            return Order.objects.all().order_by('-created_at')
        if user.is_authenticated:
            return Order.objects.filter(user=user).order_by('-created_at')
        # Fallback for guests via session
        session_key = self.request.session.session_key
        if session_key:
            return Order.objects.filter(session_key=session_key).order_by('-created_at')
        return Order.objects.none()

@api_view(['POST'])
def checkout_api(request):
    """
    Handles complete checkout payload:
    {
       "cart": [{"product_id": 1, "quantity": 2, "variant_id": null}],
       "address": {"full_name": "...", "phone": "...", "city": "...", "address_line_1": "...", ...},
       "payment_method": "COD"
    }
    """
    data = request.data
    cart = data.get('cart', [])
    address_data = data.get('address', {})
    
    if not cart:
        return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)
        
    # 1. Create Address
    user = request.user if request.user.is_authenticated else None
    session_key = request.session.session_key
    if not session_key:
        request.session.create()
        session_key = request.session.session_key

    address = ShippingAddress.objects.create(
        user=user,
        session_key=session_key,
        full_name=address_data.get('full_name', ''),
        phone=address_data.get('phone', ''),
        address_line_1=address_data.get('address_line_1', ''),
        city=address_data.get('city', ''),
        state=address_data.get('state', ''),
        postal_code=address_data.get('postal_code', ''),
        country=address_data.get('country', 'India')
    )

    # 2. Create Order
    total = 0
    order = Order.objects.create(
        user=user,
        session_key=session_key,
        shipping_address=address,
        total_amount=0,
        payment_method=data.get('payment_method', 'COD'),
        status='PENDING' # Signals handle stock logic later when moving to CONFIRMED
    )
    
    # 3. Add Items & Validate Stock
    for item in cart:
        try:
            prod = Product.objects.get(id=item['product_id'])
            qty = item['quantity']
            
            # Stock Validation
            if prod.available_stock < qty:
                order.delete() # Rollback order
                return Response({
                    "error": f"Insufficient stock for {prod.name}. Available: {prod.available_stock}"
                }, status=status.HTTP_400_BAD_REQUEST)
                
            price = prod.sale_price or prod.original_price
            OrderItem.objects.create(
                order=order,
                product=prod,
                quantity=qty,
                price=price
            )
            total += (price * qty)
        except Product.DoesNotExist:
            pass
            
    order.total_amount = total
    
    # Auto-confirm for COD
    if order.payment_method == 'COD':
        order.status = 'CONFIRMED'
        
    order.save()
    
    return Response({
        "success": True, 
        "order_id": order.order_id,
        "message": "Order placed successfully"
    })

class DashboardAnalyticsAPI(APIView):
    """
    Returns data for the Sales Dashboard requested by the user.
    """
    def get(self, request):
        if not request.user.is_staff:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)
            
        today = timezone.now().date()
        week_start = today - timedelta(days=today.weekday())
        month_start = today.replace(day=1)
        
        # Totals
        today_orders = Order.objects.filter(created_at__date=today)
        week_orders = Order.objects.filter(created_at__date__gte=week_start)
        month_orders = Order.objects.filter(created_at__date__gte=month_start)
        
        today_rev = today_orders.aggregate(s=Sum('total_amount'))['s'] or 0
        week_rev = week_orders.aggregate(s=Sum('total_amount'))['s'] or 0
        month_rev = month_orders.aggregate(s=Sum('total_amount'))['s'] or 0
        total_rev = Order.objects.aggregate(s=Sum('total_amount'))['s'] or 0
        
        # Order Statuses
        pending = Order.objects.filter(status='PENDING').count()
        delivered = Order.objects.filter(status='DELIVERED').count()
        cancelled = Order.objects.filter(status='CANCELLED').count()
        
        # Stock Alerts
        low_stock_products = []
        for p in Product.objects.filter(is_active=True):
            if p.stock_status_customer in ['Low Stock', 'Out of Stock']:
                low_stock_products.append({
                    "id": p.id,
                    "name": p.name,
                    "stock": p.available_stock,
                    "status": p.stock_status_customer
                })
                
        return Response({
            "today_revenue": today_rev,
            "week_revenue": week_rev,
            "month_revenue": month_rev,
            "total_revenue": total_rev,
            "pending_orders": pending,
            "delivered_orders": delivered,
            "cancelled_orders": cancelled,
            "low_stock_alerts": low_stock_products
        })

@api_view(['POST'])
def submit_contact(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True}, status=status.HTTP_201_CREATED)
    return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def submit_partner(request):
    serializer = PartnerLeadSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True}, status=status.HTTP_201_CREATED)
    return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
