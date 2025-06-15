<template>
  <button
    id="mobileMenuOpenBtn"
    class="mobile-menu__button"
    aria-controls="mobileMenu"
    aria-expanded="false"
    @click="openMobileMenu"
  >
    <img
      id="menuIcon"
      class="mobile-menu__menu-icon"
      src="../../assets/images/icon-menu.svg"
      alt="menu icon"
    />
  </button>
</template>

<script>
export default {
  methods: {
    openMobileMenu() {
      this.$emit("open-mobile-menu");
    },
  },
};
</script>
