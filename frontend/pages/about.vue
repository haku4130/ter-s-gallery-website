<template>
  <div class="main-container" v-if="about">
    <div class="about-text">
      <div class="about-title about-firstly-font-weight">О НАС</div>
      <div class="about-links">
        <div>
          <a @click.prevent="scrollWithOffset('ideology')">ИДЕОЛОГИЯ</a>
        </div>
        <div>
          <a @click.prevent="scrollWithOffset('materials')">МАТЕРИАЛЫ</a>
        </div>
        <div>
          <a @click.prevent="scrollWithOffset('production')">ПРОИЗВОДСТВО</a>
        </div>
      </div>
    </div>
    <div class="about-image">
      <NuxtImg :src="about.top_image" alt="about image" />
    </div>
  </div>

  <hr />

  <div class="about-main-content-container" v-if="about">
    <div id="ideology" class="content-text" v-html="about.ideology_text"></div>

    <hr />

    <div
      id="materials"
      class="content-text"
      v-html="about.materials_text"
    ></div>

    <div class="materials-grid">
      <div
        class="grid-element"
        v-for="material in materials"
        :key="material.id"
      >
        <div class="material-img">
          <NuxtImg :src="material.image" :alt="material.name" />
        </div>
        <div class="material-title">{{ material.name }}</div>
      </div>
    </div>

    <hr />

    <div
      id="production"
      class="content-text"
      v-html="about.production_text"
    ></div>

    <div class="production-img">
      <NuxtImg :src="about.bottom_image" alt="production image" />
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig().public;

const { data: about } = await useFetch('/api/about/');

const { data: materials } = await useFetch('/api/materials');

function scrollWithOffset(id) {
  const element = document.getElementById(id);
  if (!element) return;

  const yOffset = window.innerWidth < 1000 ? -121 : -131;
  const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

useSeoMeta({
  title: 'О нас – ter’s gallery',
  ogTitle: 'О нас – ter’s gallery',
  description:
    'Традиционно, предметы интерьера, будь то стул, стол или книжная полка, обладают собственным уникальным набором элементов, характерным образом и значением в доме.',
  ogDescription:
    'Традиционно, предметы интерьера, будь то стул, стол или книжная полка, обладают собственным уникальным набором элементов, характерным образом и значением в доме.',
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/about.scss';
</style>
