<template>
  <div class="main-products">
    <transition-group tag="div" name="list" class="main-grid" mode="in-out">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </transition-group>
  </div>
</template>

<script setup>
defineProps({ products: Array });
</script>

<style lang="scss" scoped>
@use '~/assets/styles/products.scss';

.list-move,
.list-item,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s, opacity 0.1s;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
  left: 100%;
  top: 100%;
}
</style>
