<template>
  <section class="product-list-with-cart">
    <div class="container">
      <!-- 1. Products.vue -->
      <Products />
      <!-- 2. Shopping Cart-->
      <Cart />
      <!-- 3. Order Confirmation Modal -->
      <OrderConfirmation />
    </div>
  </section>
</template>

<script setup>
import Products from "../components/Products.vue";
import Cart from "../components/Cart.vue";
import OrderConfirmation from "../components/OrderConfirmation.vue";
</script>
