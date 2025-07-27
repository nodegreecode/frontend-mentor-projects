<template>
  <aside class="cart">
    <h2 class="cart__title">Your Cart (0)</h2>
    <ul class="cart__items">
      <li class="cart__empty-message" v-if="products.length > 0">
        <img class="cart__empty-image" src="./assets/images/illustration-empty-cart.svg" alt="" />
        <p class="cart__empty-text">Your added items will appear here</p>
      </li>
      <!-- Items -->
      <li class="cart__item">
        <div class="item__details">
          <h3 class="item__name">Vanilla Bean Crème Brûlée</h3>
          <span class="item__quantity">1x</span>
          <span class="item__price">@ $7.00</span>
          <span class="item__total">$7.00</span>
        </div>
        <button class="item__remove-btn">
          <img src="../assets/icons/icon-remove-item.svg" alt="Remove item" />
        </button>
      </li>
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
      </li>
    </ul>
    <div class="cart__order-total">
      <span class="cart__order-total-text">Order Total:</span>
      <span class="cart__order-total-sum">$28.00</span>
    </div>
    <div class="cart__carbon-neutral-message">
      <img class="cart__carbon-neutral-icon" src="../assets/icons/icon-carbon-neutral.svg" alt="" />
      <p class="cart__carbon-neutral-text">
        This is a <strong class="cart__carbon-neutral-carbon">carbon-neutral</strong> delivery
      </p>
    </div>
    <button class="confirm-order-btn">Confirm Order</button>
  </aside>
</template>

<script setup>
import { ref, onMounted } from "vue";

const products = ref([]);

const dialog = ref(null);

const openDialog = () => {
  if (dialog.value) {
    //dialog.value.showModal();
  }
};

onMounted(() => {
  openDialog();
});
</script>
