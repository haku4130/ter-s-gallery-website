<template>
  <div
    ref="sidenav"
    id="mySidenav"
    class="sidenav sidenav-opacity"
    :class="{ 'sidenav-shown-styles': isSideMenuOpen }"
  >
    <NuxtLink
      to="/products"
      :class="{ 'nav-link-active': isActive('products') }"
      @click="closeNav"
    >
      ПРОДУКТЫ
    </NuxtLink>
    <NuxtLink
      to="/about"
      :class="{ 'nav-link-active': isActive('about') }"
      @click="closeNav"
    >
      О НАС
    </NuxtLink>
    <NuxtLink
      to="/contacts"
      :class="{ 'nav-link-active': isActive('contacts') }"
      @click="closeNav"
    >
      КОНТАКТЫ
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const sidenav = ref(null);
const isSideMenuOpen = ref(false);
const route = useRoute();

const isActive = (name) => route.name === name;

function openNav() {
  isSideMenuOpen.value = true;
  document.body.style.overscrollBehavior = 'none';
  document.querySelector('.header-inside')?.classList.add('sideMenuOpen');
}

function closeNav() {
  isSideMenuOpen.value = false;
  document.body.style.overscrollBehavior = '';
  document.querySelector('.header-inside')?.classList.remove('sideMenuOpen');
}

function toggleNav() {
  isSideMenuOpen.value ? closeNav() : openNav();
}

defineExpose({ toggleNav, openNav, closeNav });
</script>

<style scope lang="scss">
@use '~/assets/styles/variables-mixin' as vars;
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1000;
  top: vars.$header-height;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  transition: all 0.5s ease-out;
  border-top: vars.$default-line-color solid 1px;
  opacity: 0;

  @media screen and (max-width: 1000px) {
    top: calc(vars.$header-height / 1.5);
  }

  @media screen and (min-width: 1200px) {
    display: none;
  }
}

.sidenav-shown-styles {
  opacity: 1;
  width: 100%;
}

.sidenav a {
  display: flex;
  margin-left: vars.$default-side-spacing * 3;
  margin-top: 2rem;
  opacity: 0.5;
  transition: opacity 0.5s ease;
  @media screen and (max-width: 1000px) {
    margin-left: calc(vars.$default-side-spacing / 2);
  }
}

.sidenav a:hover {
  opacity: 1;
}
</style>
