<template>
  <NuxtLink :to="`/products/${product.id}`" class="product-container">
    <NuxtImg :src="product.main_image" :alt="product.name" />
    <div class="product-info">
      <div class="product-description">
        <div class="product-name">{{ product.name }}</div>
        <div class="product-title">{{ product.title }}</div>
      </div>
      <div class="product-price">{{ formatPrice(product.price) }} ₽</div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({ product: Object });

const formatPrice = (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('ru-RU').format(value);
};
</script>

<style lang="scss" scoped>
@use '~/assets/styles/products.scss';
</style>
