<template>
  <section class="product-section">
    <!-- Product Card -->
    <article class="product-card">
      <!-- Slider Container -->
      <ProductGallery @open-lightbox="openLightBox" />
      <!-- Details Box - Flex Container?! -->
      <ProductDetails />
    </article>
    <!-- Lightbox Container -->
    <ProductLightbox @close-lightbox="closeLightBox" />
  </section>
</template>

<script>
import ProductGallery from "./ProductGallery.vue";
import ProductDetails from "./ProductDetails.vue";
import ProductLightbox from "./ProductLightbox.vue";
import { ref, provide } from "vue";

export default {
  components: {
    ProductGallery,
    ProductDetails,
    ProductLightbox,
  },

  setup() {
    const isLightBoxOpen = ref(false);

    function openLightBox() {
      console.log("Lightbox open...");
      isLightBoxOpen.value = true;
    }

    function closeLightBox() {
      console.log("Closing in parent lightbox...");
      isLightBoxOpen.value = false;
    }

    provide("isLightBoxOpen", {
      value: isLightBoxOpen,
      close: () => (isLightBoxOpen.value = false),
    });

    return { openLightBox, closeLightBox };
  },
};
</script>
