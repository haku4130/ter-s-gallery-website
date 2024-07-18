from django.contrib import admin
from .models import Product, ProductImage, Material, Color, Collection


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]
    list_display = ('name', 'title', 'price', 'year_created', 'size')
    search_fields = ('name', 'title')
    list_filter = ('year_created', 'materials', 'colors')


admin.site.register(Material)
admin.site.register(Color)
admin.site.register(Collection)
