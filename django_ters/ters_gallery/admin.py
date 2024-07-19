from django.contrib import admin
from .models import (
    Product,
    ProductImage,
    Material,
    Color,
    Collection,
)


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]
    list_display = ('name', 'title', 'price', 'year_created', 'size')
    list_editable = ('price', 'year_created', 'size')
    search_fields = ('name', 'title')
    list_filter = ('year_created', 'materials', 'colors')
    filter_horizontal = ('materials', 'colors')


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'get_main_image', 'is_main')
    list_editable = ('is_main',)
    search_fields = ('name',)
    list_filter = ('name', 'is_main')

    def save_model(self, request, obj, form, change):
        if obj.is_main:
            Collection.objects.filter(is_main=True).update(is_main=False)
        super().save_model(request, obj, form, change)

    def get_main_image(self, obj):
        if obj.main_image:
            return obj.main_image.url
        return None

    get_main_image.short_description = 'Main Image URL'


admin.site.register(Material)
admin.site.register(Color)
