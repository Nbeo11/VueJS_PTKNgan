<template>
  <div class="container">
    <div class="content">
      <h2 :class="{ 'text-green': inStock, 'text-red': !inStock }">
        {{ product }}
      </h2>
      <a :href="productLink"> {{ productLink }}</a>
      <img :class="['images']" :src="image" :alt="imageAlt" />
      <div>
        Giá gốc của sản phẩm là:
        {{ formatPrice(price) }} VNĐ
      </div>
      <div>
        Giá sau khi giảm là:
        {{ formatPrice(productDiscountedPrice(price, discount)) }}
        VNĐ
      </div>
      <div>
        Số lượng hàng còn lại:
        {{ quantity }}
      </div>
      <div>{{ productDescription }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
const image = ref(
  'https://cdn.vjshop.vn/hightech/may-choi-game/ps5/sony-ps-5-1.jpg'
)
const imageAlt = ref('ps5 alt')
const product = ref('ps5')
const productLink = ref(
  'https://bachtungps.com.vn/may-sony-playstation-5-ps5-1'
)
const quantity = ref(10)
const price = ref(10000)
const discount = ref(0.2)
const inStock = ref(true)
const classObject = ref({
  'bg-green': true,
  'bg-blue': false,
})

function productDiscountedPrice(price, discount) {
  return price * (1 - discount)
}

const productDescription = computed(() => {
  return inStock.value ? 'Sản phẩm đang có sẵn' : 'Sản phẩm không có sẵn'
})

function formatPrice(value) {
  return value.toLocaleString()
}
</script>

<style scoped>
.container {
  max-width: 1024px;
  margin: 0 auto;
  text-align: center;
}
.content {
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid grey;
  border-radius: 20px;
  padding: 20px;
}
.text-red {
  color: red;
}
.text-green {
  color: green;
}
.bg-green {
  background-color: green;
}
.bg-blue {
  background-color: blue;
}

.images {
  width: 300px;
}
</style>