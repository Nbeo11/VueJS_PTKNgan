<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <label class="my-checkbox">
    <input type="checkbox" :checked="modelValue" @change="toggleCheckbox" />
    <span>
      <span class="checkmark"></span>
    </span>
  </label>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue', 'change']);


function toggleCheckbox(event) {
  emit('update:modelValue', event.target.checked);
  emit('change');
}
</script>
<style>
.my-checkbox input {
  display: none;
}

.my-checkbox input+span {
  display: flex;
  border: 2px solid rgb(83, 73, 222);
  width: 18px;
  height: 18px;
  justify-content: center;
  align-items: center;
}

.my-checkbox input+span {
  position: relative;
  cursor: pointer;
}



.my-checkbox input:checked+span .checkmark::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid rgb(111, 112, 224);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  display: none;
}

.my-checkbox input:checked+span .checkmark::after {
  display: block;
}
</style>
