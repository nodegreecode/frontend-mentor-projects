<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, nextTick, onMounted, watch} from "vue";
import {useCountriesStore} from "../stores/countries.ts";

const route = useRoute();
const router = useRouter();
const countriesStore = useCountriesStore();
const {getCountryByCode} = countriesStore;

const country = computed(() => {
  const code = route.params.code;
  if (typeof code != 'string') {
    return null;
  }
  return getCountryByCode(code);
});
const nativeCountryName = computed(() => {
  if (!country.value?.name?.nativeName) return '';
  const names = country.value.name.nativeName as Record<string, {
    official: string
    common: string
  }>
  const firstName = Object.values(names)[0];
  return firstName?.common || '';
});
const currencies = computed(() => {
  if (!country.value?.currencies) return '';
  const availableCurrencies = country.value.currencies as Record<string, {
    name: string
    symbol: string
  }>;
  return Object.values(availableCurrencies).map(currency => currency.name).join(', ');
})
const languages = computed(() => {
  if (!country.value?.languages) return '';
  const availableLanguages = country.value.languages as string[];
  return Object.values(availableLanguages).join(', ');
})
const goBack = () => {
  countriesStore.popHistory();
  const prevCode = countriesStore.popHistory();
  if (prevCode) {
    router.push({name: "country-detail", params: {code: prevCode}});
  } else {
    router.push("/");
  }
}
watch(() => route.params.code, (newVal) => {
      if (typeof newVal == "string") {
        countriesStore.pushToHistory(newVal);
      }
    },
    {immediate: true});
onMounted(async () => {
  await nextTick();
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
});
</script>

<template>
  <section v-if="country?.name">
    <article>
      <button class="btn btn-light shadow-sm my-6 col-3 col-md-2 col-lg-1" @click="goBack">&larr; Back</button>
      <div class="row align-items-center g-4 gx-lg-6">
        <div class="col-12 col-lg-6">
          <img class="card-img-top" :src="country.flags?.png" alt="country flag">
        </div>
        <div class="col-12 col-lg-6">
          <h2 class="fw-bold mb-4">{{ country.name?.common }}</h2>
          <div class="row mb-6">
            <div class="col-6">
              <p class="mb-1"><strong>Native Name: </strong>{{ nativeCountryName }}</p>
              <p class="mb-1"><strong>Population:</strong> {{ country.population }}</p>
              <p class="mb-1"><strong>Region:</strong> {{ country.region }}</p>
              <p class="mb-1"><strong>Sub Region:</strong> {{ country.subregion }}</p>
              <p class="mb-1"><strong>Capital:</strong> {{ country.capital?.[0] }}</p>
            </div>
            <div class="col-6">
              <p class="mb-1"><strong>Top Level Domain:</strong> {{ country.tld?.[0] }}</p>
              <p class="mb-1"><strong>Currencies:</strong> {{ currencies }}</p>
              <p class="mb-1"><strong>Languages:</strong> {{ languages }}</p>
            </div>
          </div>
          <div class="row  align-items-center" v-if="country.borders.length > 0">
            <h3 class="fw-bold fs-6 col-3">Border Countries:</h3>
            <ul class="nav gap-3 col-9">
              <li class="nav-item col-3 text-center" v-for="c in country.borders">
                <router-link class="nav-link text-bg-light shadow-sm rounded-2" :to="`/details/${c}`">
                  {{ getCountryByCode(c)?.name?.common }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped lang="scss">

</style>