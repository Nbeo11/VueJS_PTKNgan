<template>
    <div class="flex items-center justify-center h-screen">
        <div class="text-center">
            <h3 class="text-3xl mb-4">Số lần nhấp chuột: {{ count }}</h3>
            <button @click="increaseCount" class="bg-green-300 text-black px-4 py-2 rounded hover:bg-green-800 hover:text-white hover:scale-105 transition-all">
                Click
            </button>
        </div>
    </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
const count = ref(0)
const increaseCount = () => {
    count.value++;
}
onMounted
</script>

<style scoped></style>