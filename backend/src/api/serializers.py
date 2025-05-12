from rest_framework import serializers

from .models import (
    AboutPageSettings,
    Collection,
    Color,
    Material,
    Product,
    ProductImage,
)


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ['id', 'name', 'description', 'main_image', 'is_main']


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'name', 'image']


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'name']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']


class ImageUrlField(serializers.CharField):
    def to_representation(self, value):
        request = self.context.get('request', None)
        url = value.url if value else None
        return request.build_absolute_uri(url) if request and url else url


class ProductSerializer(serializers.ModelSerializer):
    main_image = ImageUrlField(source='main_image.image', read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    materials = MaterialSerializer(many=True, read_only=True)
    colors = ColorSerializer(many=True, read_only=True)
    collection = CollectionSerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'title',
            'price',
            'main_image',
            'description',
            'year_created',
            'size',
            'materials',
            'colors',
            'collection',
            'images',
        ]


class ShortProductSerializer(ProductSerializer):
    class Meta(ProductSerializer.Meta):
        fields = ['id', 'name', 'title', 'main_image']


class MainCollectionSerializer(CollectionSerializer):
    products = ShortProductSerializer(many=True, read_only=True)

    class Meta(CollectionSerializer.Meta):
        fields = ['id', 'name', 'description', 'main_image', 'products']


class AboutPageSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPageSettings
        fields = ['top_image', 'bottom_image', 'ideology_text', 'materials_text', 'production_text']
