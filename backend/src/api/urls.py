from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from .views import (
    CollectionListView,
    MaterialListView,
    ProductDetailView,
    ProductListView,
    about_page_settings,
    main_collection,
)

urlpatterns = [
    path('about/', about_page_settings, name='about-page-settings'),
    path('collections/', CollectionListView.as_view(), name='collections-list'),
    path('collections/main/', main_collection, name='main-collection'),
    path('products/', ProductListView.as_view(), name='products-list'),
    path('materials/', MaterialListView.as_view(), name='materials-detail'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
