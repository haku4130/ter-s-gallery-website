from django.urls import path
from .views import (
    index,
    products,
    product_detail,
    about,
    contacts,
    ProductListAPIView,
)

urlpatterns = [
    path('', index, name='home'),
    path('products/', products, name='products'),
    path('products/<int:product_id>/', product_detail, name='product_detail'),
    path('about/', about, name='about'),
    path('contacts/', contacts, name='contacts'),
    path('api/products/', ProductListAPIView.as_view(), name='product-list'),
]
