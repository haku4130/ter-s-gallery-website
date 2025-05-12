<template>
  <FilterDropdown title="ЦЕНА">
    <div class="price-range">
      <div class="range-values">
        <span class="range-value">₽ {{ format(minValue) }}</span>
        <span class="range-value">₽ {{ format(maxValue) }}</span>
      </div>

      <div
        class="track-container"
        ref="track"
        @mousedown="onTrackClick"
        @touchstart.prevent="onTrackTouch"
      >
        <div class="track-bg"></div>
        <div class="track-highlight" :style="highlightStyle"></div>

        <a
          class="track-btn"
          :style="leftHandleStyle"
          @mousedown="startDrag('min')"
          @touchstart.prevent="startDrag('min')"
        ></a>
        <a
          class="track-btn"
          :style="rightHandleStyle"
          @mousedown="startDrag('max')"
          @touchstart.prevent="startDrag('max')"
        ></a>
        <div class="track-btn-placeholder-left track-btn"></div>
        <div class="track-btn-placeholder-right track-btn"></div>
      </div>
    </div>
  </FilterDropdown>
</template>

<script setup>
import FilterDropdown from './FilterDropdown.vue';

const props = defineProps({
  min: Number,
  max: Number,
});
const priceRange = defineModel();

const step = 1000;
const track = ref(null);
const dragging = ref(null);

const minValue = computed({
  get: () => priceRange.value.min,
  set: (val) => (priceRange.value.min = val),
});

const maxValue = computed({
  get: () => priceRange.value.max,
  set: (val) => (priceRange.value.max = val),
});

function format(val) {
  return new Intl.NumberFormat('ru-RU').format(val);
}

function startDrag(target) {
  dragging.value = target;
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', stopDrag);

  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', stopDrag);
}

function stopDrag() {
  dragging.value = null;
  document.removeEventListener('mousemove', onMove);
  document.removeEventListener('mouseup', stopDrag);

  document.removeEventListener('touchmove', onTouchMove);
  document.removeEventListener('touchend', stopDrag);
}

function onMove(e) {
  if (!track.value) return;
  const rect = track.value.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;

  const clampedPercent = Math.min(Math.max(percent, 0), 1);
  const raw = props.min + (props.max - props.min) * clampedPercent;
  const value = Math.round(raw / step) * step;

  if (dragging.value === 'min' && value <= maxValue.value) {
    minValue.value = Math.max(value, props.min);
  }
  if (dragging.value === 'max' && value >= minValue.value) {
    maxValue.value = Math.min(value, props.max);
  }
}

function onTouchMove(e) {
  e.preventDefault();

  if (!track.value || !e.touches.length) return;
  const touch = e.touches[0];
  const rect = track.value.getBoundingClientRect();
  const percent = (touch.clientX - rect.left) / rect.width;

  const clampedPercent = Math.min(Math.max(percent, 0), 1);
  const raw = props.min + (props.max - props.min) * clampedPercent;
  const value = Math.round(raw / step) * step;

  if (dragging.value === 'min' && value <= maxValue.value) {
    minValue.value = Math.max(value, props.min);
  }
  if (dragging.value === 'max' && value >= minValue.value) {
    maxValue.value = Math.min(value, props.max);
  }
}

function onTrackClick(e) {
  const rect = track.value.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  const raw = props.min + (props.max - props.min) * percent;
  const value = Math.round(raw / step) * step;

  const closerToMin =
    Math.abs(value - minValue.value) < Math.abs(value - maxValue.value);

  if (closerToMin && value < maxValue.value) {
    minValue.value = Math.max(value, props.min);
    startDrag('min');
  } else if (value > minValue.value) {
    maxValue.value = Math.min(value, props.max);
    startDrag('max');
  }
}

function onTrackTouch(e) {
  e.preventDefault();

  if (!track.value || !e.touches.length) return;

  const touch = e.touches[0];
  const rect = track.value.getBoundingClientRect();
  const percent = (touch.clientX - rect.left) / rect.width;
  const raw = props.min + (props.max - props.min) * percent;
  const value = Math.round(raw / step) * step;

  const closerToMin =
    Math.abs(value - minValue.value) < Math.abs(value - maxValue.value);

  if (closerToMin && value < maxValue.value) {
    minValue.value = Math.max(value, props.min);
    startDrag('min');
  } else if (value > minValue.value) {
    maxValue.value = Math.min(value, props.max);
    startDrag('max');
  }
}

const leftHandleStyle = computed(() => ({
  left: `${((minValue.value - props.min) / (props.max - props.min)) * 100}%`,
}));

const rightHandleStyle = computed(() => ({
  left: `${((maxValue.value - props.min) / (props.max - props.min)) * 100}%`,
}));

const highlightStyle = computed(() => {
  const left = ((minValue.value - props.min) / (props.max - props.min)) * 100;
  const width =
    ((maxValue.value - minValue.value) / (props.max - props.min)) * 100;
  return {
    left: `${left}%`,
    width: `${width}%`,
  };
});
</script>

<style scoped lang="scss">
.price-range {
  display: inline-block;
  width: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1000px) {
    margin: 0 2rem;
  }
}

.range-values {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.5rem;
}

.range-value {
  font-size: clamp(0.9rem, 1vw, 1.2rem);
  min-width: fit-content;
}

.track-container {
  position: relative;
  width: 100%;
  height: 12px;
}

.track-bg {
  position: absolute;
  height: 2px;
  background: #ddd;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  z-index: 1;
}

.track-highlight {
  position: absolute;
  height: 1px;
  background: black;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

.track-btn {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 0.5rem;
  height: 0.5rem;
  border: 1px solid black;
  background: white;
  border-radius: 50%;
  z-index: 3;
}

.track-btn-placeholder-left,
.track-btn-placeholder-right {
  border: #ddd;
  background-color: #ddd;
  z-index: 1;
}

.track-btn-placeholder-left {
  left: 0%;
}

.track-btn-placeholder-right {
  left: 100%;
}
</style>
