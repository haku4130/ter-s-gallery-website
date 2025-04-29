from rest_framework import serializers
from .models import (
    Collection,
    Material,
    Color,
    Product,
    ProductImage,
    AboutPageSettings,
)


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ["id", "name", "description", "main_image", "is_main"]


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ["id", "name", "image"]


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ["id", "name"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "product"]


class ProductSerializer(serializers.ModelSerializer):
    main_image = ProductImageSerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    materials = MaterialSerializer(many=True, read_only=True)
    colors = ColorSerializer(many=True, read_only=True)
    collection = CollectionSerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "title",
            "price",
            "main_image",
            "description",
            "year_created",
            "size",
            "materials",
            "colors",
            "collection",
            "images",
        ]


class AboutPageSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPageSettings
        fields = ["top_image", "bottom_image"]
