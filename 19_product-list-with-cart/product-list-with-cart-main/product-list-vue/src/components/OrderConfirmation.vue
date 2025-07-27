<template>
  <dialog class="order-confirmation" ref="dialog">
    <header class="order-confirmation__header">
      <img
        class="order-confirmation__confirm-icon"
        src="./assets/icons/icon-order-confirmed.svg"
        alt=""
      />
      <h1 class="order-confirmation__heading">Order Confirmed</h1>
      <p class="order-confirmation__text">We hope you enjoy your food</p>
    </header>
    <section class="order-confirmation__section">
      <ul class="order-confirmation__items">
        <li class="order-confirmation__item">
          <img
            class="order-confirmation__item-thumbnail"
            src="/images/image-creme-brulee-thumbnail.jpg"
            alt=""
          />
          <div class="order-confirmation__item-details">
            <h3 class="item__name">Vanilla Bean Crème Brûlée</h3>
            <span class="item__quantity">2x</span>
            <span class="item__price">@ $7.00</span>
          </div>
          <span class="order-confirmation__item-total">$14.00</span>
        </li>
        <li class="order-confirmation__item">
          <img
            class="order-confirmation__item-thumbnail"
            src="/images/image-creme-brulee-thumbnail.jpg"
            alt=""
          />
          <div class="order-confirmation__item-details">
            <h3 class="item__name">Vanilla Bean Crème Brûlée</h3>
            <span class="item__quantity">2x</span>
            <span class="item__price">@ $7.00</span>
          </div>
          <span class="order-confirmation__item-total">$14.00</span>
        </li>
        <li class="order-confirmation__item">
          <img
            class="order-confirmation__item-thumbnail"
            src="/images/image-creme-brulee-thumbnail.jpg"
            alt=""
          />
          <div class="order-confirmation__item-details">
            <h3 class="item__name">Vanilla Bean Crème Brûlée</h3>
            <span class="item__quantity">2x</span>
            <span class="item__price">@ $7.00</span>
          </div>
          <span class="order-confirmation__item-total">$14.00</span>
        </li>
      </ul>
      <div class="order-confirmation__order-total">
        <span class="cart__order-total-text">Order Total:</span>
        <span class="cart__order-total-sum">$28.00</span>
      </div>
      <button class="confirm-order-btn">Start New Order</button>
    </section>
  </dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";

const dialog = ref(null);

const openDialog = () => {
  if (dialog.value) {
    // dialog.value.showModal();
  }
};

onMounted(() => {
  openDialog();
});
</script>
