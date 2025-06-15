<template>
  <div class="custom-backdrop__wrapper">
    <!-- Mobile Navigation -->
    <dialog id="mobileMenu" class="mobile-menu" ref="dialog">
      <nav class="navigation-mobile" aria-label="mobile navigation">
        <!-- Mobile Menu Close Button-->
        <MobileMenuCloseButton @close-mobile-menu="handleCloseMobileMenu" />
        <ul class="navigation-mobile__list">
          <li class="navigation-mobile__item">
            <a href="#" class="navigation-mobile__link">Collections</a>
          </li>
          <li class="navigation-mobile__item">
            <a href="#" class="navigation-mobile__link">Men</a>
          </li>
          <li class="navigation-mobile__item">
            <a href="#" class="navigation-mobile__link">Women</a>
          </li>
          <li class="navigation-mobile__item">
            <a href="#" class="navigation-mobile__link">About</a>
          </li>
          <li class="navigation-mobile__item">
            <a href="#" class="navigation-mobile__link">Contact</a>
          </li>
        </ul>
      </nav>
    </dialog>
    <div class="custom-backdrop__container">
      <div class="custom-backdrop__backdrop"></div>
    </div>
  </div>
</template>

<script>
import MobileMenuCloseButton from "../ui/MobileMenuCloseButton.vue";
import { ref, inject, watch } from "vue";

export default {
  setup() {
    const isVisible = inject("isMobileMenuVisible");
    const closeMenu = inject("closeMobileMenu");
    const dialog = ref(null);
    const isMobV = inject("isMobileView");

    function handleCloseMobileMenu() {
      closeMenu.close();
    }

    watch(isVisible, (newValue, oldValue) => {
      if (newValue) {
        dialog.value?.showModal();
      } else {
        dialog.value?.close();
      }
    });

    watch(isMobV, (newValue) => {
      if (!newValue) {
        dialog.value.close();
        closeMenu.close();
      }
    });

    return { dialog, handleCloseMobileMenu };
  },

  components: {
    MobileMenuCloseButton,
  },
};
</script>
