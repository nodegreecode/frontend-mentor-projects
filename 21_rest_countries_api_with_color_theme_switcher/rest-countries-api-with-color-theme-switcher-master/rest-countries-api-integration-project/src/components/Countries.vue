<script setup lang="ts">
import Country from "./Country.vue";
import {useCountriesStore} from "../stores/countries.ts";
import {computed} from "vue";

const countriesStore = useCountriesStore();
const { getAllCountries} = countriesStore;

const allCountries = computed(() => {
  return getAllCountries();
});
</script>

<template>
  <section class="countries-section">
    <div class="row gx-3 gx-lg-6 gy-5 gy-sm-3 gy-lg-6">
      <Country v-for="country in allCountries" :country="country" :key="country.cca3"/>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables';
.countries-section {
  font-size: variables.$font-size-homepage-items;
}
.gx-lg-6 {
  @media (min-width: 1200px) {
    --bs-gutter-x: 5rem;
  }
}
.gy-lg-6 {
  @media (min-width: 1200px) {
    --bs-gutter-y: 5rem;
  }
}
</style>