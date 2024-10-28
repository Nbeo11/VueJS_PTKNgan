<template>
  <div class="container">
    <div>Vui lòng nhập kích thước chữ (px):</div>
    <form @submit.prevent="updateFontSize">
      <input
        type="number"
        v-model="inputFontSize"
        placeholder="Nhập kích thước"
      />
      <br />
      <button type="submit">Ok</button>
    </form>
    <div :style="{ fontSize: fontSize + 'px' }">
      Đây là văn bản có kích thước chữ cập nhật theo input của người dùng
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from 'vue'

const fontSize = ref(16)
const inputFontSize = ref(16)

const updateFontSize = () => {
  fontSize.value = inputFontSize.value
}
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
</style>
  