<template>
  <div class="container">
    <div>Vui lòng nhập chiều dài cạnh hình vuông:</div>
    <form @submit.prevent="calculateArea">
      <input
        type="number"
        v-model="squarelength"
        placeholder="Chiều dài cạnh"
      />
      <br />
      <button type="submit">Tính diện tích</button>
    </form>
    <div>
      Diện tích của hình vuông là:
      {{ squareArea }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const squarelength = ref(0)
const squareArea = ref(null)

const calculateArea = () => {
  squareArea.value = squarelength.value * squarelength.value
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
