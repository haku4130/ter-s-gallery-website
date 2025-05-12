<template>
  <div class="filters">
    <div class="filter-container">
      <div class="filter-icon cursor-link" @click="toggleFilters">ФИЛЬТРЫ</div>
      <Transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
      >
        <div v-show="!filtersHidden" class="dropdown-filters">
          <FilterBlock
            title="КАТЕГОРИИ"
            :options="categories"
            v-model="selectedCategories"
          />
          <FilterBlock
            title="МАТЕРИАЛЫ"
            :options="materials"
            v-model="selectedMaterials"
          />
          <FilterBlock
            title="ЦВЕТ"
            :options="colors"
            v-model="selectedColors"
          />
          <PriceRange v-model="priceRange" :min="priceMin" :max="priceMax" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import FilterBlock from './FilterBlock.vue';
import PriceRange from './PriceRange.vue';

defineProps({
  categories: Array,
  materials: Array,
  colors: Array,
  priceMin: Number,
  priceMax: Number,
});

const selectedCategories = defineModel('selectedCategories');
const selectedMaterials = defineModel('selectedMaterials');
const selectedColors = defineModel('selectedColors');
const priceRange = defineModel('priceRange');

const filtersHidden = ref(true);
const isMobile = ref(false);
const check = () => {
  isMobile.value = window.innerWidth < 1000;
  filtersHidden.value = isMobile.value;
};

onMounted(() => {
  check();
  window.addEventListener('resize', check);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', check);
});

function toggleFilters() {
  if (isMobile.value) {
    filtersHidden.value = !filtersHidden.value;
  }
}

function beforeEnter(el) {
  el.style.height = '0';
}
function enter(el) {
  el.style.height = el.scrollHeight + 'px';
}
function afterEnter(el) {
  el.style.height = 'auto';
}
function beforeLeave(el) {
  el.style.height = el.scrollHeight + 'px';
}
function leave(el) {
  el.style.height = '0';
}
</script>

<style scoped lang="scss">
@use '~/assets/styles/filters.scss';
</style>
