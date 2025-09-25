<template>
  <li>
    <article ref="productWrapper" class="product-item" :class="{ selected: isInCart }">
      <div class="product-item__image-wrapper">
        <picture>
          <source media="(min-width: 905px)" :srcset="item.image.desktop" />
          <source media="(min-width: 376px)" :srcset="item.image.tablet" />
          <img
            class="product-item__image"
            :src="item.image.mobile"
            :alt="item.name"
            loading="lazy"
          />
        </picture>

        <!-- Add to Cart Button -->
        <button class="add-to-cart-btn" @click="addToCart(item, productWrapper)">
          <img class="add-to-cart-btn__icon" src="/icons/icon-add-to-cart.svg" alt="" />
          Add to Cart
        </button>
        <!-- Product Quantity Button -->
        <div class="product-amount-btn" v-if="isInCart">
          <button @click="decreaseProductQuantity(item.name)">
            <img
              class="product-amount-btn__decrement-icon"
              src="/icons/icon-decrement-quantity.svg"
              alt=""
            />
          </button>
          <span>{{ poductQuantity }} </span>
          <button @click="increaseProductQuantity(item.name)">
            <img
              class="product-amount-btn__increment-icon"
              src="/icons/icon-increment-quantity.svg"
              alt=""
            />
          </button>
        </div>
      </div>

      <span class="product-item__category">{{ item.category }}</span>
      <h3 class="product-item__name">{{ item.name }}</h3>
      <strong class="product-item__price">{{ item.formattedPrice }}</strong>
    </article>
  </li>
</template>

<script setup>
import { computed, ref } from "vue";
import { useCartStore } from "@/stores/cart";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const productWrapper = ref(null);
const cartStore = useCartStore();
const {
  addToCart,
  isItemInCart,
  getAllItemsUpdated,
  increaseProductQuantity,
  decreaseProductQuantity,
} = cartStore;

const isInCart = computed(() => isItemInCart(props.item.name));

const poductQuantity = computed(() => {
  const itemsInCart = getAllItemsUpdated();
  const actualItem = itemsInCart.find((item) => item.name === props.item.name);
  return actualItem.quantity;
});
</script>
