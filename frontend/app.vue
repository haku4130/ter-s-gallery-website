<template>
  <Header @toggle-menu="menu?.toggleNav()" />
  <Sidenav ref="menu" />
  <!-- <PageLoader /> -->
  <main>
    <NuxtPage />
  </main>
  <Footer />
  <CustomCursor />
</template>

<script setup>
const menu = ref(null);
</script>

<style lang="scss">
@use '~/assets/styles/base.scss';
</style>
