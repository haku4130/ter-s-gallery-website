<template>
  <div class="main-container-wrapper">
    <div class="main-container" v-if="product">
      <Swiper
        :modules="modules"
        :loop="true"
        :navigation="true"
        :pagination="{ clickable: true }"
        :slides-per-view="'auto'"
        :autoHeight="true"
        class="product-swiper"
      >
        <SwiperSlide
          v-for="image in product.images"
          :key="image.id"
          class="swiper-slide"
        >
          <NuxtImg :src="image.image" :alt="product.name" />
        </SwiperSlide>
      </Swiper>

      <div class="product-gallery">
        <NuxtImg
          v-for="image in product.images"
          :key="image.id"
          :src="image.image"
          :alt="product.name"
        />
      </div>

      <div class="product-info">
        <div class="product-name">{{ product.name }}</div>
        <div class="product-type">{{ product.title }}</div>
        <div class="product-description">{{ product.description }}</div>

        <div class="product-characteristic-block">
          <span class="title">МАТЕРИАЛЫ</span>
          <span class="product-characteristic">
            {{ product.materials.map((m) => m.name).join(', ') }}
          </span>
        </div>
        <div class="product-characteristic-block">
          <span class="title">ГОД</span>
          <span class="product-characteristic">{{ product.year_created }}</span>
        </div>
        <div class="product-characteristic-block">
          <span class="title">РАЗМЕР</span>
          <span class="product-characteristic">{{ product.size }}</span>
        </div>
        <div class="product-characteristic-block product-price">
          <span>{{ formatPrice(product.price) }} ₽</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const modules = [Navigation, Pagination];

const route = useRoute();

const { data: product, error } = await useFetch(
  `/api/products/${route.params.id}/`
);

const formatPrice = (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('ru-RU').format(value);
};

watch(product, (value) => {
  if (!value) return;

  useSeoMeta({
    title: `${value.name} – ter’s gallery`,
    ogTitle: `${value.name} – ter’s gallery`,
    description: `${value.title} из коллекции ${value.collection?.name}.`,
    ogDescription: `${value.title} из коллекции ${value.collection?.name}.`,
  });
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/detail.scss';

.main-container-wrapper {
  display: flex;
}

:deep(.swiper-pagination-bullet) {
  cursor: none !important;
}

:deep(.swiper-button-prev) {
  opacity: 0.5;
  cursor: none !important;
  transition: opacity 0.5s ease;
}

:deep(.swiper) {
  --swiper-navigation-size: 24px;
  --swiper-pagination-bullet-size: 6px;
}

:deep(.swiper-button-prev:hover) {
  opacity: 1;
}

:deep(.swiper-button-next) {
  opacity: 0.5;
  cursor: none !important;
  transition: opacity 0.5s ease;
}

:deep(.swiper-button-next svg) {
  width: 50% !important;
}

:deep(.swiper-button-next:hover) {
  opacity: 1;
}

.product-swiper {
  display: none;
  width: fit-content;
  height: fit-content;
  --swiper-theme-color: black;
}

.swiper-slide {
  height: fit-content;
  align-self: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  object-fit: contain;
}

@media screen and (max-width: 1000px) {
  .product-swiper {
    display: block;
  }
}
</style>
