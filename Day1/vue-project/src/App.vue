<script setup>
import { ref } from 'vue'
import Exercise1 from './views/Exercise1.vue'
import Exercise2 from './views/Exercise2.vue'
import Exercise3 from './views/Exercise3.vue'
import Exercise4 from './views/Exercise4.vue'
import Exercise5 from './views/Exercise5.vue'
import Exercise6 from './views/Exercise6.vue'
import Exercise7 from './views/Exercise7.vue'

const currentExercise = ref(null)

const showExercise = exercise => {
  currentExercise.value = exercise
}

const isActive = exercise => {
  return currentExercise.value === exercise
}
</script>

<template>
  <div id="app">
    <h3>Vui lòng chọn vào các nút dưới đây để xem nội dung bài làm:</h3>
    <nav>
      <button @click="showExercise(1)" :class="{ active: isActive(1) }">
        Bài 1
      </button>
      <button @click="showExercise(2)" :class="{ active: isActive(2) }">
        Bài 2
      </button>
      <button @click="showExercise(3)" :class="{ active: isActive(3) }">
        Bài 3
      </button>
      <button @click="showExercise(4)" :class="{ active: isActive(4) }">
        Bài 4
      </button>
      <button @click="showExercise(5)" :class="{ active: isActive(5) }">
        Bài 5
      </button>
      <button @click="showExercise(6)" :class="{ active: isActive(6) }">
        Bài 6
      </button>
      <button @click="showExercise(7)" :class="{ active: isActive(7) }">
        Bài 7
      </button>
    </nav>
    <div>
      <Exercise1 v-if="currentExercise === 1" />
      <Exercise2 v-if="currentExercise === 2" />
      <Exercise3 v-if="currentExercise === 3" />
      <Exercise4 v-if="currentExercise === 4" />
      <Exercise5 v-if="currentExercise === 5" />
      <Exercise6 v-if="currentExercise === 6" />
      <Exercise7 v-if="currentExercise === 7" />
    </div>
  </div>
</template>

<style scoped>
h3 {
  font-size: 25px;
  margin-bottom: 20px;
}

nav {
  margin-bottom: 40px;
  display: flex;
  justify-content: space-evenly;
}

nav button {
  margin-right: 15px;
}

button {
  font-size: 17px;
  background-color: rgb(185, 230, 174);
  padding: 5px;
  border-radius: 5px;
  border: 1px solid grey;
  transition: background-color 0.3s, font-weight 0.3s;
}

button.active {
  background-color: rgb(91, 134, 91);
  color: white;
}
</style>
