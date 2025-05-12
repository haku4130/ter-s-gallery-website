from django.db import models
from django.utils.html import format_html
from django_ckeditor_5.fields import CKEditor5Field


class Collection(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    main_image = models.ImageField(upload_to='collections/')
    is_main = models.BooleanField(
        default=False,
        verbose_name='Отображать на главной странице',
        help_text='Выбор коллекции для отображения на главной странице. При выборе, заменяет выбранную до этого момента.',
    )

    @classmethod
    def get_default_pk(cls):
        collection, created = cls.objects.get_or_create(
            name='default collection',
            defaults=dict(
                description='Default collection',
                main_image='collections/main.jpg',
            ),
        )
        return collection.pk

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Коллекция'
        verbose_name_plural = 'Коллекции'


class Material(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='materials/', default='materials/LEATHER.JPG')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Материал'
        verbose_name_plural = 'Материалы'


class Color(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Цвет'
        verbose_name_plural = 'Цвета'


class Product(models.Model):
    name = models.CharField(max_length=100, help_text='Название')
    title = models.CharField(max_length=100, help_text='Тип продукта')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    main_image = models.ForeignKey(
        'ProductImage',
        related_name='main_for_products',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    description = models.TextField()
    year_created = models.PositiveIntegerField()
    size = models.CharField(max_length=100)
    materials = models.ManyToManyField('Material', related_name='products')
    colors = models.ManyToManyField('Color', related_name='products')
    collection = models.ForeignKey(
        'Collection',
        related_name='products',
        on_delete=models.CASCADE,
        default=Collection.get_default_pk,
    )

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super(Product, self).save(*args, **kwargs)
        if not self.main_image and self.images.exists():
            self.main_image = self.images.first()
            super(Product, self).save(*args, **kwargs)

    def image_preview(self):
        return format_html('<img src="{}" width="150" height="150" />'.format(self.main_image.image.url))

    class Meta:
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'


class ProductImage(models.Model):
    image = models.ImageField(upload_to='products/')
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    is_main = models.BooleanField(default=False, verbose_name='Основная картинка')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.is_main:
            # Убираем флажок is_main у всех остальных картинок
            self.product.images.filter(is_main=True).exclude(pk=self.pk).update(is_main=False)
            # Обновляем main_image у продукта
            self.product.main_image = self
            self.product.save(update_fields=['main_image'])
        else:
            # Если все картинки убрали флажок is_main, сбрасываем main_image
            if not self.product.images.filter(is_main=True).exists():
                self.product.main_image = None
                self.product.save(update_fields=['main_image'])

    def __str__(self):
        return self.image.name

    def image_preview(self):
        return format_html('<img src="{}" width="150" height="150" />'.format(self.image.url))


class AboutPageSettings(models.Model):
    top_image = models.ImageField(upload_to='about_page/')
    bottom_image = models.ImageField(upload_to='about_page/')
    ideology_text = CKEditor5Field(
        'Идеология',
        config_name='extends',
        help_text='Текст, который будет отображаться на странице "О нас" в разделе "Идеология"',
    )
    materials_text = CKEditor5Field(
        'Материалы',
        config_name='extends',
        help_text='Текст, который будет отображаться на странице "О нас" в разделе "Материалы"',
    )
    production_text = CKEditor5Field(
        'Производство',
        config_name='extends',
        help_text='Текст, который будет отображаться на странице "О нас" в разделе "Производство"',
    )

    def save(self, *args, **kwargs):
        if not self.pk and AboutPageSettings.objects.exists():
            raise ValueError('Можно создать только одну запись AboutPageSettings.')
        super().save(*args, **kwargs)

    def __str__(self):
        return "Настройки страницы 'О нас'"

    class Meta:
        verbose_name = "Настройки страницы 'О нас'"
        verbose_name_plural = "Настройки страницы 'О нас'"
