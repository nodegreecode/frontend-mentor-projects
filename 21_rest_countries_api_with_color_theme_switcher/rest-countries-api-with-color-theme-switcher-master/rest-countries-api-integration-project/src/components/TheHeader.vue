<script setup lang="ts">
import {type Ref, ref} from 'vue'
import {useCountriesStore} from "../stores/countries.ts";
import {storeToRefs} from "pinia";

const countriesStore = useCountriesStore();
const {getDarkMode} =  storeToRefs(countriesStore);
const header: Ref<HTMLElement | null> = ref(null);

const toggleColorTheme = () => {
  countriesStore.toggleTheme();
  if (getDarkMode.value === 'dark') {
    header.value!.classList.remove('bg-white');
    header.value!.classList.add('bg-dark');
  } else {
    header.value!.classList.remove('bg-dark');
    header.value!.classList.add('bg-white');
  }
}
</script>

<template>
  <header class="p-3 bg-white border-bottom border-3 sticky-top" ref="header">
    <nav class="navbar">
      <div class="container">
        <h1 class="fs-4 fw-bold">Where in the world?</h1>
        <div>
        <span>
         <img class="dark-mode__icon" src="/public/half-moon.svg" alt="half moon icon for toggling dark mode"/>
         </span>
          <button class="btn fw-bold" type="button" @click="toggleColorTheme">
            Dark Mode
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.dark-mode {
  &__icon {
    width: 20px;
    height: 20px;
  }
}
</style>

