<template>
  <aside class="cart">
    <h2 class="cart__title">Your Cart ({{ totalItemsQuantity }})</h2>
    <ul class="cart__items">
      <li class="cart__empty-message" v-if="totalItemsQuantity === 0">
        <img class="cart__empty-image" src="../assets/images/illustration-empty-cart.svg" alt="" />
        <p class="cart__empty-text">Your added items will appear here</p>
      </li>
      <!-- Items -->
      <li class="cart__item" v-for="item in itemsWithTotalPrice" :key="item.name">
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
      <!-- Items 
      <li class="cart__item">
        <div class="item__details">
          <h3 class="item__name">Vanilla Bean Crème Brûlée</h3>
          <span class="item__quantity">2x</span>
          <span class="item__price">@ $7.00</span>
          <span class="item__total">$14.00</span>
        </div>
        <button class="item__remove-btn">
          <img src="../assets/icons/icon-remove-item.svg" alt="Remove item" />
        </button>
      </li> -->
    </ul>
    <div class="cart__order-total">
      <span class="cart__order-total-text">Order Total:</span>
      <span class="cart__order-total-sum">${{ totalItemsPrice }}</span>
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

const cartStore = useCartStore;

const { openDialog, removeFromCart, getAllItemsInCart } = cartStore();

const items = computed(() => getAllItemsInCart());

const itemsWithTotalPrice = computed(() =>
  items.value.map((item) => ({ ...item, total: item.price * item.quantity }))
);

const totalItemsQuantity = computed(() =>
  items.value.reduce((sum, item) => (sum += item.quantity), 0)
);

const totalItemsPrice = computed(() =>
  itemsWithTotalPrice.value.reduce((totalSum, item) => (totalSum += item.total), 0)
);
</script>
