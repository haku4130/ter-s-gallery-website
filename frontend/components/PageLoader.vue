<template>
  <div v-if="loading" class="page-loader">
    <div class="loader"></div>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const loading = ref(true);
nuxtApp.hook('page:start', () => {
  loading.value = true;
});
nuxtApp.hook('page:finish', () => {
  loading.value = false;
});
</script>

<style scoped>
.page-loader {
  position: fixed;
  z-index: 9999;
  inset: 0;
  background: white;
  color: black;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  width: 10px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l5 1s infinite linear alternate;
}
@keyframes l5 {
  0% {
    box-shadow: 20px 0 #000, -20px 0 #0002;
    background: #000;
  }
  33% {
    box-shadow: 20px 0 #000, -20px 0 #0002;
    background: #0002;
  }
  66% {
    box-shadow: 20px 0 #0002, -20px 0 #000;
    background: #0002;
  }
  100% {
    box-shadow: 20px 0 #0002, -20px 0 #000;
    background: #000;
  }
}
</style>
