<template>
  <div class="container-fluid">
    <div class="container d-flex justify-content-center flex-column">
      <div class="row row-cols-1 row-cols-md-3 g-3">
        <div v-for="(product, index) in this.products" :key="index">
          <div class="card">
            <img :src="product.image" class="" />
            <div class="card-body">
              <h4 class="text-center">{{ product.title }}</h4>
              <strong
                ><p class="text-center">
                  R$ {{ product.price.toFixed(2) }}
                </p></strong
              >
              <div class="d-flex justify-content-center">
                <i
                  class="bi cart4 bi-cart4"
                  v-if="!isInBag(product)"
                  @click="addbag(product)"
                >
                </i>
                <i
                  v-else
                  class="bi bi-cart-x-fill"
                  @click="removeBag(product.id)"
                >
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useShopStore } from "../stores/stores";
export default {
  name: "HomeView",
  computed: {
    ...mapState(useShopStore, ["products", "productsInBag"]),
  },
  methods: {
    ...mapActions(useShopStore, ["getData", "addToBag", "removeFromBag"]),
    addbag(product) {
      product.quantity = 1;
      this.addToBag(product);
      console.log(product);
    },
    isInBag(product) {
      return this.productsInBag.find((item) => item.id == product.id);
    },
    removeBag(product) {
      if (confirm("Tem certeza que deseja excluir ?"))
        this.removeFromBag(product);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
.card {
  flex: 0 0 30%;
  box-sizing: border-box;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  margin: 8px;
  height: 360px;
}

img {
  margin: 20px auto;
  width: 120px;
  height: 120px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.cart4 {
  color: #007bff;

  border-radius: 100px;
  font-weight: 400;
  text-align: center;

  cursor: pointer;
  font-size: 40px;
}
.bi-cart-x-fill {
  color: #f30909;

  border-radius: 100px;
  font-weight: 400;
  text-align: center;

  cursor: pointer;
  font-size: 40px;
}
h4 {
  font-size: 12px;
  font-weight: normal;

  font-weight: normal;
}

.container-fluid {
  padding-right: unset;
  padding-left: unset;
}
.container,
.container-lg,
.container-md,
.container-sm {
  max-width: 960px;
  margin-top: 90px;
}
</style>
