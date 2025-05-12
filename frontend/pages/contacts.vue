<template>
  <div class="main-container">
    <div class="contact-image">
      <NuxtImg src="/contact.webp" alt="Contact img" />
    </div>

    <div class="contact-text">
      <div class="contact-title contact-firstly-font-weight">КОНТАКТЫ</div>
      <div class="company-title contact-firstly-font-weight">ter's gallery</div>
      <div class="company-address-street contact-secondary-opacity">
        Сентябрьская 12
      </div>
      <div class="company-address-town contact-secondary-opacity">
        Апрелевка
      </div>
      <div class="company-address-country contact-secondary-opacity">
        Россия
      </div>

      <div class="company-email">
        <span class="contact-firstly-font-weight">e-mail</span>
        <a class="contact-secondary-opacity" href="mailto:info@ters.gallery">
          info@ters.gallery</a
        >
      </div>

      <div class="company-tel">
        <span class="contact-firstly-font-weight">tel</span>
        <a class="contact-secondary-opacity" href="tel:+79299696699">
          +7 (929) 969-66-99</a
        >
      </div>

      <div class="company-open-time">
        <span class="days contact-secondary-opacity">ПН | ПТ</span>
        <span class="hours contact-firstly-font-weight">11:00 - 19:00</span>
      </div>
    </div>
  </div>

  <hr />

  <div class="addresses">
    <div class="address" v-for="office in offices" :key="office.city">
      <span class="city">{{ office.city }}</span>
      <span class="street">{{ office.street }}</span>
      <span class="country">{{ office.country }}</span>
      <span class="tel-number">{{ office.phone }}</span>
      <span class="working-hours"
        ><span>{{ office.days }}</span> {{ office.hours }}</span
      >
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Контакты - ter's gallery",
  meta: [
    {
      name: 'description',
      content:
        "ter's gallery: Контактная информация, включая адреса, телефон, e-mail и время работы. Найдите нас в Апрелевке, Москве и Одинцово. Свяжитесь с нами для получения дополнительной информации.",
    },
  ],
});

const offices = [
  {
    city: 'Апрелевка',
    street: 'Сентябрьская 12',
    country: 'Россия',
    phone: '+7 (929) 969-66-99',
    days: 'ПН | ПТ',
    hours: '11:00 - 19:00',
  },
  {
    city: 'Москва',
    street: 'Боровская 58',
    country: 'Россия',
    phone: '+7 (929) 969-66-99',
    days: 'ПН | ПТ',
    hours: '11:00 - 19:00',
  },
  {
    city: 'Одинцово',
    street: 'Садовая 44',
    country: 'Россия',
    phone: '+7 (929) 969-66-99',
    days: 'ПН | ПТ',
    hours: '11:00 - 19:00',
  },
];

useSeoMeta({
  title: 'Контакты – ter’s gallery',
  ogTitle: 'Контакты – ter’s gallery',
  description:
    'Адреса шоурумов в Апрелевке, Москве и Одинцово. Свяжитесь с нами по телефону или e-mail.',
  ogDescription:
    'Адреса шоурумов в Апрелевке, Москве и Одинцово. Свяжитесь с нами по телефону или e-mail.',
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/contacts.scss';
</style>
