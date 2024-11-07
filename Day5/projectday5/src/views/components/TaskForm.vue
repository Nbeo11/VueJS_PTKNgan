<template>
  <div>
    <Input v-model="task" label="Task" placeholder="Enter task" class="flex flex-col" />
    <Date v-model="date" label="Date" />
    <Status v-model="status" label="Status" />
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import Input from './InputText.vue';
import Date from './Date.vue';
import Status from './Status.vue';

const props = defineProps({
  taskModel: {
    type: String,
    required: true,
  },
  dateModel: {
    type: String,
    required: true,
  },
  statusModel: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:taskModel', 'update:dateModel', 'update:statusModel']);

const task = ref(props.taskModel);
const date = ref(props.dateModel);
const status = ref(props.statusModel);

watch(task, (newTask) => {
  emit('update:taskModel', newTask);
});

watch(date, (newDate) => {
  emit('update:dateModel', newDate);
});

watch(status, (newStatus) => {
  emit('update:statusModel', newStatus);
});

watch(() => props.taskModel, (newTask) => {
  task.value = newTask;
});

watch(() => props.dateModel, (newDate) => {
  date.value = newDate;
});

watch(() => props.statusModel, (newStatus) => {
  status.value = newStatus;
});
</script>

<style scoped></style>
