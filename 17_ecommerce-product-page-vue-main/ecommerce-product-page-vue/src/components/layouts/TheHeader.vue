<template>
  <header class="header">
    <div class="flex-item-wrapper gap-60-desktop gap-16-mobil">
      <!-- Mobile Menu Open Button-->
      <MobileMenuOpenButton @open-mobile-menu="handleOpenMobileMenu" />
      <!-- Mobile Navigation -->
      <MobileMenu />
      <!-- Logo -->
      <Logo />
      <!-- Desktop Navigation -->
      <DesktopMenu />
    </div>
    <div class="flex-item-wrapper gap-32-desktop gap-24-mobil relativ">
      <!-- Cart Button -->
      <CartButton @toggle-cart="toggleCart" />
      <!-- Shopping Cart -->
      <ShoppingCart />
      <!-- Avatar-->
      <Avatar />
    </div>
  </header>
</template>

<script>
import MobileMenuOpenButton from "../ui/MobileMenuOpenButton.vue";
import MobileMenu from "../layouts/MobileMenu.vue";
import Logo from "../ui/Logo.vue";
import DesktopMenu from "../layouts/DesktopMenu.vue";
import CartButton from "../ui/CartButton.vue";
import ShoppingCart from "../cart/ShoppingCart.vue";
import Avatar from "../ui/Avatar.vue";
import { ref, provide, inject } from "vue";

export default {
  components: {
    MobileMenuOpenButton,
    MobileMenu,
    Logo,
    DesktopMenu,
    CartButton,
    ShoppingCart,
    Avatar,
  },

  setup() {
    const isMobileMenuVisible = ref(false);
    const isCartOpen = ref(false);

    function handleOpenMobileMenu() {
      isMobileMenuVisible.value = true;
    }

    const closeMobileMenu = () => {
      isMobileMenuVisible.value = false;
    };

    function toggleCart() {
      isCartOpen.value = !isCartOpen.value;
    }

    provide("isMobileMenuVisible", isMobileMenuVisible);
    provide("closeMobileMenu", { close: closeMobileMenu });
    provide("isCartOpen", isCartOpen);

    return { handleOpenMobileMenu, toggleCart };
  },
};
</script>
