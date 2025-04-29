from django.urls import path
from .views import (
    CollectionListView,
    main_collection,
    ProductListView,
    ProductDetailView,
    MaterialListView,
    about_page_settings,
)

urlpatterns = [
    path("collections/", CollectionListView.as_view(), name="collections-list"),
    path("collections/main/", main_collection, name="main-collection"),
    path("products/", ProductListView.as_view(), name="products-list"),
    path("products/<int:pk>/", ProductDetailView.as_view(), name="product-detail"),
    path("materials/", MaterialListView.as_view(), name="materials-detail"),
    path("about/", about_page_settings, name="about-page-settings"),
]
