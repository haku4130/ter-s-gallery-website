# views.py
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Collection, Product, Material, AboutPageSettings
from .serializers import (
    CollectionSerializer,
    ProductSerializer,
    MaterialSerializer,
    AboutPageSettingsSerializer,
)


class CollectionListView(generics.ListAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer


@api_view(["GET"])
def main_collection(request):
    collection = Collection.objects.filter(is_main=True).first()
    if not collection:
        return Response({"detail": "Main collection not set."}, status=404)
    serializer = CollectionSerializer(collection, context={"request": request})
    return Response(serializer.data)


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class MaterialListView(generics.ListAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer


@api_view(["GET"])
def about_page_settings(request):
    settings = AboutPageSettings.objects.first()
    if not settings:
        return Response({"detail": "No settings found."}, status=404)
    serializer = AboutPageSettingsSerializer(settings, context={"request": request})
    return Response(serializer.data)
