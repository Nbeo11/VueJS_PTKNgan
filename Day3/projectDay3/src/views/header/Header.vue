<template>
  <div class="fixed left-0 right-0 top-0 bg-[#2E756D] h-16">
    <div class="max-w-screen-xl mx-auto px-2 flex justify-between items-center h-full">
      <router-link to="/">
        <img class="h-12" src="../logo.png" alt="Logo">
      </router-link>
      <router-link to="/cart">
        <button class="relative">
        <img class="h-12 rounded-2xl bg-[#91C2BC] pr-4" src="../cart.png" alt="Giỏ hàng">
        <div class="absolute top-0 right-0 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full">{{ totalProduct }}</div>
      </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
const totalProduct = ref(0);
function calculateTotalProduct() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  cart.forEach(item => {
    total += item.colors.length; 
  });
  return total; 
}

// Hàm cập nhật tổng số sản phẩm
function updateTotal() {
  totalProduct.value = calculateTotalProduct();
}

onMounted(() => {
  totalProduct.value = calculateTotalProduct();
  window.addEventListener('cartUpdated', updateTotal);
});

onUnmounted(() => {
  window.removeEventListener('cartUpdated', updateTotal);
});
</script>

<style></style>
