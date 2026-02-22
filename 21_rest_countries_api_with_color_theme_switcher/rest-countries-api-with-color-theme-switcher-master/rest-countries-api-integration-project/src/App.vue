<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import {useCountriesStore} from "./stores/countries.ts";
import {onMounted} from "vue";

const countriesStore = useCountriesStore();
const {loadAllCountries} = countriesStore;

onMounted(() => {
  loadAllCountries();
})

</script>

<template>
  <TheHeader/>
  <main class="container min-vh-100">
    <router-view name="controls"/>
    <router-view name="list"/>
    <router-view/>
  </main>
  <footer>
    <div class="container">
      <div class="d-flex justify-content-center">
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
        Coded by
        <a href="https://www.linkedin.com/in/anatolii-vasylenko-402014219/">
          Anatolii Vasylenko
        </a>.
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">

</style>
