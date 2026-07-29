from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
import csv
from django.http import HttpResponse
from .models import (
    Category, Brand, Product, ProductImage, ProductVideo, ProductVariant,
    StockMovementLog, Coupon, UserProfile, ShippingAddress, Order, OrderItem,
    ProductReview, Wishlist, ContactMessage, PartnerLead
)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1

class ProductVideoInline(admin.TabularInline):
    model = ProductVideo
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('image_thumbnail', 'name', 'sku', 'category', 'price_display', 'stock_status_display', 'is_active')
    list_display_links = ('image_thumbnail', 'name')
    list_filter = ('category', 'brand', 'is_active', 'is_featured', 'is_bestseller', 'new_arrival')
    search_fields = ('name', 'sku', 'barcode', 'tags')
    list_editable = ('is_active',)
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('reserved_stock',)
    inlines = [ProductImageInline, ProductVariantInline, ProductVideoInline]
    
    actions = ['make_active', 'make_inactive', 'export_as_csv']

    def export_as_csv(self, request, queryset):
        meta = self.model._meta
        field_names = [field.name for field in meta.fields]
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename={meta}.csv'
        writer = csv.writer(response)
        writer.writerow(field_names)
        for obj in queryset:
            writer.writerow([getattr(obj, field) for field in field_names])
        return response
    export_as_csv.short_description = "Export Selected as CSV"

    def get_queryset(self, request):
        # We need this to quickly access related objects or just optimize
        return super().get_queryset(request).select_related('category', 'brand')

    @admin.display(description='Preview')
    def image_thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;" />', obj.image.url)
        return mark_safe('<span style="display:inline-block; width:40px; height:40px; background:#eee; border-radius:4px;"></span>')

    @admin.display(description='Price')
    def price_display(self, obj):
        return f"₹{obj.sale_price or obj.original_price or 0:,.2f}"

    @admin.display(description='Stock Status')
    def stock_status_display(self, obj):
        status = obj.stock_status_customer
        if status == 'Out of Stock':
            color = 'red'
            bg = '#ffebee'
        elif status == 'Low Stock':
            color = '#e65100'
            bg = '#fff3e0'
        else:
            color = 'green'
            bg = '#e8f5e9'
        return format_html(
            '<span style="color:{}; background:{}; padding:4px 8px; border-radius:4px; font-weight:bold;">{} ({} available)</span>',
            color, bg, status, obj.available_stock
        )

    @admin.action(description='Mark selected as Active')
    def make_active(self, request, queryset):
        queryset.update(is_active=True)

    @admin.action(description='Mark selected as Inactive')
    def make_inactive(self, request, queryset):
        queryset.update(is_active=False)


@admin.register(StockMovementLog)
class StockMovementLogAdmin(admin.ModelAdmin):
    list_display = ('product', 'reason', 'quantity_changed', 'previous_quantity', 'new_quantity', 'created_at', 'user')
    list_filter = ('reason', 'created_at')
    search_fields = ('product__name', 'reference')
    readonly_fields = ('product', 'previous_quantity', 'new_quantity', 'quantity_changed', 'reason', 'user', 'reference', 'created_at')

    def has_add_permission(self, request):
        return False

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'variant', 'quantity', 'price')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'user_display', 'total_amount', 'status', 'payment_status', 'created_at')
    list_filter = ('status', 'payment_status', 'created_at')
    search_fields = ('order_id', 'user__username', 'user__email', 'shipping_address__full_name')
    readonly_fields = ('order_id', 'created_at', 'updated_at')
    inlines = [OrderItemInline]
    actions = ['export_as_csv']

    def export_as_csv(self, request, queryset):
        meta = self.model._meta
        field_names = [field.name for field in meta.fields]
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename={meta}.csv'
        writer = csv.writer(response)
        writer.writerow(field_names)
        for obj in queryset:
            writer.writerow([getattr(obj, field) for field in field_names])
        return response
    export_as_csv.short_description = "Export Selected Orders as CSV"
    
    @admin.display(description='Customer')
    def user_display(self, obj):
        if obj.user:
            return obj.user.email or obj.user.username
        if obj.shipping_address:
            return f"Guest ({obj.shipping_address.full_name})"
        return "Guest"

@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('code', 'discount_amount', 'discount_percentage', 'valid_from', 'valid_to', 'is_active')
    search_fields = ('code',)
    list_filter = ('is_active',)

@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'city', 'state', 'phone', 'user')
    search_fields = ('full_name', 'phone', 'city')

@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'user', 'rating', 'is_approved', 'created_at')
    list_filter = ('is_approved', 'rating', 'created_at')
    search_fields = ('product__name', 'user__username', 'title')

@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'created_at')
    search_fields = ('user__username', 'product__name')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'subject', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject')

@admin.register(PartnerLead)
class PartnerLeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'country', 'email', 'product_interests', 'created_at')
    list_filter = ('country', 'created_at')
    search_fields = ('name', 'company', 'email')
