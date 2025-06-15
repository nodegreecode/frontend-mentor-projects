<template>
  <dialog id="lightboxModal" class="lightbox" ref="dialog">
    <div class="lightbox__container">
      <!-- Close Button -->
      <button
        id="lightboxCloseButton"
        class="lightbox__close-button"
        aria-label="Close lightbox"
        tabindex="0"
        @click="closeLightBox"
      >
        x
      </button>
      <!-- Main Lightbox Content -->
      <div class="lightbox__content">
        <figure class="lightbox__figure">
          <img
            id="lighboxCurrentImage"
            class="lightbox__image"
            :src="currentImage"
            alt="Lightbox current image of the product"
          />
        </figure>
        <!-- Navigation arrows (for multi-image lightboxes) -->
        <button
          id="lightboxPrevious"
          class="lightbox__navigation-arrow lightbox__previous"
          aria-label="Previous product picture"
          tabindex="0"
          @click="previousImage"
        >
          <img src="../../assets/images/icon-previous.svg" alt="Lightbox previous picture button" />
        </button>
        <button
          id="ligthboxNext"
          class="lightbox__navigation-arrow lightbox__next"
          aria-label="Next product picture"
          tabindex="0"
          @click="nextImage"
        >
          <img src="../../assets/images/icon-next.svg" alt="Lightbox next picture button" />
        </button>
      </div>
      <!-- Thumbnail navigation -->
      <div class="lightbox__thumbnails">
        <div v-for="(image, index) in productImages" :key="index">
          <button
            class="lightbox__thumbnail"
            :class="{ selected: selectedIndex === index }"
            aria-current="true"
            @click="selectImage(index)"
          >
            <img
              class="lightbox__thumbnail-image"
              :src="image.thumb"
              alt="Preview picture of white beige sneakers on an orange background"
            />
            <div class="overlay" v-if="selectedIndex === index"></div>
          </button>
        </div>

        <!--
        <button class="lightbox__thumbnail">
          <img
            class="lightbox__thumbnail-image"
            src="../src/images/image-product-2-thumbnail.jpg"
            alt="Preview picture of white beige sneakers on an orange background"
          />
        </button>
        <button class="lightbox__thumbnail">
          <img
            class="lightbox__thumbnail-image"
            src="../src/images/image-product-3-thumbnail.jpg"
            alt="Preview picture of white beige sneakers on an orange background"
          />
        </button>
        <button class="lightbox__thumbnail">
          <img
            class="lightbox__thumbnail-image"
            src="../src/images/image-product-4-thumbnail.jpg"
            alt="Preview picture of white beige sneakers on an orange background"
          />
        </button>
        -->
      </div>
    </div>
  </dialog>
</template>

<script>
import { onMounted, watch, inject, ref } from "vue";

export default {
  setup(_, { emit }) {
    const isOpen = inject("isLightBoxOpen");
    const dialog = ref(null);
    const products = inject("products");
    const productImages = products[0].productImages;
    let currentImage = ref(productImages[0].full);
    let selectedIndex = ref(productImages.indexOf(productImages[0]));

    const isMobileView = inject("isMobileView");

    function closeLightBox() {
      console.log("Closing lightbox..");
      emit("close-lightbox");
    }

    function selectImage(i) {
      selectedIndex.value = i;
      currentImage.value = productImages[i].full;
    }

    function previousImage() {
      selectedIndex.value--;
      if (selectedIndex.value < 0) {
        selectedIndex.value = productImages.length - 1;
      }
      selectImage(selectedIndex.value);
    }

    function nextImage() {
      selectedIndex.value++;
      if (selectedIndex.value === productImages.length) {
        selectedIndex.value = 0;
      }
      selectImage(selectedIndex.value);
    }

    watch(isOpen.value, (newValue) => {
      if (newValue) {
        dialog.value.showModal();
      } else if (!newValue) {
        dialog.value.close();
      }
    });

    watch(isMobileView, (newValue) => {
      if (newValue) {
        dialog.value.close();
        isOpen.close();
      }
    });

    onMounted(() => {
      isOpen.close();

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          isOpen.close();
        }
      });
    });

    return {
      dialog,
      closeLightBox,
      currentImage,
      productImages,
      selectedIndex,
      selectImage,
      previousImage,
      nextImage,
    };
  },
};
</script>
