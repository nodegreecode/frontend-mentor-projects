<template>
  <button
    @click="toggleShoppingCart"
    id="shoppingCartButton"
    class="shopping-cart__button"
    ref="cartButton"
  >
    <span id="itemCount" class="shopping-cart__item-count" v-if="isProductAdded">{{
      productQuantity
    }}</span>
    <img src="../../assets/images/icon-cart.svg" alt="cart icon" />
  </button>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    const { cart, remove } = inject("cart");
    const isMenuVisible = inject("isMobileMenuVisible");
    return { cart, isMenuVisible };
  },

  data() {
    return {
      isProductAdded: false,
      productQuantity: 0,
    };
  },

  methods: {
    toggleShoppingCart() {
      this.$emit("toggle-cart");
    },
  },

  watch: {
    cart(newValue) {
      if (newValue?.length > 0) {
        this.isProductAdded = true;
        const [{ quantity }] = newValue;
        this.productQuantity = quantity;
      } else {
        this.isProductAdded = false;
      }
    },
    isMenuVisible(newValue) {
      if (newValue) {
        this.$refs.cartButton.style.zIndex = "-10";
      } else {
        this.$refs.cartButton.style.zIndex = "initial";
      }
    },
  },
};
</script>
