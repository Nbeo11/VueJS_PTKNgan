<template>
  <div class="container">
    <input type="checkbox" v-model="isChoose" />
    <label for=""> Chọn vào checkbox để thay đổi màu chữ độ đậm</label>
    <div :class="{ 'text-green': isChoose, 'text-red': !isChoose }">
      The best part about the colour blue that I feel is safety and protection.
      I have always seen my mother in blue sarees, it is her favourite colour as
      well. And even when I step out I feel my mother is with me protecting at
      every step.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isChoose = ref(false)
</script>

<style scoped>
.container {
  max-width: 1024px;
  margin: 0 auto;
  text-align: justify;
  font-size: 25px;
}

.text-green {
  color: green;
  font-weight: bold;
}
.text-red {
  color: red;
  font-weight: normal;
}
</style>