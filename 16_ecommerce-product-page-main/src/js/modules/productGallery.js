/**
 * ProductGallery Module
 *
 * @param {Object} EventBus
 * @returns {Object} - Collection of methods for handling product image interactions.

 */
export const ProductGallery = (EventBus, MobileMenu) => {
  let currentIndex = 0;
  let currentImageListeners = [];
  /*  === DOM Elements === */
  const slides = document.getElementById("slides");
  const previousPicture = document.getElementById("leftArrow");
  const nextPicture = document.getElementById("rightArrow");
  const slideCount = document.querySelectorAll(".image-box__image").length;
  const imageContainers = document.querySelectorAll(".image-box__image");
  const currentImage = document.getElementById("currentProductImage");

  /* === Private Methods === */

  /**
   * Deselects product image.
   *
   * @param {NodeListOf<Element>} images - Image containers.
   */
  function deselectProductImage(images) {
    images.forEach((image) => {
      image.classList.remove("selected");
      image.querySelector(".overlay")?.remove();
    });
  }

  /**
   * Removes listeners from image containers.
   */
  function removeImageListeners() {
    currentImageListeners.forEach(({ element, handler }) => {
      element.removeEventListener("click", handler);
    });
    currentImageListeners = [];
  }

  /**
   * Selects product image.
   *
   * @param {*} image
   */
  function selectProductImage(image) {
    deselectProductImage(imageContainers);
    image.classList.add("selected");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    image.appendChild(overlay);

    const imagePath = image
      .querySelector("source:nth-of-type(2)")
      ?.getAttribute("srcset");
    currentImage.setAttribute("src", imagePath);
  }

  /* === Event Handlers === */
  const handlePreviousPicture = (e) => {
    e.preventDefault();
    EventBus.publish("previousPicture", currentIndex - 1);
  };
  const handleNextPicture = (e) => {
    e.preventDefault();
    EventBus.publish("nextPicture", currentIndex + 1);
  };

  /* === Event Listeners === */
  previousPicture.addEventListener("click", (e) => {
    handlePreviousPicture(e);
  });

  nextPicture.addEventListener("click", (e) => {
    handleNextPicture(e);
  });
  return {
    /**
     * Getter
     *
     * @returns {NodeList} - A collection of elements representing product image containers.
     */
    getImageContainers() {
      return imageContainers;
    },

    /**
     * Deselects image.
     *
     * @param {NodeListOf<Element>} - Image containers
     */
    deselectImage(images) {
      deselectProductImage(images);
    },

    /**
     * Selects product image on click.
     */
    handleProductImage() {
      removeImageListeners();
      if (window.matchMedia("(min-width: 720.5px)").matches) {
        currentImageListeners = Array.from(imageContainers).map(
          (imageContainer) => {
            const handler = () => selectProductImage(imageContainer);
            imageContainer.addEventListener("click", handler);
            return { element: imageContainer, handler };
          }
        );
        selectProductImage(imageContainers[0]);
        MobileMenu.getMobileMenu().open ? MobileMenu.closeMobileMenu() : null;
      }
    },

    /**
     * Navigates to the specified slide in the product gallery.
     *
     * @param {number} index - The target slide index to navigate to.
     */
    goToSlide(index) {
      if (index < 0) {
        index = slideCount - 1;
      } else if (index >= slideCount) {
        index = 0;
      }
      currentIndex = index;
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    },
  };
};
