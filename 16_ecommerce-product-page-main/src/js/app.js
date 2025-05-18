const mobileMenOpenButton = document.getElementById("mobileMenuOpenBtn");
const mobileMenCloseButton = document.getElementById("mobileMenuCloseBtn");

const menuIcon = document.getElementById("menuIcon");
const closeIcon = document.getElementById("closeIcon");
const mobileMenu = document.getElementById("mobileMenu");

const slides = document.getElementById("slides");
const previousPicture = document.getElementById("leftArrow");
const nextPicture = document.getElementById("rightArrow");
const slideCount = document.querySelectorAll(".image-box__image").length;
let currentIndex = 0;

const imageContainers = document.querySelectorAll(".image-box__image");
const currentImage = document.getElementById("currentProductImage");

/* Product Quantity */
const increaseButtont = document.getElementById("increaseQuantity");
const decreaseButton = document.getElementById("decreaseQuantity");
const productQuantityWrapper = document.getElementById(
  "productQuantityWrapper"
);
const productQuantityInput = document.getElementById("productQuanity");

/* Shopping Cart */
const shoppingCartButton = document.getElementById("shoppingCartButton");
const shoppingCart = document.getElementById("shoppingCart");

/* Lightbox */
const lightboxTrigger = document.getElementById("lightboxTrigger");
const lightboxContainer = document.getElementById("lightboxModal");
const lightboxContainerCloseButton = document.getElementById(
  "lightboxCloseButton"
);

/* Lightbox Logic */

function handleLightBoxOpen() {
  if (!lightboxContainer.open) {
    lightboxContainer.showModal();
  }
}

function handleLightBoxClose() {
  if (lightboxContainer.open) {
    lightboxContainer.close();
  }
}

/* Shopping Cart Logic */
function toggleShoppingCart() {
  console.log(shoppingCart);
  shoppingCart.hidden = !shoppingCart.hidden;
}

/* Product Quantity Logic */
function updateButtons() {
  decreaseButton.disabled =
    parseInt(productQuantityInput.value) <= productQuantityInput.min;
  increaseButtont.disabled =
    parseInt(productQuantityInput.value) >= productQuantityInput.max;
}

function handleProductQuantity() {
  decreaseButton.addEventListener("click", () => {
    const newValue = parseInt(productQuantityInput.value) - 1;
    if (newValue >= productQuantityInput.min) {
      productQuantityInput.value = newValue;
      updateButtons();
    }
  });
  increaseButtont.addEventListener("click", () => {
    const newValue = parseInt(productQuantityInput.value || 0) + 1;
    if (newValue <= productQuantityInput.max) {
      productQuantityInput.value = newValue;
      updateButtons();
    }
  });
}

/* Selecting Product Images Logic */
function deselectProductImage(images) {
  images.forEach((image) => {
    image.classList.remove("selected");
    image.querySelector(".overlay")?.remove();
  });
}

function handleMobileView(images, i) {
  if (window.innerWidth === 720 || window.innerWidth < 720) {
    deselectProductImage(images);
  } else if (window.innerWidth === 721 || window.innerWidth > 721) {
    goToSlide(i);
  }
}

function selectProductImage(image) {
  deselectProductImage(imageContainers);
  image.classList.add("selected");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  image.appendChild(overlay);

  const imagePath = image
    .querySelector("source:nth-of-type(2)")
    ?.getAttribute("srcset");
  console.log(imagePath);
  currentImage.setAttribute("src", imagePath);
}

/*function handleProductImage() {
  imageContainers.forEach((imageContainer) =>
    imageContainer.addEventListener("click", () => {
      selectProductImage(imageContainer);
    })
  );
}*/

let currentImageListeners = [];

function removeImageListeners() {
  currentImageListeners.forEach(({ element, handler }) => {
    element.removeEventListener("click", handler);
  });
  currentImageListeners = [];
}

function handleProductImageNew() {
  removeImageListeners();

  if (window.matchMedia("(min-width: 720px)").matches) {
    currentImageListeners = Array.from(imageContainers).map(
      (imageContainer) => {
        const handler = () => selectProductImage(imageContainer);
        imageContainer.addEventListener("click", handler);
        return { element: imageContainer, handler };
      }
    );
  }
}

function goToSlide(index) {
  if (index < 0) {
    index = slideCount - 1;
  } else if (index >= slideCount) {
    index = 0;
  }

  currentIndex = index;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

/* Mobile Menu Logic */
function handleOpenMobileMenu() {
  mobileMenu.showModal();
}

function handleCloseMobileMenu() {
  mobileMenu.close();
}

/* Init Function */
function init() {
  shoppingCartButton.addEventListener("click", toggleShoppingCart);

  handleProductQuantity();

  lightboxTrigger.addEventListener("click", handleLightBoxOpen);
  lightboxContainerCloseButton.addEventListener("click", handleLightBoxClose);

  //handleProductImage();
  //window.addEventListener("resize", () => handleMobileView(imageContainers, 0));
  const resizeObserver = new ResizeObserver(() => {
    handleProductImageNew();
    handleMobileView(imageContainers, 0);
  });
  resizeObserver.observe(document.body);

  mobileMenOpenButton.addEventListener("click", handleOpenMobileMenu);
  mobileMenCloseButton.addEventListener("click", handleCloseMobileMenu);

  previousPicture.addEventListener("click", function (e) {
    e.preventDefault();
    goToSlide(currentIndex - 1);
  });

  nextPicture.addEventListener("click", function (e) {
    e.preventDefault();
    goToSlide(currentIndex + 1);
  });
}

/* App Initialization */
init();
