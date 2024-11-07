<template>
    <div class="date-field">
        <label class="text-xl mb-2">{{ label }}</label>
        <input class="h-7 rounded-md mb-4 px-2" type="date" v-model="dateValue" :min="currentDate" />
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
    modelValue: String,
    label: String,
});

const currentDate = new Date().toISOString().split('T')[0];

const emit = defineEmits(['update:modelValue']);

const dateValue = ref(props.modelValue);

watch(dateValue, (newValue) => {
    emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newVal) => {
    dateValue.value = newVal;
});
</script>

<style scoped>
.date-field {
    display: flex;
    flex-direction: column;
}
</style>