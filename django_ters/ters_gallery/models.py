from django.db import models
from django.core.exceptions import ValidationError


class Collection(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    main_image = models.ImageField(upload_to='collections/')
    is_main = models.BooleanField(
        default=False,
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


class Material(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Color(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


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


class ProductImage(models.Model):
    image = models.ImageField(upload_to='products/')
    product = models.ForeignKey(
        Product, related_name='images', on_delete=models.CASCADE
    )

    def __str__(self):
        return self.image.name
