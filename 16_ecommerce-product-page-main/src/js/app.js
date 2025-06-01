import { createEventBus } from "./lib/eventBus.js";
import { ProductGallery } from "./modules/productGallery.js";
import { Helper } from "./lib/helpers.js";
import { MobileMenu } from "./modules/mobileMenu.js";
import { Lightbox } from "./modules/lightbox.js";
import { Cart } from "./modules/cart.js";

document.addEventListener("DOMContentLoaded", () => {
  /* Initialize all modules */
  const EventBus = createEventBus();
  const cart = Cart(EventBus);
  const mobileMenu = MobileMenu(EventBus, cart);
  const productGallery = ProductGallery(EventBus, mobileMenu);
  const lightbox = Lightbox(EventBus);
  const helper = Helper(EventBus, productGallery, lightbox);

  /* Subscribe to the events */
  EventBus.subscribe("renderProduct", cart.renderProduct);

  EventBus.subscribe("addToCart", cart.addItemToCart);

  EventBus.subscribe("removeFromCart", cart.removeItemFromCart);

  EventBus.subscribe("toggleShoppingCart", cart.openShoppingCart);

  EventBus.subscribe("changeQuantity", cart.changeProductQuantity);

  EventBus.subscribe("openMobileMenu", mobileMenu.openMobileMenu);

  EventBus.subscribe("closeMobileMenu", mobileMenu.closeMobileMenu);

  EventBus.subscribe("productImageSelect", productGallery.handleProductImage);

  EventBus.subscribe("previousPicture", productGallery.goToSlide);

  EventBus.subscribe("nextPicture", productGallery.goToSlide);

  EventBus.subscribe("handleMobileView", helper.handleMobileView);

  EventBus.subscribe("resizing", helper.resizeObserver);

  EventBus.subscribe("openLightBox", lightbox.openLightBox);

  EventBus.subscribe("closeLightBox", lightbox.closeLightBox);

  EventBus.subscribe(
    "selectLightboxPreviousProductImage",
    lightbox.selectPreviousProductImage
  );

  EventBus.subscribe(
    "selectLightboxNextProductImage",
    lightbox.selectNextProductImage
  );

  EventBus.subscribe("selectProductImage", lightbox.selectProductImage);

  EventBus.publish("resizing");

  EventBus.publish("selectProductImage");

  EventBus.publish("renderProduct");
});
