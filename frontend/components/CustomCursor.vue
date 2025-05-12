<template>
  <div
    ref="cursorRef"
    class="custom-cursor"
    :class="{ pointer: isPointer, hidden: !cursorVisible }"
    :style="{
      left: `${cursorPosition.x}px`,
      top: `${cursorPosition.y}px`,
    }"
  ></div>
</template>

<script setup>
const cursorRef = ref(null);
const cursorVisible = ref(true);
const isPointer = ref(false);
const cursorPosition = ref({ x: 0, y: 0 });

const isTouchDevice = () =>
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;

function updatePosition(e) {
  cursorPosition.value = { x: e.clientX, y: e.clientY };
}

onMounted(() => {
  if (isTouchDevice()) {
    cursorVisible.value = false;
    return;
  }

  document.addEventListener('pointermove', updatePosition);

  document.addEventListener('mouseleave', () => {
    cursorVisible.value = false;
  });

  document.addEventListener('mouseenter', () => {
    cursorVisible.value = true;
  });

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, .cursor-link')) {
      isPointer.value = true;
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, .cursor-link')) {
      isPointer.value = false;
    }
  });
});

onUnmounted(() => {
  document.removeEventListener('pointermove', updatePosition);
});
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  width: 0.6vw;
  height: 0.6vw;
  background-color: black;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease, opacity 0.5s ease;
  z-index: 9999;
}

.custom-cursor.pointer {
  width: 1vw;
  height: 1vw;
  opacity: 70%;
}

.custom-cursor.hidden {
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
