<template>
  <nav class="navbar navbar-expand justify-content-center">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/"> Home </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/add"
          ><i class="bi cart5 bi-cart4"> </i>({{ this.productsInBag.length }})</router-link
        >
      </li>
    </ul>
  </nav>
  <router-view> </router-view>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useShopStore } from "./stores/stores";
export default {
  name: "App",

  computed: {
    ...mapState(useShopStore, ["productsInBag"]),
  },
  methods: {
    ...mapActions(useShopStore, [ "loadBag"]),
  },
  mounted() {
    this.loadBag();
  },
};
</script>

<style>
.navbar {
  background-color: #fff;
  font-size: 22px;
  font-weight: bold;
}
.cart5 {

font-size: 22px;
}
nav a {
  text-decoration: none;
  color: #ff8800;
  padding: 10px;
  display: inline-block;
}
a {
  text-decoration: none;
  color: #ff8800;
}
nav a:hover {
  text-decoration: none;
  color: #f84904;
}
</style>
