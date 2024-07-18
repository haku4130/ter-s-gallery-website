# serializers.py

from rest_framework import serializers
from .models import Product, ProductImage, Material, Color, Collection


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['name']


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['name']


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ['id', 'name', 'main_image', 'description']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    materials = MaterialSerializer(many=True, read_only=True)
    colors = ColorSerializer(many=True, read_only=True)
    main_image = ProductImageSerializer(read_only=True)
    collection = CollectionSerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            'name',
            'title',
            'price',
            'main_image',
            'description',
            'year_created',
            'size',
            'materials',
            'colors',
            'images',
            'collection',
        ]
