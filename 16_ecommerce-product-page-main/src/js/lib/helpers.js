/**
 * Helper Module
 *
 * @param {Object} EventBus - Event bus for publishing/subscribing to events.
 * @param {Object} ProductGallery
 * @returns {Object} - Collection of methods for managing product interactions and UI behaviors.
 */
export const Helper = (EventBus, ProductGallery, Lightbox) => {
  /*  === DOM Elements === */
  /* === Private Methods === */
  /* === Event Handlers === */
  /* === Event Listeners === */

  return {
    /**
     * Initializes a ResizeObserver to monitor changes in the document body.
     */
    resizeObserver() {
      const resizeObserver = new ResizeObserver(() => {
        EventBus.publish("productImageSelect");
        EventBus.publish("handleMobileView", {
          images: ProductGallery.getImageContainers(),
          i: 0,
        });
      });

      resizeObserver.observe(document.body);
    },

    /**
     * Adjusts the product gallery behavior based on the window width.
     *
     * @param {NodeListOf<Element>} data - Image containers
     */
    handleMobileView(data) {
      if (window.innerWidth === 720 || window.innerWidth < 720) {
        ProductGallery.deselectImage(data.images);
        Lightbox.closeLightBox();
      } else if (window.innerWidth === 721 || window.innerWidth > 721) {
        ProductGallery.goToSlide(data.i);
      }
    },
  };
};
