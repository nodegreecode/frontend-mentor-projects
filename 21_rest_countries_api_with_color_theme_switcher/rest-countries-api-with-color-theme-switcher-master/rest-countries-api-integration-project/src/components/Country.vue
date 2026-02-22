<script setup lang="ts">
import type {PropType} from "vue";
import {formatPopulation} from "../utils/i18nFormatters.ts";
import {useCountriesStore} from "../stores/countries.ts";

interface Country {
  [key: string]: any;
}

const props = defineProps({
  country: {
    type: Object as PropType<Country>,
    required: true,
  }
})

const countriesStore = useCountriesStore();
const {loadCountryByCode} = countriesStore;

function fetchCountry(code: string) {
  loadCountryByCode(code);
}
</script>

<template>
  <div class="col-md-6 col-lg-3 country-container d-flex">
    <article class="card country flex-fill">
      <div class="card-body p-0">
        <img class="card-img-top" :src="props.country.flags.png" alt="country flag">
        <div class="d-flex flex-column p-4">
          <h2 class="card-title fw-bold mb-3">
            <router-link class="nav-link" :to="`/details/${props.country.cca3}`" @mouseenter="fetchCountry(props.country.cca3)">{{ props.country.name.common }}</router-link>
          </h2>
          <div class="d-flex flex-column">
            <p class="mb-1">
              <strong>Population:</strong> {{ formatPopulation(props.country.population, "en-US") }}
            </p>
            <p class="mb-1">
              <strong>Region:</strong> {{ props.country.region }}
            </p>
            <p class="mb-1">
              <strong>Capital:</strong> {{ props.country.capital[0] }}
            </p>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.country-container {
  @media(max-width: 768px) {
    padding-left: 3.5rem;
    padding-right: 3.5rem;
  }
}

.country {
  width: 100%;
  max-width: 24rem;
  @media(max-width: 768px) {
    max-width: 100%;
  }
}

.card-img-top{
  height: 10rem;
}

.card-title{
  font-size: 1.125rem;
}
</style>

