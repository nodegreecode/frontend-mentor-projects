/**
 * Lightbox Module
 *
 * @param {Object} EventBus - Event bus for publishing/subscribing to events.
 * @returns {Object} - Methods for controlling the lightbox functionality.
 */
export const Lightbox = (EventBus) => {
  let index = 0;
  /*  === DOM Elements === */
  const lightboxTrigger = document.getElementById("lightboxTrigger");
  const lightboxContainer = document.getElementById("lightboxModal");
  const lightboxContainerCloseButton = document.getElementById(
    "lightboxCloseButton"
  );
  const lightboxImageContainers = document.querySelectorAll(
    ".lightbox__thumbnail"
  );
  //const lightboxImages = document.querySelectorAll(
  //".lightbox__thumbnail-image"
  //);
  const lightboxCurrentImage = document.getElementById("lighboxCurrentImage");
  const lightboxPreviousPicture = document.getElementById("lightboxPrevious");
  const lightboxNextPicture = document.getElementById("ligthboxNext");

  const lightboxImageSrcArr = Array.from(lightboxImageContainers).map(
    (imageContainer) => imageContainer.firstElementChild.getAttribute("src")
  );

  /* === Private Methods === */
  /**
   * Retrieves the original image source by removing the "-thumbnail" suffix from the provided URL.
   *
   * @param {string} src - The image URL containing the "-thumbnail" suffix.
   * @returns {string} - The original image URL without the thumbnail suffix.
   */
  function getOriginalPicture(src) {
    const regex = /-thumbnail/g;
    const originalSrc = src.replace(regex, "");
    return originalSrc;
  }

  /**
   * Deselect product image.
   *
   * @param {NodeListOf<Element>} imageContainers - Image containers
   */
  function deselectProductImage(imageContainers) {
    imageContainers.forEach((image) => {
      image.classList.remove("selected");
      image.querySelector(".overlay")?.remove();
    });
  }

  /**
   *
   * @param {Element} img - Image container
   */
  function selectImage(img) {
    deselectProductImage(lightboxImageContainers);
    img.classList.add("selected");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    img.appendChild(overlay);

    const thumbnailSrc = img.firstElementChild.getAttribute("src");
    lightboxCurrentImage.setAttribute("src", getOriginalPicture(thumbnailSrc));
  }

  /* === Event Handlers === */
  const handleOpenLightbox = () => EventBus.publish("openLightBox");

  const handleCloseLightbox = () => EventBus.publish("closeLightBox");

  const handleSelectPreviousProductImage = () =>
    EventBus.publish("selectLightboxPreviousProductImage");

  const handleSelectNextProductImage = () =>
    EventBus.publish("selectLightboxNextProductImage", lightboxImageSrcArr);

  /* === Event Listeners === */
  lightboxTrigger.addEventListener("click", handleOpenLightbox);

  lightboxContainerCloseButton.addEventListener("click", handleCloseLightbox);

  lightboxPreviousPicture.addEventListener(
    "click",
    handleSelectPreviousProductImage
  );

  lightboxNextPicture.addEventListener("click", () => {
    handleSelectNextProductImage(lightboxImageSrcArr);
  });

  return {
    /**
     * Selects product image.
     */
    selectProductImage() {
      lightboxImageContainers.forEach((imgContainer) => {
        const handler = () => selectImage(imgContainer);
        imgContainer.addEventListener("click", handler);
      });
    },

    /**
     * Opens the lightbox
     */
    openLightBox() {
      if (!lightboxContainer.open) {
        lightboxContainer.showModal();
      }
    },

    /**
     * Closes the lightbox
     */
    closeLightBox() {
      if (lightboxContainer.open) {
        lightboxContainer.close();
      }
    },

    /**
     * Selects previous product image.
     */
    selectPreviousProductImage() {
      const lightboxImageSrcArr = Array.from(lightboxImageContainers).map(
        (imageContainer) => imageContainer.firstElementChild.getAttribute("src")
      );
      if (index > 0) {
        index--;
      } else {
        index = lightboxImageSrcArr.length - 1;
      }
      let currentImageSrc = lightboxImageSrcArr[index];
      const originalSrc = getOriginalPicture(currentImageSrc);
      lightboxCurrentImage.setAttribute("src", originalSrc);
      selectImage(lightboxImageContainers[index]);
    },

    /**
     * Select next product image.
     */
    selectNextProductImage(imageSrcArr) {
      if (index < imageSrcArr.length - 1) {
        index++;
      } else {
        index = 0;
      }
      let currentImageSrc = imageSrcArr[index];
      const originalSrc = getOriginalPicture(currentImageSrc);
      lightboxCurrentImage.setAttribute("src", originalSrc);
      selectImage(lightboxImageContainers[index]);
    },
  };
};
