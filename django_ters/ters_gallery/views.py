from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from .models import Product, Collection
from .serializers import ProductSerializer


class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


def index(request):
    main_collection = Collection.objects.filter(is_main=True).first()
    products = main_collection.products.all() if main_collection else []
    context = {'collection': main_collection, 'products': products}
    return render(request, 'index.html', context)


def products(request):
    return render(request, 'products.html')


def product_detail(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    return render(request, 'detail.html', {'product': product})


def about(request):
    return render(request, 'about.html')


def contacts(request):
    return render(request, 'contacts.html')
