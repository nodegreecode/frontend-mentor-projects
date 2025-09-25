<template>
  <dialog class="order-confirmation" ref="dialog">
    <header class="order-confirmation__header">
      <img class="order-confirmation__confirm-icon" src="/icons/icon-order-confirmed.svg" alt="" />
      <h1 class="order-confirmation__heading">
        Order <br class="order-confirmation__heading--mobile" />
        Confirmed
      </h1>
      <p class="order-confirmation__text">We hope you enjoy your food</p>
    </header>
    <section class="order-confirmation__section">
      <ul class="order-confirmation__items">
        <li class="order-confirmation__item" v-for="item in updatedItems" :key="item.name">
          <img class="order-confirmation__item-thumbnail" :src="item.image.thumbnail" alt="" />
          <div class="order-confirmation__item-details">
            <h3 class="item__name">{{ item.name }}</h3>
            <span class="item__quantity">{{ item.quantity }}x</span>
            <span class="item__price">@ {{ item.formattedPrice }}</span>
          </div>
          <span class="order-confirmation__item-total">{{ item.total }}</span>
        </li>
      </ul>
      <div class="order-confirmation__order-total">
        <span class="cart__order-total-text">Order Total:</span>
        <span class="cart__order-total-sum">{{ totalOrderPrice }}</span>
      </div>
      <button class="confirm-order-btn" @click="closeDialog">Start New Order</button>
    </section>
  </dialog>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();

const { isDialogOpen, closeDialog, getAllItemsUpdated, formattedOrderTotal } = cartStore;

const dialog = ref(null);

const isOpen = computed(() => isDialogOpen());

const updatedItems = computed(() => getAllItemsUpdated());

const totalOrderPrice = computed(() => formattedOrderTotal());

watch(isOpen, (newValue) => {
  if (newValue) {
    dialog.value.showModal();
    window.scroll(0, 0);
    document.body.style.overflow = "hidden";
  } else {
    dialog.value.close();
    document.body.style.overflow = "";
  }
});
</script>
