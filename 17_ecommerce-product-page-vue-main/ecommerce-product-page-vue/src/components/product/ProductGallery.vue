<template>
  <div class="slider-container">
    <!-- Image Box - Grid/Flex Container -->
    <div id="slides" class="product-card__image-box" ref="slides">
      <div class="image-box__current-image">
        <button
          id="lightboxTrigger"
          class="image-box__lightbox-trigger"
          aria-label="Current product image"
          tabindex="0"
          @click="openLightBox"
        >
          <img id="currentProductImage" :src="currentImage" :alt="altText" />
        </button>
      </div>
      <!-- Thumbnails Containers -->
      <div
        class="image-box__image"
        :class="{ selected: selectedIndex === index && !isMobileView }"
        aria-label="Choose product image"
        tabindex="0"
        v-for="(image, index) in productImages"
        :key="index"
        @click="selectImage(index)"
      >
        <picture>
          <source media="(min-width: 721px)" :srcset="image.thumb" />
          <source media="(max-width: 720px)" :srcset="image.full" />
          <img
            src="../../assets/images/image-product-1-thumbnail.jpg"
            alt="Preview picture of white beige sneakers on an orange background"
          />
        </picture>
        <div class="overlay" v-if="selectedIndex === index && !isMobileView"></div>
      </div>
    </div>
    <!-- Navigation Arrows -->
    <button id="leftArrow" class="slider-arrow left-arrow" @click="previousProductPicture">
      <img src="../../assets/images/icon-previous.svg" alt="Previous arrow button" />
    </button>
    <button id="rightArrow" class="slider-arrow right-arrow" @click="nextProductPicture">
      <img src="../../assets/images/icon-next.svg" alt="Next arrow button" />
    </button>
  </div>
</template>

<script>
import { inject, ref, watch } from "vue";

export default {
  setup(_, { emit }) {
    const products = inject("products");

    const productImages = products[0].productImages;

    const isMobileView = inject("isMobileView");

    const currentImage = ref(productImages[0].full);

    const altText = productImages[0].alt;

    let selectedIndex = ref(productImages.indexOf(productImages[0]));

    const slides = ref(null);

    let currentIndex = ref(0);

    const slideCount = productImages.length;

    function selectImage(index) {
      selectedIndex.value = index;
      currentImage.value = productImages[index].full;
    }

    function nextProductPicture() {
      currentIndex.value++;
      if (currentIndex.value > slideCount - 1) {
        currentIndex.value = 0;
      }
      slides.value.style.transform = `translateX(-${currentIndex.value * 100}%)`;
    }

    function previousProductPicture() {
      currentIndex.value--;
      if (currentIndex.value < 0) {
        currentIndex.value = slideCount - 1;
      }
      slides.value.style.transform = `translateX(-${currentIndex.value * 100}%)`;
    }

    function openLightBox() {
      emit("open-lightbox");
    }

    watch(isMobileView, (_, oldValue) => {
      if (oldValue) {
        slides.value.style.transform = `translateX(-${0 * 100}%)`;
        selectedIndex.value = 0;
      }
    });

    return {
      isMobileView,
      productImages,
      currentImage,
      selectedIndex,
      altText,
      selectImage,
      slides,
      previousProductPicture,
      nextProductPicture,
      openLightBox,
    };
  },
};
</script>
