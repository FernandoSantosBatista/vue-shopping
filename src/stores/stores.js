import { defineStore } from "pinia";
import axios from "axios";

export const useShopStore = defineStore({
  id: "shop",
  state: () => ({
    products: [],
    productsInBag: [],
  }),
  getters: {},
  actions: {
    getData() {
      axios.get(`/products`).then((response) => {
        this.products = response.data;
      });
    },
    addToBag(product) {
      this.productsInBag.push(product);
      localStorage.setItem("productsInBag", JSON.stringify(this.productsInBag));
    },
    removeFromBag(productId) {
      var updatedBag = this.productsInBag.filter(
        (item) => productId != item.id
      );
      this.productsInBag = updatedBag;
      localStorage.setItem("productsInBag", JSON.stringify(this.productsInBag));
    },
    load (products) {
      this.productsInBag = products;
    },

    loadBag() {
      if (localStorage.getItem("productsInBag")) {
        this.load(JSON.parse(localStorage.getItem("productsInBag")));
      }
    },
  },
});
