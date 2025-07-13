<template>
  <section class="result-category">
    <h2 class="result-category__title">Summary</h2>
    <!-- Summary Item -->
    <div class="summary-item__container">
      <SummaryItem
        v-for="d in data"
        v-bind:key="d.score"
        :category="d.category"
        :score="d.score"
        :icon="d.icon"
      />
    </div>
    <SummaryButton> Continue </SummaryButton>
  </section>
</template>

<script setup>
import SummaryButton from "../ui/SummaryButton.vue";
import SummaryItem from "../ui/SummaryItem.vue";
import { inject } from "vue";

const data = inject("data");
</script>
