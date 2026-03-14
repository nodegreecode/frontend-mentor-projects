<script setup lang="ts">
import {type CountriesRegions} from '../stores/types.ts';
import {ref, computed} from "vue";
import {useCountriesStore} from "../stores/countries.ts";
import {storeToRefs} from "pinia";


const countriesStore = useCountriesStore();
const {loadCountriesByRegion, loadCountryByName} = countriesStore;
const {getDarkMode} = storeToRefs(countriesStore);
const open = ref(false);
let filterTag = ref("Filter by Region");

const toggle = () => {
  open.value = !open.value;
}
const searchCountry = (event: Event) => {
  event.preventDefault();
  filterTag.value = "Filter by Region";
  const target = event.target as HTMLInputElement;
  const inputValue: string = target.value;
  loadCountryByName(inputValue);
};
const selectRegion = (nameValue: Event) => {
  const target = nameValue.target as HTMLInputElement;
  const region: CountriesRegions = target.name as CountriesRegions;
  open.value = !open.value;
  filterTag.value = region;
  loadCountriesByRegion(region);
}
const darkInputStyle = computed(() =>
    getDarkMode.value === 'dark' ? 'force-light-input' : ''
);
const darkButtonStyle = computed(() =>
    getDarkMode.value === 'dark' ? 'force-dark-text' : ''
);

</script>

<template>
  <section class="mt-4 mt-md-5 mb-5">
    <div class="row g-5 g-md-0">
      <!-- Search -->
      <div class="col-12 col-md-4">
        <div
            class="d-flex align-items-center gap-3 border-0 border-0 rounded-2 shadow-sm px-4 py-3 bg-white ">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <label class="visually-hidden" for="search">Search for a country</label>
          <input @keyup.enter="searchCountry($event)" id="search" class="border-0 item-search-input"
                 :class="darkInputStyle" type="text"
                 placeholder="Search for a country...">
        </div>
      </div>
      <div class="d-none d-md-block col-md-4 col-xl-6"></div>
      <!-- Filter -->
      <div class="col-7 col-md-4 col-xl-2">
        <div class="dropdown shadow-sm rounded-2 bg-white">
          <button class="btn dropdown-toggle w-100 p-3 d-flex align-items-center justify-content-between"
                  :class="darkButtonStyle" aria-expanded="false" type="button" @click="toggle">{{ filterTag }}
          </button>
          <ul class="dropdown-menu w-100 bg-white" :class="{show: open}">
            <li>
              <button class="dropdown-item" :class="darkButtonStyle" type="button" name="Africa"
                      @click="selectRegion($event)">Africa
              </button>
            </li>
            <li>
              <button class="dropdown-item" :class="darkButtonStyle" type="button" name="Americas"
                      @click="selectRegion($event)">Americas
              </button>
            </li>
            <li>
              <button class="dropdown-item" :class="darkButtonStyle" type="button" name="Asia"
                      @click="selectRegion($event)">Asia
              </button>
            </li>
            <li>
              <button class="dropdown-item" :class="darkButtonStyle" type="button" name="Europe"
                      @click="selectRegion($event)">Europe
              </button>
            </li>
            <li>
              <button class="dropdown-item" :class="darkButtonStyle" type="button" name="Oceania"
                      @click="selectRegion($event)">Oceania
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables';

.item-search-input {
  width: 100%;
  font-size: variables.$font-size-homepage-items;
  outline: none;
}

.force-light-input {
  background-color: white !important;
  color: black !important;
}

.force-dark-text {
  color: black !important;
}
</style>