/**
 * ShoppingCart - Module manages the shopping cart UI and interactions.
 *
 * @param {Object} EventBus - Event bus for publishing/subscribing to events.
 * @returns {Object} - Methods for managing the cart.
 */
export const Cart = (EventBus) => {
  const product = {
    id: 234,
    name: "Fall limited Edition Sneakers",
    newPrice: 125,
    oldPrice: 250,
    discount: 50,
  };
  let cart = [];

  /*  === DOM Elements === */
  const shoppingCartButton = document.getElementById("shoppingCartButton");
  const shoppingCart = document.getElementById("shoppingCart");
  /* Product Quantity */
  const increaseButtont = document.getElementById("increaseQuantity");
  const decreaseButton = document.getElementById("decreaseQuantity");
  const productQuantityWrapper = document.getElementById(
    "productQuantityWrapper"
  );
  const productQuantityInput = document.getElementById("productQuanity");
  const addToCartButton = document.getElementById("addToCartButton");
  const productDescription = document.querySelector(
    ".details-box__description"
  );

  /* Shopping Cart */
  const itemCount = document.getElementById("itemCount");
  const itemList = document.getElementById("item-list");
  const itemContainer = document.querySelector(
    ".shopping-cart__items-container"
  );

  /* === Private Methods === */
  function currencyFormatter(num, local = "en-US") {
    const formatter = new Intl.NumberFormat(local, {
      style: "currency",
      currency: "USD",
    });
    return formatter.format(num);
  }
  /**
   * Updates the disabled state of the increase and decrease buttons
   * based on the product quantity input value.
   */
  function updateButtons() {
    decreaseButton.disabled =
      parseInt(productQuantityInput.value) <= productQuantityInput.min;
    increaseButtont.disabled =
      parseInt(productQuantityInput.value) >= productQuantityInput.max;
  }

  /**
   * Validates the product quantity input and returns an object with the quantity.
   *
   * @returns {Object} {} - The validated quantity and product.
   */
  function validateProductQuantityInput() {
    const inputValue = parseInt(productQuantityInput.value);
    if (isNaN(inputValue)) {
      throw new TypeError("Only positive numbers are allowed");
    } else if (inputValue <= productQuantityInput.min) {
      throw new RangeError("Value must be greater then 0");
    } else if (inputValue > productQuantityInput.max) {
      throw new RangeError("Value must be less then 100");
    }
    return {
      quantity: inputValue,
      product,
    };
  }

  /**
   * Dispatches a custom 'cartUpdated' event with the provided item quantity.
   *
   * @param {number} data - The quantity of the items added
   */
  function addItem(data) {
    const customEvent = new CustomEvent("itemAdded", {
      detail: {
        quantity: data.quantity,
      },
    });

    const existingItem = cart.find((item) => item.id === data.product.id);

    if (existingItem) {
      existingItem.quantity = data.quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.newPrice,
        quantity: data.quantity,
      });
    }
    document.dispatchEvent(customEvent);
  }

  /**
   * Shows the amount of items in the cart as lable
   *
   * @param {number} dquantity - The amount of items choosen
   */
  function toggleItemCount(quantity) {
    if (quantity > 0) {
      itemCount.classList.remove("hidden");
      itemCount.textContent = quantity;
    } else {
      itemCount.classList.add("hidden");
    }
  }

  /**
   * Removes item from the cart array
   *
   * @param {number} productId - Idof the product
   */
  function removeItem(productId) {
    const customEvent = new Event("itemRemoved");
    cart = cart.filter((item) => item.id !== productId);
    document.dispatchEvent(customEvent);
  }

  /**
   * Renders cart
   */
  function renderCart() {
    itemList.innerHTML = "";
    const checkoutBtn = document.getElementById("checkout-button");
    if (checkoutBtn) {
      itemContainer.removeChild(checkoutBtn);
    }
    const li = document.createElement("li");
    if (cart.length === 0) {
      li.innerHTML = `
          <p class="shopping-cart__empty-message">
            Your cart is empty.
          </p>
        `;
      itemList.appendChild(li);
    } else {
      cart.forEach((item) => {
        const sum = item.price * item.quantity;

        li.classList.add("shopping-cart__item");
        li.innerHTML = `
        <div class="shopping-cart__image-box"><img src=".//images/image-product-1-thumbnail.jpg" alt="" /></div>
        <h3 class="shopping-cart__item-title">
        ${item.name}
        </h3>
        <p class="shopping-cart__item-price">
        ${currencyFormatter(item.price)} x ${item.quantity}
        <span class="shopping-cart__item-total-price">${currencyFormatter(
          sum
        )}</span>
        </p>
        <div class="shopping-cart__action">
        <button id="remove-button">
        <img src=".//images/icon-delete.svg" alt="" />
        </button>
        </div>`;
        itemList.appendChild(li);

        document
          .getElementById("remove-button")
          .addEventListener("click", () =>
            handleRemoveItemFromShoppingCart(item.id)
          );

        const checkoutButtonMarkup = `
        <a id="checkout-button" href="#" class="shopping-cart__checkout-button">Checkout</a>
        `;
        itemList.insertAdjacentHTML("afterend", checkoutButtonMarkup);
      });
    }
  }

  /* === Event Handlers === */
  const handleOpenShoppingCart = () => EventBus.publish("toggleShoppingCart");

  const handlechangeProductQuantity = (e) =>
    EventBus.publish("changeQuantity", e.target);

  const handleAddItemToShoppingCart = () => EventBus.publish("addToCart");

  const handleRemoveItemFromShoppingCart = (productId) => {
    EventBus.publish("removeFromCart", productId);
  };

  /* === Event Listeners === */
  shoppingCartButton.addEventListener("click", handleOpenShoppingCart);

  productQuantityWrapper.addEventListener("click", handlechangeProductQuantity);

  addToCartButton.addEventListener("click", handleAddItemToShoppingCart);

  document.addEventListener("itemAdded", (event) => {
    renderCart();
    toggleItemCount(event.detail.quantity);
  });

  document.addEventListener("toggleCart", () => {
    renderCart();
  });

  document.addEventListener("itemRemoved", () => {
    renderCart();
    toggleItemCount(0);
  });

  return {
    /**
     * Getter
     *
     * @returns {Element} - The shoppingcart button DOM element.
     */
    getShoppingCartButton() {
      return shoppingCartButton;
    },

    /**
     * Getter
     *
     * @returns {Element} - The shoppingcart button DOM element.
     */
    getCart() {
      return shoppingCart;
    },

    /**
     * Renders product details
     */
    renderProduct() {
      const formatter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      const div = document.createElement("div");
      const productMarkup = `                
        <div>
          <p class="details-box__new-price">${formatter.format(
            product.newPrice
          )}</p><span class="details-box__discount">${product.discount}%</span>
        </div>
        <p class="details-box__old-price">${formatter.format(
          product.oldPrice
        )}</p>`;
      div.classList.add(
        "details-box__price-container",
        "flex-container",
        "gap-12-deskto",
        "mb-1"
      );
      div.innerHTML = productMarkup;
      productDescription.insertAdjacentElement("afterend", div);
    },

    /**
     * Toggles the visibility of the shopping cart.
     */
    openShoppingCart() {
      const customEvent = new Event("toggleCart");
      shoppingCart.hidden = !shoppingCart.hidden;
      document.dispatchEvent(customEvent);
    },

    /**
     * Increases or decreases product quantity.
     * @param {*} target
     */
    changeProductQuantity(target) {
      if (
        target.id == "decreaseQuantity" ||
        target.classList.contains("details-box__minus-icon")
      ) {
        const newValue = parseInt(productQuantityInput.value) - 1;
        if (newValue >= productQuantityInput.min) {
          productQuantityInput.value = newValue;
          updateButtons();
        }
      }

      if (
        target.id == "increaseQuantity" ||
        target.classList.contains("details-box__plus-icon")
      ) {
        const newValue = parseInt(productQuantityInput.value || 0) + 1;
        if (newValue <= productQuantityInput.max) {
          productQuantityInput.value = newValue;
          updateButtons();
        }
      }
    },

    /**
     * Adds item to cart
     */
    addItemToCart() {
      const data = validateProductQuantityInput();
      if (data.quantity > 0) {
        addItem(data);
      } else {
        addItem(data);
      }
    },

    /**
     * Removes items from cart
     *
     * @param {number} id - Id of the product
     */
    removeItemFromCart(id) {
      removeItem(id);
    },
  };
};
