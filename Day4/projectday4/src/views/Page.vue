<template>
    <div class="page-container">
        <h1>Chọn Bài Tập</h1>
        <ul class="exercise-list">
            <li v-for="exercise in exercises" :key="exercise.name">
                <router-link :to="exercise.path">{{ exercise.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const exercises = ref([
    { name: 'Bài Tập 1', path: '/exercise1' },
    { name: 'Bài Tập 2', path: '/exercise2' },
    { name: 'Bài Tập 3', path: '/exercise3' },
    { name: 'Bài Tập 4', path: '/exercise4' },
    { name: 'Bài Tập 5', path: '/exercise5' },
    { name: 'Bài Tập 6', path: '/exercise6' },
    { name: 'Bài Tập 7', path: '/exercise7' },
    { name: 'Bài Tập 8', path: '/exercise8' },
    { name: 'Bài Tập 9', path: '/exercise9' },
    { name: 'Bài Tập 10', path: '/exercise10' },
]);
</script>

<style scoped>
.page-container {
    padding: 20px;
}

.exercise-list {
    list-style-type: none;
    padding: 0;
}

.exercise-list li {
    margin: 10px 0;
}
</style>
