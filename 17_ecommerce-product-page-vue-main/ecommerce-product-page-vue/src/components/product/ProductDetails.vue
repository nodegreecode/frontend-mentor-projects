<template>
  <div class="product-card__details-box">
    <p class="details-box__brand-name">Sneaker Company</p>
    <h1 class="details-box__heading">Fall Limited Edition Sneakers</h1>
    <p class="details-box__description">
      These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber
      outer sole, they’ll withstand everything the weather can offer.
    </p>
    <div class="details-box__price-container flex-container gap-12-desktop mb-1">
      <div>
        <p class="details-box__new-price">
          {{ formattedNewPrice }}
        </p>
        <span class="details-box__discount">{{ formattedDiscount }}</span>
      </div>
      <p class="details-box__old-price">{{ formattedOldPrice }}</p>
    </div>
    <div class="flex-container gap-24-desktop justify-content-center flex-wrap-mobile">
      <div id="productQuantityWrapper" class="details-box__product-quantity-wrapper flex-container">
        <button
          id="decreaseQuantity"
          class="details-box__product-quantity-button"
          type="button"
          @click="decreaseQuantity"
        >
          <img
            class="details-box__minus-icon"
            src="../../assets/images/icon-minus.svg"
            alt="Minus icon"
          />
        </button>
        <input
          id="productQuanity"
          class="details-box__product-quantity"
          type="number"
          v-model="quantity"
          placeholder="0"
          min="0"
          max="100"
        />
        <button
          id="increaseQuantity"
          class="details-box__product-quantity-button"
          type="button"
          @click="increaseQuantity"
        >
          <img
            class="details-box__plus-icon"
            src="../../assets/images/icon-plus.svg"
            alt="Plus icon"
          />
        </button>
      </div>
      <button id="addToCartButton" class="details-box__add-button" type="button" @click="addToCart">
        <img
          class="details-box__cart-icon"
          src="../../assets/images/icon-cart.svg"
          alt="Cart icon"
        />
        Add to cart
      </button>
    </div>
  </div>
</template>

<script>
import { formatCurrency, formatToPercent } from "../../utils/NumberFormatter";
import { ref, inject, onMounted, computed } from "vue";

export default {
  setup() {
    const products = inject("products");
    let product = ref({});
    let { cart, remove } = inject("cart");
    const quantity = inject("quantity");
    const increaseQuantity = inject("increaseQuantity");
    const decreaseQuantity = inject("decreaseQuantity");

    function mapToProduct() {
      product.value = products.reduce((acc, prod) => {
        return (acc = { ...prod });
      }, {});
    }

    function addToCart() {
      if (quantity.value === 0) {
        cart.value.value = [];
        return;
      }

      const existedProductIndex = cart.value.findIndex((p) => p.id === product.value.id);
      if (existedProductIndex !== -1) {
        quantity.value === 0
          ? (cart.value = [])
          : (cart.value = cart.value.map((p) =>
              p.id === product.value.id ? { ...p, quantity: quantity.value } : p
            ));
      } else {
        cart.value = [{ ...product.value, quantity: quantity.value }];
      }
    }

    const formattedNewPrice = computed(() => {
      return formatCurrency({ locales: "en-US", currency: "USD", amount: product.value.newPrice });
    });

    const formattedDiscount = computed(() => {
      return formatToPercent({ locales: "en-US", amount: product.value.discount });
    });

    const formattedOldPrice = computed(() => {
      return formatCurrency({ locales: "en-US", currency: "USD", amount: product.value.oldPrice });
    });

    onMounted(() => {
      mapToProduct();
    });

    return {
      quantity,
      products,
      cart,
      increaseQuantity,
      decreaseQuantity,
      addToCart,
      formattedNewPrice,
      formattedDiscount,
      formattedOldPrice,
    };
  },
};
</script>
