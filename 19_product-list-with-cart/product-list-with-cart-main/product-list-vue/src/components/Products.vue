<template>
  <section class="products">
    <h1 class="products__title">Desserts</h1>
    <ul class="grid-container">
      <ProductItem v-for="item in items" :item="item" v-bind:key="item.name" />
    </ul>
  </section>
</template>

<script setup>
import { onMounted, computed } from "vue";
import ProductItem from "./ProductItem.vue";
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();
const { loadData } = productsStore;

onMounted(() => {
  if (!productsStore.products.length) {
    loadData();
  }
});

const items = computed(() => productsStore.allProducts);
</script>
