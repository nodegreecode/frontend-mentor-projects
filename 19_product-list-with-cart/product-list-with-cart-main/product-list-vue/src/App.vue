<script setup>
import { ref } from "vue";

const products = ref([]);
</script>

<template>
  <main>
    <div class="container">
      <!-- 1. Products.vue -->
      <section class="products">
        <h1 class="products__title">Desserts</h1>

        <ul class="grid-container">
          <li>
            <!-- 2. ProductItem.vue -->
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
                <img
                  class="product-item__image"
                  src="/images/image-creme-brulee-desktop.jpg"
                  alt=""
                />
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
                <img
                  class="product-item__image"
                  src="/images/image-panna-cotta-desktop.jpg"
                  alt=""
                />
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
        </ul>
      </section>
      <!-- Shopping Cart-->
      <aside class="cart">
        <h2 class="cart__title">Your Cart (0)</h2>
        <ul class="cart__items">
          <li class="cart__empty-message" v-if="products.length > 0">
            <img
              class="cart__empty-image"
              src="./assets/images/illustration-empty-cart.svg"
              alt=""
            />
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
              <img src="./assets/icons/icon-remove-item.svg" alt="Remove item" />
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
              <img src="./assets/icons/icon-remove-item.svg" alt="Remove item" />
            </button>
          </li>
        </ul>
        <div class="cart__order-total">
          <span class="cart__order-total-text">Order Total:</span>
          <span class="cart__order-total-sum">$28.00</span>
        </div>
        <div class="cart__carbon-neutral-message">
          <img
            class="cart__carbon-neutral-icon"
            src="./assets/icons/icon-carbon-neutral.svg"
            alt=""
          />
          <p class="cart__carbon-neutral-text">
            This is a <strong class="cart__carbon-neutral-carbon">carbon-neutral</strong> delivery
          </p>
        </div>
        <button class="confirm-order-btn">Confirm Order</button>
      </aside>
      <!-- Order Confirmation Modal -->
      <dialog id="order-confirmation-model" open>
        <h3>Order Confirmation</h3>
        <span>We hope you enjoed your food</span>
        <ul>
          <li>
            <img src="" alt="" />
            <h3 class="item__name">Vanilla Bean Crème Brûlée</h3>
            <span class="item__quantity">2x</span>
            <span class="item__price">@ $7.00</span>
            <span class="item__total">$14.00</span>
          </li>
        </ul>
        <div class="cart__order-total">
          <span class="cart__order-total-text">Order Total:</span>
          <span class="cart__order-total-sum">$28.00</span>
        </div>
        <button class="confirm-order-btn">Start New Order</button>
      </dialog>
    </div>
  </main>
  <footer>
    <div class="attribution">
      Challenge by
      <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. Coded by
      <a href="#">Anatolii Vasylenko</a>.
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use "./assets/scss/utils/_variables.scss";
@use "./assets/scss/utils/_mixins.scss";

main {
  padding: 4rem 0;

  @include mixins.respond-tablet {
    padding: 0;
  }
}

main,
footer {
  background-color: variables.$rose-50;
}
</style>
