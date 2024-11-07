<template>
  <div class="status-field">
    <label class="text-xl mb-2">{{ label }}</label>
    <select class="h-7 rounded-md px-1" v-model="statusValue">
      <option value="todo">Todo</option>
      <option value="done">Done</option>
      <option value="reject">Reject</option>
    </select>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  label: String,
});

const emit = defineEmits(['update:modelValue']);

const statusValue = ref(props.modelValue);

watch(statusValue, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newVal) => {
  statusValue.value = newVal;
});
</script>

<style scoped>
.status-field {
  display: flex;
  flex-direction: column;
}
</style>
