/**
 * Loads products data from data.json
 *
 * Performs access to products details
 */
import { defineStore } from "pinia";
//import productsData from "@/data/data.json";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
  }),

  actions: {
    async loadData() {
      try {
        const response = await fetch("/data/data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const productsData = await response.json();
        this.products = productsData;
      } catch (error) {
        console.log("Failed to load products:", error);
      }
    },
  },

  getters: {
    allProducts(state) {
      return state.products;
    },
  },
});
