<template>
  <div>
    <label class="text-xl mb-2">{{ label }}</label>
    <input class="h-7 rounded-md w-56 mb-4 px-2" :type="type" :name="name" :id="id" v-model="inputValue"
      :placeholder="placeholder" :class="inputClass" />
  </div>
</template>

<script setup>
import { defineProps, ref, watch, defineEmits } from 'vue';

const props = defineProps({
  modelValue: String,
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Vui lòng nhập...",
  },
  inputClass: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "Label"
  }
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);

watch(inputValue, (newVal) => {
  emit("update:modelValue", newVal);
});

watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal;
});
</script>

<style scoped></style>
