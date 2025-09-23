<template>
  <aside class="cart">
    <h2 class="cart__title">Your Cart ({{ totalItemsInCart }})</h2>
    <ul class="cart__items">
      <li class="cart__empty-message" v-if="totalItemsInCart === 0">
        <img
          class="cart__empty-image"
          src="/images/illustration-empty-cart.svg"
          alt="chocolate cake"
        />
        <p class="cart__empty-text">Your added items will appear here</p>
      </li>
      <!-- Items -->
      <li class="cart__item" v-for="item in updatedItems" :key="item.name">
        <div class="item__details">
          <h3 class="item__name">{{ item.name }}</h3>
          <span class="item__quantity">{{ item.quantity }}x</span>
          <span class="item__price">@ ${{ item.price }}</span>
          <span class="item__total">${{ item.total }}</span>
        </div>
        <button class="item__remove-btn" @click="removeFromCart(item.name)">
          <img src="../assets/icons/icon-remove-item.svg" alt="Remove item" />
        </button>
      </li>
    </ul>
    <div class="cart__order-total">
      <span class="cart__order-total-text">Order Total:</span>
      <span class="cart__order-total-sum">${{ totalOrderPrice }}</span>
    </div>
    <div class="cart__carbon-neutral-message">
      <img class="cart__carbon-neutral-icon" src="../assets/icons/icon-carbon-neutral.svg" alt="" />
      <p class="cart__carbon-neutral-text">
        This is a <strong class="cart__carbon-neutral-carbon">carbon-neutral</strong> delivery
      </p>
    </div>
    <button class="confirm-order-btn" @click="openDialog">Confirm Order</button>
  </aside>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import { useCartStore } from "@/stores/cart";

const products = ref([]);

const cartStore = useCartStore();

const { openDialog, removeFromCart, getAllItemsUpdated, orderTotal, totalItemsQuantity } =
  cartStore;

const updatedItems = computed(() => getAllItemsUpdated());

const totalOrderPrice = computed(() => orderTotal());

const totalItemsInCart = computed(() => totalItemsQuantity());
</script>
