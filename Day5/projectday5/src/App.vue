<template>
  <div class="relative max-w-screen-lg mx-auto bg-[#ffebd2] rounded-lg p-5">
    <Button :title="'Add New Task'" @click="openForm" />
    <br>
    <div v-if="showAddNewTask" class="backdrop"></div>
    <AddNewTask class="add-new-task" v-if="showAddNewTask" :onClose="closeForm" :onAddTask="addTask" />
    <TableVue :tasks="tasks" :onDeleteSelectedTasks="deleteSelectedTasks" @toggle-check="handleToggleCheck" />
    <Button :title="'Show Completed Task'" @click="showCompletedTasks" class="mt-3"></Button>
    <div v-if="completedTasks.length > 0">
      <br>
      <ul class="border-2 border-gray-500 w-1/2 rounded-md p-3 relative bg-[#fafafa]">
        <span class="absolute right-1 top-1 border-2 rounded-md bg-slate-300 px-2 hover:cursor-pointer hover:scale-105"
          @click="closeCompletedTasks">x</span>
        <li v-for="(task, index) in completedTasks" :key="index">{{ task.task }}</li>
      </ul>
    </div>
    <div v-else>
      <br>
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Button from "./views/components/Button.vue";
import TableVue from "./views/components/Table.vue";
import AddNewTask from "./views/components/AddNewTask.vue";

const showAddNewTask = ref(false);
const tasks = ref([]);
const completedTasks = ref([]);
const message = ref('');

const showCompletedTasks = () => {
  completedTasks.value = tasks.value.filter(task => task.status === 'done');

  if (completedTasks.value.length === 0) {
    message.value = 'No completed task';
  } else {
    message.value = '';
  }
};

const closeCompletedTasks = () => {
  completedTasks.value = [];
  message.value = '';
};

onMounted(() => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks.value = JSON.parse(storedTasks);
  }
});

watch(tasks, (newTasks) => {
  localStorage.setItem('tasks', JSON.stringify(newTasks));
}, { deep: true });

function openForm() {
  showAddNewTask.value = true;
}

function closeForm() {
  showAddNewTask.value = false;
}

function addTask(newTask) {
  const taskToAdd = {
    ...newTask,
    checked: false,
  };
  tasks.value = [...tasks.value, taskToAdd];
  closeForm();
}

function handleToggleCheck(index) {
  tasks.value[index].checked = !tasks.value[index].checked;
}
const deleteSelectedTasks = () => {
  tasks.value = tasks.value.filter(task => !task.deleteSelected);
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.add-new-task {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
}
</style>
