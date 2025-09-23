<template>
  <section class="products">
    <h1 class="products__title">Desserts</h1>
    <ul class="grid-container">
      <!-- if cart.products.contains(item) item.classList.add("selected") -->
      <ProductItem v-for="item in items" :item="item" v-bind:key="item.name" />
      <!-- 
      <li>
        <article class="product-item">
          <div class="product-item__image-wrapper">
            <img class="product-item__image" src="/images/image-waffle-desktop.jpg" alt="" />
            <button class="add-to-cart-btn">
              <img
                class="add-to-cart-btn__icon"
                src="/src/assets/icons/icon-add-to-cart.svg"
                alt=""
              />
              Add to Cart
            </button>
          </div>

          <span class="product-item__category">Waffle</span>
          <h3 class="product-item__name">Waffle with Berries</h3>
          <strong class="product-item__price">6.50</strong>
        </article>
      </li>

      <li>
        <article class="product-item selected">
          <div class="product-item__image-wrapper">
            <img class="product-item__image" src="/images/image-creme-brulee-desktop.jpg" alt="" />
            <div class="product-amount-btn">
              <button>
                <img
                  class="product-amount-btn__decrement-icon"
                  src="/src/assets/icons/icon-decrement-quantity.svg"
                  alt=""
                />
              </button>
              <span>4</span>
              <button>
                <img
                  class="product-amount-btn__increment-icon"
                  src="/src/assets/icons/icon-increment-quantity.svg"
                  alt=""
                />
              </button>
            </div>
          </div>
          <span class="product-item__category">Crème Brûlée</span>
          <h3 class="product-item__name">Vanilla Bean Crème Brûlée</h3>
          <strong class="product-item__price">7.00 </strong>
        </article>
      </li>

      <li>
        <article class="product-item">
          <div class="product-item__image-wrapper">
            <img class="product-item__image" src="/images/image-macaron-desktop.jpg" alt="" />
            <button class="add-to-cart-btn">
              <img
                class="add-to-cart-btn__icon"
                src="/src/assets/icons/icon-add-to-cart.svg"
                alt=""
              />
              Add to Cart
            </button>
          </div>
          <span class="product-item__category">Macaron </span>
          <h3 class="product-item__name">Macaron Mix of Five Macaron</h3>
          <strong class="product-item__price">8.00</strong>
        </article>
      </li>

      <li>
        <article class="product-item">
          <div class="product-item__image-wrapper">
            <img class="product-item__image" src="/images/image-tiramisu-desktop.jpg" alt="" />
            <button class="add-to-cart-btn">
              <img
                class="add-to-cart-btn__icon"
                src="/src/assets/icons/icon-add-to-cart.svg"
                alt=""
              />
              Add to Cart
            </button>
          </div>
          <span class="product-item__category">Tiramisu </span>
          <h3 class="product-item__name">Classic Tiramisu</h3>
          <strong class="product-item__price">5.50</strong>
        </article>
      </li>

      <li>
        <article class="product-item">
          <div class="product-item__image-wrapper">
            <img class="product-item__image" src="/images/image-baklava-desktop.jpg" alt="" />
            <button class="add-to-cart-btn">
              <img
                class="add-to-cart-btn__icon"
                src="/src/assets/icons/icon-add-to-cart.svg"
                alt=""
              />
              Add to Cart
            </button>
          </div>
          <span class="product-item__category"> Baklava </span>
          <h3 class="product-item__name">Pistachio Baklava</h3>
          <strong class="product-item__price">4.00</strong>
        </article>
      </li>

      <li>
        <article class="product-item">
          <div class="product-item__image-wrapper">
            <img class="product-item__image" src="/images/image-meringue-desktop.jpg" alt="" />
            <button class="add-to-cart-btn">
              <img
                class="add-to-cart-btn__icon"
                src="/src/assets/icons/icon-add-to-cart.svg"
                alt=""
              />
              Add to Cart
            </button>
          </div>
          <span class="product-item__category">Pie </span>
          <h3 class="product-item__name">Lemon Meringue Pie</h3>
          <strong class="product-item__price">5.00</strong>
        </article>
      </li>

      <li>
        <article class="product-item">
          <div class="product-item__image-wrapper">
            <img class="product-item__image" src="/images/image-cake-desktop.jpg" alt="" />
            <button class="add-to-cart-btn">
              <img
                class="add-to-cart-btn__icon"
                src="/src/assets/icons/icon-add-to-cart.svg"
                alt=""
              />
              Add to Cart
            </button>
          </div>
          <span class="product-item__category"> Cake </span>
          <h3 class="product-item__name">Red Velvet Cake</h3>
          <strong class="product-item__price">4.50</strong>
        </article>
      </li>

      <li>
        <article class="product-item">
          <div class="product-item__image-wrapper">
            <img class="product-item__image" src="/images/image-brownie-desktop.jpg" alt="" />
            <button class="add-to-cart-btn">
              <img
                class="add-to-cart-btn__icon"
                src="/src/assets/icons/icon-add-to-cart.svg"
                alt=""
              />
              Add to Cart
            </button>
          </div>
          <span class="product-item__category"> Brownie </span>
          <h3 class="product-item__name">Salted Caramel Brownie</h3>
          <strong class="product-item__price">4.50 </strong>
        </article>
      </li>

      <li>
        <article class="product-item">
          <div class="product-item__image-wrapper">
            <img class="product-item__image" src="/images/image-panna-cotta-desktop.jpg" alt="" />
            <button class="add-to-cart-btn">
              <img
                class="add-to-cart-btn__icon"
                src="/src/assets/icons/icon-add-to-cart.svg"
                alt=""
              />
              Add to Cart
            </button>
          </div>
          <span class="product-item__category"> Panna Cotta </span>
          <h3 class="product-item__name">Vanilla Panna Cotta</h3>
          <strong class="product-item__price">6.50</strong>
        </article>
      </li>
      -->
    </ul>
  </section>
</template>

<script setup>
import { onMounted, computed } from "vue";
import ProductItem from "./ProductItem.vue";
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();
const { loadData } = productsStore;

onMounted(() => {
  if (!productsStore.products.length) {
    loadData();
  }
});

const items = computed(() => productsStore.allProducts);
</script>
