<template>
  <transition name="fade-cart">
    <aside
      id="shoppingCart"
      class="shopping-cart"
      aria-labelledby="cart-heading"
      v-if="isOpen"
      ref="shoppingCart"
    >
      <div class="padding-wrapper-24 border-btm-s">
        <h2 id="cart-heading" class="shopping-cart__heading">Cart</h2>
      </div>

      <div class="shopping-cart__items-container padding-wrapper-24-24-24-32">
        <ul id="item-list" class="shopping-cart__items-list">
          <p class="shopping-cart__empty-message" v-if="cart.length === 0">Your cart is empty.</p>
          <!-- Cart item -->
          <li class="shopping-cart__item" v-if="cart.length > 0">
            <div class="shopping-cart__image-box">
              <img src="../../assets/images/image-product-1-thumbnail.jpg" alt="" />
            </div>
            <h3 class="shopping-cart__item-title">Fall limited Edition Sneakers</h3>
            <p class="shopping-cart__item-price">
              $125.00 x {{ productQuantity }}
              <span class="shopping-cart__item-total-price">{{ totalSum }}</span>
            </p>
            <div class="shopping-cart__action">
              <button id="remove-button" @click="removeItem">
                <img src="../../assets/images/icon-delete.svg" alt="delete icon" />
              </button>
            </div>
          </li>
        </ul>
        <!-- Checkout button -->
        <a
          id="checkout-button"
          href="#"
          class="shopping-cart__checkout-button"
          v-if="cart.length > 0"
          >Checkout</a
        >
      </div>
    </aside>
  </transition>
</template>

<script>
import { formatCurrency } from "../../utils/NumberFormatter";
import { inject, watch, ref } from "vue";

export default {
  setup() {
    const { cart, remove } = inject("cart");
    const isMenuVisible = inject("isMobileMenuVisible");
    const isOpen = inject("isCartOpen");

    let totalSum = ref(0);
    let productQuantity = ref(0);

    function removeItem() {
      remove();
    }

    watch(cart, (newValue) => {
      if (newValue && newValue.length > 0) {
        productQuantity.value = newValue[0].quantity;
        totalSum.value = formatCurrency({
          locales: "en-US",
          currency: "USD",
          amount: newValue[0].newPrice * newValue[0].quantity,
        });
      }
    });

    return { cart, isMenuVisible, isOpen, removeItem, totalSum, productQuantity };
  },

  watch: {
    isMenuVisible(newVal) {
      const cartRef = this.$refs.shoppingCart;
      if (!cartRef) return;

      if (newVal) {
        this.$refs.shoppingCart.style.zIndex = "-10";
      } else {
        this.$refs.shoppingCart.style.zIndex = "initial";
      }
    },
  },
};
</script>

<style scoped>
.fade-cart-enter-from,
.fade-cart-leave-to {
  opacity: 0;
}

.fade-cart-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-cart-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-cart-enter-to,
.fade-cart-leave-from {
  opacity: 1;
}
</style>
