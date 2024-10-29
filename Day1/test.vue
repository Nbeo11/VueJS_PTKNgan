<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'

const msg = ref("Hellp bro vip")

const obj = reactive({
  name: 'Minh',
  age: 18,
})

onMounted(() => {
  setTimeout(() => {
    msg.value = 'Hello Ngan'
  }, 5000);
})

function changeObj() {
  obj.name = "Pham Minh"
  obj.age = 17
}

const yearOld = computed(()=> {
  return obj.age + ' year old';
})

watch(
  () => obj.age,
  (newVal, oldValue) => {
    msg.value = "watch success old value: " + oldValue;
  }
);
</script>

<template>
  <div>
    {{ msg }}
  </div>

  <div>
    Object: {{ obj.name }} - {{ obj.age }}
  </div>
  <div>{{ yearOld }}</div>
  <button @click="changeObj">Change Obj</button>
</template>

<style scoped>

</style>
<style lang="scss">

</style>