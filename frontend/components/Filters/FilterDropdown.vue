<template>
  <div class="filter-item" ref="dropdownWrapper">
    <button class="dropbtn cursor-link" @click="toggleOpen">
      {{ title }}
    </button>

    <Transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div
        v-show="isOpen"
        ref="dropdownContent"
        class="dropdown-content"
        :class="{ visible: isOpen, 'price-filter': isPriceFilter }"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
});

const isOpen = ref(false);
const dropdownContent = ref(null);
const dropdownWrapper = ref(null);
const isPriceFilter = computed(() =>
  props.title?.toLowerCase().includes('цен')
);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

onMounted(() => {
  document.addEventListener('click', onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside);
});

function onClickOutside(e) {
  if (
    isOpen.value &&
    dropdownWrapper.value &&
    !dropdownWrapper.value.contains(e.target)
  ) {
    isOpen.value = false;
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

.price-filter {
  min-width: 200px;
}
@media screen and (max-width: 1000px) {
  .price-filter {
    min-width: 100%;
    border-bottom: none;
  }
}
</style>
