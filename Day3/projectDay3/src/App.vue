<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import Product from './views/product/Product.vue';
import Header from './views/header/Header.vue';
import ProductDetail from './views/product/ProductDetail.vue';
</script>

<style coped>
</style>
