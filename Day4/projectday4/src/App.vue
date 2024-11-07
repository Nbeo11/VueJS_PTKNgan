<template>
  <div>
    <button class="p-2 bg-red-200 text-black rounded-md hover:scale-105 hover:bg-red-400 transition" @click="goHome">
      Trở về trang chính
    </button>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<style scoped></style>
