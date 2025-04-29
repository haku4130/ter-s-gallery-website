from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Product,
    ProductImage,
    Material,
    Color,
    Collection,
    AboutPageSettings,
)


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    readonly_fields = ("image_preview",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    def image_preview(self, obj):
        return obj.image_preview()

    image_preview.short_description = "Основное изображение"

    inlines = [ProductImageInline]
    list_display = ("name", "title", "price", "year_created", "size", "image_preview")
    list_editable = ("price", "year_created", "size")
    search_fields = ("name", "title")
    list_filter = ("year_created", "materials", "colors")
    filter_horizontal = ("materials", "colors")


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "get_main_image", "is_main")
    list_editable = ("is_main",)
    search_fields = ("name",)
    list_filter = ("name", "is_main")

    def save_model(self, request, obj, form, change):
        if obj.is_main:
            Collection.objects.filter(is_main=True).update(is_main=False)
        super().save_model(request, obj, form, change)

    def get_main_image(self, obj):
        if obj.main_image:
            return format_html(
                '<img src="{}" width="150" height="150" />'.format(obj.main_image.url)
            )
        return None

    get_main_image.short_description = "Главное изображение"

    def formfield_for_dbfield(self, db_field, request, **kwargs):
        formfield = super().formfield_for_dbfield(db_field, request, **kwargs)

        if db_field.name == "main_image":
            obj_id = request.resolver_match.kwargs.get("object_id")
            if obj_id:
                try:
                    instance = Collection.objects.get(pk=obj_id)
                    if instance.main_image:
                        formfield.help_text = format_html(
                            '<img src="{}" style="max-height: 200px;"/>',
                            instance.main_image.url,
                        )
                except Collection.DoesNotExist:
                    pass
        return formfield


@admin.register(AboutPageSettings)
class AboutPageSettingsAdmin(admin.ModelAdmin):
    fields = ("top_image", "bottom_image")

    def formfield_for_dbfield(self, db_field, request, **kwargs):
        formfield = super().formfield_for_dbfield(db_field, request, **kwargs)

        if db_field.name == "top_image":
            obj_id = request.resolver_match.kwargs.get("object_id")
            if obj_id:
                try:
                    instance = AboutPageSettings.objects.get(pk=obj_id)
                    if instance.top_image:
                        formfield.help_text = format_html(
                            '<img src="{}" style="max-height: 200px;"/>',
                            instance.top_image.url,
                        )
                except AboutPageSettings.DoesNotExist:
                    pass

        if db_field.name == "bottom_image":
            obj_id = request.resolver_match.kwargs.get("object_id")
            if obj_id:
                try:
                    instance = AboutPageSettings.objects.get(pk=obj_id)
                    if instance.bottom_image:
                        formfield.help_text = format_html(
                            '<img src="{}" style="max-height: 200px;"/>',
                            instance.bottom_image.url,
                        )
                except AboutPageSettings.DoesNotExist:
                    pass

        return formfield


admin.site.register(Material)
admin.site.register(Color)
