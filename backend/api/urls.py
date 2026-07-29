from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet, basename='category')
router.register(r'brands', views.BrandViewSet, basename='brand')
router.register(r'products', views.ProductViewSet, basename='product')
router.register(r'orders', views.OrderViewSet, basename='order')

urlpatterns = [
    path('', include(router.urls)),
    path('checkout/', views.checkout_api, name='checkout'),
    path('dashboard/analytics/', views.DashboardAnalyticsAPI.as_view(), name='dashboard_analytics'),
    path('contact/', views.submit_contact, name='submit_contact'),
    path('partner/', views.submit_partner, name='submit_partner'),
    
    # Auth Endpoints routed to Accounts App
    path('auth/', include('accounts.urls')),
]
