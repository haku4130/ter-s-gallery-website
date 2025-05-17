<template>
  <Transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
  >
    <div v-if="hasSelections" class="selected-filters-container">
      <div class="selected-filters">
        <div
          class="selected-item"
          v-for="(label, id) in combinedSelections"
          :key="id"
          @click="removeFilter(id)"
        >
          {{ labelFor(label) }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </div>
      </div>
      <div class="clear-filters" @click="clearFilters">ОЧИСТИТЬ</div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  priceMin: Number,
  priceMax: Number,
});

const selectedCategories = defineModel('selectedCategories');
const selectedMaterials = defineModel('selectedMaterials');
const selectedColors = defineModel('selectedColors');
const priceRange = defineModel('priceRange');

const combinedSelections = computed(() => {
  const list = [
    ...selectedCategories.value.map((value) => ({ type: 'category', value })),
    ...selectedMaterials.value.map((value) => ({ type: 'material', value })),
    ...selectedColors.value.map((value) => ({ type: 'color', value })),
  ];

  if (priceRange.value.min !== props.priceMin) {
    list.push({ type: 'min-price', value: priceRange.value.min });
  }
  if (priceRange.value.max !== props.priceMax) {
    list.push({ type: 'max-price', value: priceRange.value.max });
  }

  return list;
});

const hasSelections = computed(() => combinedSelections.value.length > 0);

const formatPrice = (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('ru-RU').format(value);
};

const labelFor = (selection) => {
  if (selection.type === 'category') return selection.value;
  if (selection.type === 'material') return selection.value;
  if (selection.type === 'color') return selection.value;
  if (selection.type === 'min-price')
    return `от ₽${formatPrice(selection.value)}`;
  if (selection.type === 'max-price')
    return `до ₽${formatPrice(selection.value)}`;
};

function removeFilter(id) {
  const selection = combinedSelections.value[id];
  if (selection.type === 'category') {
    selectedCategories.value = selectedCategories.value.filter(
      (item) => item !== selection.value
    );
  } else if (selection.type === 'material') {
    selectedMaterials.value = selectedMaterials.value.filter(
      (item) => item !== selection.value
    );
  } else if (selection.type === 'color') {
    selectedColors.value = selectedColors.value.filter(
      (item) => item !== selection.value
    );
  } else if (selection.type === 'min-price') {
    priceRange.value.min = props.priceMin;
  } else if (selection.type === 'max-price') {
    priceRange.value.max = props.priceMax;
  }
}

function clearFilters() {
  selectedCategories.value = [];
  selectedMaterials.value = [];
  selectedColors.value = [];
  priceRange.value.min = props.priceMin;
  priceRange.value.max = props.priceMax;
}

function beforeEnter(el) {
  el.style.height = '0';
  el.style.minHeight = '0';
}
function enter(el) {
  el.style.minHeight = '7vh';
  el.style.height = '7vh';
}
function afterEnter(el) {
  el.style.minHeight = '7vh';
  el.style.height = 'auto';
}
function beforeLeave(el) {
  el.style.height = el.scrollHeight + 'px';
}
function leave(el) {
  el.style.minHeight = '0';
  el.style.height = '0';
}
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables-mixin.scss' as vars;

.selected-filters-container {
  @include vars.center($horizontal: space-between);
  padding: 0 vars.$default-side-spacing * 3;
  width: 100%;
  // min-height: calc(vars.$header-height / 2);
  background-color: #f1f1f1;
  transition: min-height 0.3s ease-in-out, height 0.3s ease-in-out;
  overflow: hidden;
  @media screen and (max-width: 1000px) {
    padding: 0 calc(vars.$default-side-spacing / 2);
  }
}

.selected-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.3rem 0;
}

.selected-item {
  @include vars.center;
  gap: 0.4rem;
  padding: 0rem 0.7rem;
  height: 1.5rem;
  border: #dddddd 1px solid;
  border-radius: 30px;
  background-color: white;
  transition: background-color 0.2s linear;

  font-size: smaller;
  font-weight: 300;

  &:hover {
    background-color: #dadadad0;
  }
}

.clear-filters {
  border: #777 1px solid;
  border-radius: 30px;
  padding: 0 0.7rem;
  height: 1.5rem;
  color: white;
  background-color: #3f3f3f;
  @include vars.center;
  font-size: 0.7rem;
  transition: background-color 0.2s linear;

  &:hover {
    background-color: #242424;
  }
}
</style>
