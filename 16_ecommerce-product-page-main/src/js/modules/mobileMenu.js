/**
 * MobileMenu  Module
 *
 * @param {Object} EventBus - Event bus for publishing/subscribing to events.
 * @returns {Object} - Methods for controlling the mobile menu.

 */
export const MobileMenu = (EventBus, Cart) => {
  /*  === DOM Elements === */
  const mobileMenOpenButton = document.getElementById("mobileMenuOpenBtn");
  const mobileMenCloseButton = document.getElementById("mobileMenuCloseBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const avatarContainer = document.querySelector(".avatar");

  /* === Event Handlers === */
  const handleOpenMobileMenu = () => EventBus.publish("openMobileMenu");

  const handleCloseMobileMenu = () => EventBus.publish("closeMobileMenu");

  /* === Event Listeners === */
  mobileMenOpenButton.addEventListener("click", handleOpenMobileMenu);

  mobileMenCloseButton.addEventListener("click", handleCloseMobileMenu);

  return {
    /**
     * Getter
     *
     * @returns {Element} - The mobile menu DOM element.
     */
    getMobileMenu() {
      return mobileMenu;
    },

    /**
     * Opens the mobile menu
     */
    openMobileMenu() {
      mobileMenu.showModal();
      Cart.getShoppingCartButton().style.zIndex = "-10";
      avatarContainer.style.zIndex = "-10";
      Cart.getCart().style.zIndex = "-10";
    },
    /**
     * Closes the mobile menu
     */
    closeMobileMenu() {
      mobileMenu.close();
      Cart.getShoppingCartButton().style.zIndex = "initial";
      avatarContainer.style.zIndex = "initial";
      Cart.getCart().style.zIndex = "initial";
    },
  };
};
