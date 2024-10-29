<template>
  <div class="container">
    <div>Vui lòng nhập 2 số:</div>
    <form>
      <input type="number" v-model="num1" placeholder="Nhập số thứ nhất" />
      <br />
      <input type="number" v-model="num2" placeholder="Nhập số thứ hai" />
      <br />
      <button type="submit">Ok</button>
    </form>
    <p>
      Tổng là: {{ sum }}, Hiệu là: {{ difference }}, Tích là: {{ product }},
      Thương là: {{ quotient }}
    </p>
  </div>
</template>
    
<script setup>
import { ref, watch } from 'vue'

const num1 = ref(0)
const num2 = ref(0)
const sum = ref(0)
const difference = ref(0)
const product = ref(0)
const quotient = ref(0)

watch([num1, num2], ([newnum1, newnum2]) => {
  sum.value = newnum1 + newnum2
  difference.value = newnum1 - newnum2
  product.value = newnum1 * newnum2
  quotient.value =
    newnum2 !== 0 ? (newnum1 / newnum2).toFixed(2) : 'Không xác định'
})

const handleSubmit = () => {}
</script>
    
    <style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid rgb(185, 185, 185);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: rgb(253, 150, 167);
  font-size: 25px;
}

input {
  height: 30px;
  border-radius: 5px;
  border: 1px solid black;
}

button {
  height: 25px;
  border-radius: 3px;
  border: 1px solid black;
  background-color: rgb(183, 221, 255);
}
p {
  font-size: 18px;
}
</style>
    