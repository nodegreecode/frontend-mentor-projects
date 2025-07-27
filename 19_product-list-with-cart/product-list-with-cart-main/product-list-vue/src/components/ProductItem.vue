<template>
  <li>
    <article class="product-item">
      <div class="product-item__image-wrapper">
        <img class="product-item__image" :src="item.image.desktop" alt="" />
        <button class="add-to-cart-btn">
          <img class="add-to-cart-btn__icon" src="/src/assets/icons/icon-add-to-cart.svg" alt="" />
          Add to Cart
        </button>
      </div>

      <span class="product-item__category">{{ item.category }}</span>
      <h3 class="product-item__name">{{ item.name }}</h3>
      <strong class="product-item__price">{{ item.price }}</strong>
    </article>
  </li>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
