<template>
  <button
    id="mobileMenuCloseBtn"
    class="mobile-menu__button"
    aria-controls="mobileMenu"
    aria-expanded="false"
    @click="closeMobileMenu"
  >
    <img
      id="closeIcon"
      class="mobile-menu__close-icon"
      src="../../assets/images/icon-close.svg"
      alt="close icon"
    />
  </button>
</template>

<script>
export default {
  methods: {
    closeMobileMenu() {
      this.$emit("close-mobile-menu");
    },
  },
};
</script>
