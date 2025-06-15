<template>
  <div class="avatar" aria-label="User avatar" tabindex="0" ref="avatar">
    <img
      class="avatar__image"
      src="../../assets/images/image-avatar.png"
      alt="A man wearing sunglasses with curly dark hair"
    />
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    const isMenuVisible = inject("isMobileMenuVisible");

    return { isMenuVisible };
  },

  watch: {
    isMenuVisible(newValue) {
      if (newValue) {
        this.$refs.avatar.style.zIndex = "-10";
      } else {
        this.$refs.avatar.style.zIndex = "initial";
      }
    },
  },
};
</script>
