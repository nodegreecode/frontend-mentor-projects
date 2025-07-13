<template>
  <main>
    <section class="result-summary__section">
      <div class="container container-center">
        <ResultSummary />
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<script setup>
import ResultSummary from "./components/ResultSummary/ResultSummary.vue";
import AppFooter from "./components/layouts/AppFooter.vue";
import { ref, provide, onMounted } from "vue";

const resultData = ref(null);

onMounted(async () => {
  const response = await fetch("../src/assets/data.json");
  resultData.value = await response.json();
});

provide("data", resultData);
</script>
