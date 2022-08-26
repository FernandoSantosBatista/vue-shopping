<template>
  <div class="container-fluid">
    <div class="container">
      <template v-if="productsInBag.length">
        <strong>
          <h3 class="text-center">
            Total do pedido: R$ {{ orderTotal() }}
          </h3></strong
        >
        <div class="py-3">
          <hr />
        </div>
        <div v-for="(product, index) in productsInBag" :key="index">
          <div class="row">
            <div class="col">
              <img :src="product.image" class="img-fluid" />
            </div>
            <div class="col-5 py-4">
              {{ product.title }}
            </div>

            <div class="col col-1 py-4">
              <button
                class="btn btn-secondary"
                :disabled="product.quantity <= 1"
                @click="product.quantity--"
              >
                -
              </button>
            </div>
            <div class="col p-3 py-4" style="font-size: 16px">
              R$ {{ (product.price * product.quantity).toFixed(2) }}
            </div>
            <div class="col col py-4">
              <button class="btn btn-secondary" @click="product.quantity++">
                +
              </button>
            </div>
            <div class="col py-2">
              <i
                type="button"
                @click="removeBag(product.id)"
                class="bi bi-cart-x-fill"
                style="color: brown"
              >
              </i>
            </div>
            <hr />
          </div>
        </div>
      </template>
      <template v-else>
        <h3 class="text-center">Não há items no carrinho ainda</h3>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useShopStore } from "../stores/stores";
export default {
  name: "BasketView",
  computed: {
    ...mapState(useShopStore, ["productsInBag"]),
  },

  methods: {
    ...mapActions(useShopStore, ["getData", "removeFromBag"]),

    removeBag(product) {
      if (confirm("Tem certeza que deseja excluir ?"))
        this.removeFromBag(product);
    },
    orderTotal() {
      var total = 0;
      this.productsInBag.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toFixed(2);
    },
  },

  mounted() {
    this.getData();
  },
};
</script>
<style>

</style>
