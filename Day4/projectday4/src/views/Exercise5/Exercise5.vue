<template>
    <div class="container">
        <h1 class="title">Đồng Hồ Đếm Ngược</h1>
        <div class="timer">
            <h2>{{ formattedTime }}</h2>
        </div>
        <input type="number" v-model="minutes" min="0" max="59" placeholder="Nhập số phút" class="input border-2 mr-3" />
        <input type="number" v-model="seconds" placeholder="Nhập số giây" class="input border-2" />
        <button @click="startTimer" class="button bg-green-900 text-xs w-16 h-16 p-0 text-white rounded-full mx-4">Start</button>
        <button @click="resetTimer" class="button bg-green-900 text-xs w-16 h-16 p-0 text-white rounded-full">Reset</button>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const minutes = ref(0);
const seconds = ref(0);
const remainingTime = ref(0);
const interval = ref(null);

const formattedTime = computed(() => {
    const minutesValue = Math.floor(remainingTime.value / 60);
    const secondsValue = remainingTime.value % 60;
    return `${String(minutesValue).padStart(2, '0')}:${String(secondsValue).padStart(2, '0')}`;
});

const startTimer = () => {
    remainingTime.value = minutes.value * 60 + seconds.value; 
    clearInterval(interval.value);
    interval.value = setInterval(() => {
        if (remainingTime.value > 0) {
            remainingTime.value--;
        } else {
            clearInterval(interval.value);
        }
    }, 1000);
};



const resetTimer = () => {
    clearInterval(interval.value);
    remainingTime.value = 0;
    minutes.value = 0;
    seconds.value = 0;
};
</script>

<style>
.container {
    text-align: center;
    margin-top: 50px;
}

.title {
    font-size: 24px;
    margin-bottom: 20px;
}

.timer {
    font-size: 48px;
    margin: 20px 0;
}

.input {
    padding: 10px;
    font-size: 16px;
    width: 100px; 
}


</style>
