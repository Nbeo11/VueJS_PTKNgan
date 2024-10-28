<template>
  <div class="container">
    <h2>Tiệm bánh</h2>
    <div class="products">
      <div v-for="(item, index) in products" :key="index" class="product">
        <img :src="`${item.img}`" alt="Ảnh" class="product-image" />
        <div class="info">
          <div>Tên bánh: {{ item.name }}</div>
          <div>
            Số bánh còn lại:
            <input type="number" v-model.number="item.quantity" min="0" />
          </div>
          <div>Giá bánh: {{ item.price }} $</div>
          <div>Tổng giá: {{ item.price * item.quantity }} $</div>
        </div>
      </div>
    </div>
    <div class="total">
      Tổng giá trị của tất cả sản phẩm trong giỏ hàng là: {{ sumPrice }} $
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import cake1 from './images/cake1.jpg'
import cake2 from './images/cake2.jpg'
import cake3 from './images/cake3.jpg'
import cake4 from './images/cake4.jpg'
import cake5 from './images/cake5.jpg'
import cake6 from './images/cake6.jpg'

const products = ref([
  {
    name: 'bánh 1',
    price: 2,
    quantity: 3,
    img: cake1,
  },
  {
    name: 'bánh 2',
    price: 3,
    quantity: 5,
    img: cake2,
  },
  {
    name: 'bánh 3',
    price: 3,
    quantity: 2,
    img: cake3,
  },
  {
    name: 'bánh 4',
    price: 5,
    quantity: 3,
    img: cake4,
  },
  {
    name: 'bánh 5',
    price: 2,
    quantity: 6,
    img: cake5,
  },
  {
    name: 'bánh 6',
    price: 2,
    quantity: 2,
    img: cake6,
  },
])

const sumPrice = computed(() => {
  let sum = 0
  products.value.forEach(product => {
    sum += product.price * product.quantity
  })
  return sum
})
</script>

<style scoped>
.container {
  max-width: 1024px;
  margin: 0 auto;
}
h2 {
  font-size: 35px;
  text-align: center;
  margin-bottom: 20px;
}
.products {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.product {
  padding: 16px;
  display: flex;
  gap: 10px;
  justify-content: center;
  max-width: 300px;
  margin: 0 auto;
  border: 3px solid rgb(210, 210, 210);
  border-radius: 5px;
}

.product-image {
  max-width: 100px;
  height: auto;
  border: 1px solid grey;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.total {
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
}
div > input {
  width: 50px;
}
</style>
