import { defineStore } from "pinia";
import { formatter } from "../utils/currency-formatter";

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
    addToCart(product) {
      const item = this.items.find((i) => i.name == product.name);
      if (item) {
        item.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1, selected: true });
      }
    },

    removeFromCart(itemName) {
      this.items = this.items.filter((item) => item.name !== itemName);
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
    isDialogOpen(state) {
      return () => state.isOpen;
    },

    getSelectedItem(state) {
      return () => state.items.filter((item) => item.selected);
    },

    isItemInCart(state) {
      return (name) => state.items.some((item) => item.name === name);
    },
    getAllItemsUpdated(state) {
      return () =>
        state.items.map((item) => ({
          ...item,
          total: formatter.format(item.price * item.quantity),
        }));
    },
    orderTotal(state) {
      return () => state.items.reduce((totalSum, item) => totalSum + item.price * item.quantity, 0);
    },

    formattedOrderTotal(state) {
      return () => formatter.format(this.orderTotal(state));
    },
    totalItemsQuantity(state) {
      return () =>
        state.items.reduce((totalItemsQuantity, item) => (totalItemsQuantity += item.quantity), 0);
    },
  },
});
