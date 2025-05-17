<template>
  <div class="main-collection" v-if="collection">
    <NuxtImg :src="collection.main_image" :alt="collection.name" />
  </div>

  <div class="main-content" v-if="collection">
    <div class="main-collection-info">
      <div class="main-collection-info-container">
        <div class="left-side">
          <div class="main-collection-info-header">КОЛЛЕКЦИЯ</div>
          <div class="main-collection-info-description">
            {{ collection.name }}
          </div>
        </div>
        <div class="all-products-button cursor-link">
          <NuxtLink to="/products">ВСЕ ПРОДУКТЫ</NuxtLink>
        </div>
      </div>
    </div>

    <div class="gallery">
      <NuxtLink
        v-for="product in collection.products"
        :key="product.id"
        :to="`/products/${product.id}`"
        class="gallery-item cursor-link"
        :id="`product_${product.id}`"
      >
        <NuxtImg :src="product.main_image" :alt="product.name" />
        <div class="gallery-item-info">
          <div class="name">{{ product.name }}</div>
          <div class="category">{{ product.title.toUpperCase() }}</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { data: collection } = await useFetch('/api/collections/main/');

useSeoMeta({
  title: 'Главная – ter’s gallery',
  ogTitle: 'Ter’s Gallery: Home',
  description:
    'TER’S - производитель мебели и предметов интерьера с вниманием к деталям. Мы стремимся воплощать принципы архитектуры, продумывая пропорции, исследуя тему модульности и стремясь к чистоте формы.',
  ogDescription:
    'TER’S - производитель мебели и предметов интерьера с вниманием к деталям. Мы стремимся воплощать принципы архитектуры, продумывая пропорции, исследуя тему модульности и стремясь к чистоте формы.',
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/index.scss';

#product_4 {
  height: 17rem;
}

#product_8 {
  height: 30rem;
}
</style>
