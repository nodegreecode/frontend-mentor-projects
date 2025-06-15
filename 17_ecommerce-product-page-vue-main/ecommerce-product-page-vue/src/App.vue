<template>
  <TheHeader />
  <main>
    <ProductCard />
  </main>
  <TheFooter />
</template>

<script>
import TheHeader from "./components/layouts/TheHeader.vue";
import ProductCard from "./components/product/ProductCard.vue";
import TheFooter from "./components/layouts/TheFooter.vue";
import { ref, onMounted, onUnmounted, provide } from "vue";

export default {
  components: {
    TheHeader,
    ProductCard,
    TheFooter,
  },

  setup() {
    const isMobileView = ref(window.innerWidth <= 720);

    const products = [
      {
        id: 234,
        name: "Fall limited Edition Sneakers",
        newPrice: 125,
        oldPrice: 250,
        discount: 0.5,
        productImages: [
          {
            thumb: "/images/image-product-1-thumbnail.jpg",
            full: "/images/image-product-1.jpg",
            alt: "Preview picture of white beige sneakers on an orange background",
          },
          {
            thumb: "/images/image-product-2-thumbnail.jpg",
            full: "/images/image-product-2.jpg",
            alt: "Preview picture of white beige sneakers on an orange background",
          },
          {
            thumb: "/images/image-product-3-thumbnail.jpg",
            full: "/images/image-product-3.jpg",
            alt: "Preview picture of white beige sneakers on an orange background",
          },
          {
            thumb: "/images/image-product-4-thumbnail.jpg",
            full: "/images/image-product-4.jpg",
            alt: "Preview picture of white beige sneakers on an orange background",
          },
        ],
      },
    ];

    const cart = ref([]);

    let quantity = ref(0);

    const increaseQuantity = () => {
      if (!(quantity.value >= 100)) {
        quantity.value++;
      }
    };

    const decreaseQuantity = () => {
      if (!quantity.value < 1) {
        quantity.value--;
      }
    };

    const updateIsMobileView = () => (isMobileView.value = window.innerWidth <= 720);

    onMounted(() => {
      window.addEventListener("resize", updateIsMobileView);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateIsMobileView);
    });

    provide("isMobileView", isMobileView);
    provide("products", products);
    provide("cart", {
      cart,
      remove: () => {
        cart.value = [];
      },
    });
    provide("quantity", quantity);
    provide("increaseQuantity", increaseQuantity);
    provide("decreaseQuantity", decreaseQuantity);
  },
};
</script>

<style></style>
