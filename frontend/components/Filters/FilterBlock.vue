<template>
  <FilterDropdown :title="title">
    <a v-for="option in options" :key="optionKey(option)">
      <label :for="optionValue(option)">
        {{ optionLabel(option) }}
      </label>
      <input
        type="checkbox"
        :id="optionValue(option)"
        :value="optionValue(option)"
        v-model="modelValue"
      />
    </a>
  </FilterDropdown>
</template>

<script setup>
import FilterDropdown from './FilterDropdown.vue';

defineProps({
  title: String,
  options: Array,
  optionLabel: { type: Function, default: (o) => o.name },
  optionValue: { type: Function, default: (o) => o.name },
  optionKey: { type: Function, default: (o) => o.id || o.name },
});
const modelValue = defineModel({ type: Array });
</script>

<style scoped lang="scss">
@use '~/assets/styles/filters.scss';
</style>
