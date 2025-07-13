<template>
  <div class="summary-item flex-container" :class="`summary-item--${category.toLowerCase()}`">
    <div class="summary-item__title">
      <img class="summary-item__icon" :src="icon" alt="" />
      <span class="summary-item__name" :class="`summary-item__name--${category.toLowerCase()}`">{{
        category
      }}</span>
    </div>
    <div class="summary-item__scores">
      <span class="summary-item__score">{{ score }}</span>
      <span class="summary-item__max"> / 100</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["category", "score", "icon"],
  setup() {},
};
</script>
