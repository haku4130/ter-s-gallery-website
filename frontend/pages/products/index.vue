<template>
  <div id="app" class="main-container" v-cloak>
    <FilterGroup
      :categories="categories"
      :materials="materials"
      :colors="colors"
      :priceMin="priceMin"
      :priceMax="priceMax"
      v-model:selectedCategories="selectedCategories"
      v-model:selectedMaterials="selectedMaterials"
      v-model:selectedColors="selectedColors"
      v-model:priceRange="priceRange"
    />
    <ActiveFilters
      :priceMin="priceMin"
      :priceMax="priceMax"
      v-model:selectedCategories="selectedCategories"
      v-model:selectedMaterials="selectedMaterials"
      v-model:selectedColors="selectedColors"
      v-model:priceRange="priceRange"
    />
    <ProductGrid :products="filteredProducts" />
  </div>
</template>

<script setup>
import FilterGroup from '~/components/Filters/FilterGroup.vue';
import ActiveFilters from '~/components/Filters/ActiveFilters.vue';

const { public: config } = useRuntimeConfig();

const { data: products } = await useFetch('/api/products/');

const categories = computed(() => {
  const unique = [...new Set(products.value?.map((p) => p.title) || [])];
  return unique.map((name, i) => ({ id: i + 1, name }));
});

const materials = computed(() => {
  const unique = [
    ...new Set(
      products.value?.flatMap((p) => p.materials?.map((m) => m.name) || []) ||
        []
    ),
  ];
  return unique.map((name, i) => ({ id: i + 1, name }));
});

const colors = computed(() => {
  const unique = [
    ...new Set(
      products.value?.flatMap((p) => p.colors?.map((c) => c.name) || []) || []
    ),
  ];
  return unique.map((name, i) => ({ id: i + 1, name }));
});

const selectedCategories = ref([]);
const selectedMaterials = ref([]);
const selectedColors = ref([]);

const priceMin = computed(() =>
  Math.min(...products.value.map((p) => +p.price))
);
const priceMax = computed(() =>
  Math.max(...products.value.map((p) => +p.price))
);

const priceRange = ref({ min: priceMin.value, max: priceMax.value });

const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const price = +p.price;
    return (
      (!selectedCategories.value.length ||
        selectedCategories.value.includes(p.title)) &&
      (!selectedMaterials.value.length ||
        selectedMaterials.value.some((m) =>
          p.materials?.map((mm) => mm.name).includes(m)
        )) &&
      (!selectedColors.value.length ||
        selectedColors.value.some((c) =>
          p.colors?.map((cc) => cc.name).includes(c)
        )) &&
      price >= priceRange.value.min &&
      price <= priceRange.value.max
    );
  });
});

useSeoMeta({
  title: 'Продукты – ter’s gallery',
  ogTitle: 'Продукты – ter’s gallery',
  description:
    'Коллекция объединяет предметный дизайн и архитектуру, с ее порядком, ритмом, пропорциями, системой знаков и символов.',
  ogDescription:
    'Коллекция объединяет предметный дизайн и архитектуру, с ее порядком, ритмом, пропорциями, системой знаков и символов.',
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/products.scss';
</style>
