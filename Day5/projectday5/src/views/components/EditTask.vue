<template>
  <div>
    <form @submit.prevent
      class="absolute top-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-3xl bg-blue-300 p-4 flex flex-col gap-3">
      <h2 class="text-lg font-bold">Edit Task</h2>
      <TaskForm :taskModel="task" :dateModel="date" :statusModel="status" @update:taskModel="task = $event"
        @update:dateModel="date = $event" @update:statusModel="status = $event" />
      <div class="flex gap-2 mt-4">
        <Button :title="'Save'" :classButton="'text-xs p-1 rounded-md'" @click="saveTask" />
        <Button :title="'Cancel'" :classButton="'text-xs p-1 rounded-md'" @click="onClose" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import TaskForm from './TaskForm.vue';
import Button from './Button.vue';

const props = defineProps({
  taskData: {
    type: Object,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
  onEditTask: {
    type: Function,
    required: true,
  },
});

const task = ref(props.taskData.task);
const date = ref(props.taskData.date);
const status = ref(props.taskData.status);

const saveTask = () => {
  const updatedTask = {
    ...props.taskData,
    task: task.value,
    date: date.value,
    status: status.value,
  };
  alert("Updated")
  console.log("Updated task:", updatedTask);

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskIndex = tasks.findIndex(t => t.id === props.taskData.id);
  if (taskIndex !== -1) {
    tasks[taskIndex] = updatedTask;
    console.log("cập nhật tại ", taskIndex)
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));

  props.onEditTask(updatedTask);
  props.onClose();
};


</script>

<style scoped></style>
