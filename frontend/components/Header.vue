<template>
  <header>
    <div class="header-inside">
      <div class="logo cursor-link">
        <NuxtLink to="/"> <span>TER'S</span> GALLERY </NuxtLink>
      </div>
      <nav>
        <ul>
          <li>
            <NuxtLink
              to="/products"
              :class="{ 'nav-link-active': isActive('products') }"
            >
              ПРОДУКТЫ
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/about"
              :class="{ 'nav-link-active': isActive('about') }"
            >
              О НАС
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/contacts"
              :class="{ 'nav-link-active': isActive('contacts') }"
            >
              КОНТАКТЫ
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <svg
        class="hamburger cursor-link"
        @click="emit('toggle-menu')"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 25 25"
      >
        <path d="M-10,5 L25,5" class="p1"></path>
        <path d="M-10,12.5 L25,12.5" class="p2"></path>
        <path d="M-10,20 L35,20" class="p3"></path>
      </svg>
    </div>
  </header>
</template>

<script setup>
const emit = defineEmits(['toggle-menu']);

const route = useRoute();

const isActive = (name) => route.name === name;
</script>
