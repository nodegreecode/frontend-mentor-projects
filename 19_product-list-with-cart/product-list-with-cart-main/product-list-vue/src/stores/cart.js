/**
 * Performs actions on cart items
 * Changes cart state
 *
 * empty
 * items
 * productCount = products.length()
 * orderTotal
 *
 * actions
 * addToCart
 * removeFromCart
 *
 * getters
 *
 * totalItems
 *
 */

import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    isOpen: false,
  }),

  actions: {
    openDialog() {
      this.isOpen = true;
    },
    closeDialog() {
      this.isOpen = false;
    },
    addToCart(product, container) {
      const item = this.items.find((i) => i.name == product.name);
      if (item) {
        item.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1, selected: true });
        //container.classList.add("selected");
      }
    },

    removeFromCart(itemName) {
      this.items = this.items.filter((item) => item.name !== itemName);
      // remove 'selected' class from container
    },

    increaseProductQuantity(itemName) {
      const actualItem = this.items.find((i) => i.name == itemName);
      actualItem.quantity++;
    },
    decreaseProductQuantity(itemName) {
      const actualItem = this.items.find((i) => i.name == itemName);
      if (actualItem.quantity > 0 || actualItem === 0) {
        actualItem.quantity--;
        if (actualItem.quantity === 0) {
          this.removeFromCart(itemName);
        }
      }
    },
  },

  getters: {
    /*
    totalItems(state) {
      return state.items.reduce((sum, item) => sum + item.price, 0);
    },*/

    isDialogOpen(state) {
      return () => state.isOpen;
    },

    getSelectedItem(state) {
      return () => state.items.filter((item) => item.selected);
    },

    isItemInCart(state) {
      return (name) => state.items.some((item) => item.name === name);
    },
    getAllItemsInCart(state) {
      return () => state.items;
    },
  },
});
