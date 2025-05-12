from django.db.models import Prefetch
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import AboutPageSettings, Collection, Material, Product
from .serializers import (
    AboutPageSettingsSerializer,
    CollectionSerializer,
    MainCollectionSerializer,
    MaterialSerializer,
    ProductSerializer,
)


class CollectionListView(generics.ListAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer


@api_view(['GET'])
def main_collection(request):
    collection = (
        Collection.objects.filter(is_main=True)
        .prefetch_related(Prefetch('products', queryset=Product.objects.select_related('main_image')))
        .first()
    )
    if not collection:
        return Response({'detail': 'Main collection not set.'}, status=404)
    serializer = MainCollectionSerializer(collection, context={'request': request})
    return Response(serializer.data)


class ProductListView(generics.ListAPIView):
    queryset = (
        Product.objects.all()
        .select_related('main_image', 'collection')
        .prefetch_related('materials', 'colors', 'images')
    )
    serializer_class = ProductSerializer


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class MaterialListView(generics.ListAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer


@api_view(['GET'])
def about_page_settings(request):
    settings = AboutPageSettings.objects.first()
    if not settings:
        return Response({'detail': 'No settings found.'}, status=404)
    serializer = AboutPageSettingsSerializer(settings, context={'request': request})
    return Response(serializer.data)
