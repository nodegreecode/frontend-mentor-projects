<template>
  <!-- DefaultLayout -->
  <main>
    <ProductListWithCart />
  </main>
  <TheFooter />
</template>

<script setup>
import ProductListWithCart from "./views/ProductListWithCart.vue";
import TheFooter from "./layouts/TheFooter.vue";
</script>

<style lang="scss" scoped>
@use "./assets/scss/utils/_variables.scss";
@use "./assets/scss/utils/_mixins.scss";

main {
  padding: 4rem 0;
  @include mixins.respond-tablet {
    padding: 0;
  }
}

main,
footer {
  background-color: variables.$rose-50;
}
</style>
