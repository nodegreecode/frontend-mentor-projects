<template>
  <div class="result-summary">
    <ResultSummaryContainer>
      <template v-slot:score>
        <ResultScore />
      </template>
      <template v-slot:summary>
        <ResultCategory />
      </template>
    </ResultSummaryContainer>
  </div>
</template>

<script setup>
import ResultSummaryContainer from "./ResultSummaryContainer.vue";
import ResultScore from "./ResultScore.vue";
import ResultCategory from "./ResultCategory.vue";
</script>
