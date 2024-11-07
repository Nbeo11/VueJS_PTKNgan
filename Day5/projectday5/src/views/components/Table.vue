<template>
  <div>
    <Button title="Delete Selected" @click="deleteSelectedTasks" class="mt-3" />
    <table class="task-table">
      <thead>
        <tr class="h-16 text-lg">
          <th class="px-4 py-2 text-left font-bold text-white" style="width: 8%;">STT</th>
          <th class="px-4 py-2 text-left font-bold text-white" style="width: 33%;">Task</th>
          <th class="px-4 py-2 text-left font-bold text-white" style="width: 8%;">Status</th>
          <th class="px-4 py-2 text-left font-bold text-white" style="width: 25%;">Date</th>
          <th class="px-4 py-2 text-left font-bold text-white" style="width: 17%;">Action</th>
          <th class="px-4 py-2 text-center" style="width: 8%;">
            <div class="flex justify-center items-center">
              <Checkbox v-model="allChecked" @change="toggleAllChecks"
                class="text-white bg-white border-gray-300 hover:border-gray-400" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index" class="hover:bg-green-100 h-12 text-black text-base">
          <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
          <td class="border px-4 py-2">{{ task.task }}</td>
          <td class="border px-4 py-2 text-center">{{ task.status }}</td>
          <td class="border px-4 py-2 text-center">{{ formatDate(task.date) }}</td>
          <td class="border px-4 py-2 text-center">
            <Button :title="'Edit'" @click="editTask(index)" class="text-sm py-1 font-normal m-0" />
          </td>
          <td class="border px-4 py-2 text-center">
            <div class="flex justify-center items-center">
              <Checkbox :modelValue="checkedTasks.includes(task.id)"
                @update:modelValue="(val) => toggleCheck(task.id)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="isEditing" class="backdrop" @click="handleCloseEdit"></div>

    <EditTask v-if="isEditing" :taskData="taskToEdit" :onClose="handleCloseEdit" :onEditTask="handleEditTask"
      class="add-new-task" />

    <div v-if="completedTasks.length > 0">
      <h3>Công việc đã hoàn thành</h3>
      <ul>
        <li v-for="(task, index) in completedTasks" :key="index">{{ task.task }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Checkbox from './Checkbox.vue';
import Button from './Button.vue';
import EditTask from './EditTask.vue';
import { ref, watch } from 'vue';

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  }
});

const checkedTasks = ref([]);
const allChecked = ref(false);
const isEditing = ref(false);
const taskToEdit = ref(null);
const completedTasks = ref([]);

const loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    props.tasks.splice(0, props.tasks.length, ...JSON.parse(storedTasks));
  }
};

const checkAllTasks = () => {
  allChecked.value = props.tasks.length > 0 && props.tasks.every(task => checkedTasks.value.includes(task.id));
};

watch(() => props.tasks, (newTasks) => {
  checkAllTasks();
}, { deep: true });

const deleteSelectedTasks = () => {
  const updatedTasks = props.tasks.filter(task => !checkedTasks.value.includes(task.id));
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  loadTasksFromLocalStorage();
  checkedTasks.value = [];
  alert("Deleted");
};

const toggleAllChecks = () => {
  if (allChecked.value) {
    checkedTasks.value = props.tasks.map(task => task.id);
  } else {
    checkedTasks.value = [];
  }
  checkAllTasks();
  console.log(checkedTasks.value);

};

const toggleCheck = (taskId) => {
  const index = checkedTasks.value.indexOf(taskId);
  if (index === -1) {
    checkedTasks.value.push(taskId);
  } else {
    checkedTasks.value.splice(index, 1);
  }
  checkAllTasks();
  console.log(checkedTasks.value);

};
function formatDate(dateTime) {
  const date = new Date(dateTime);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
const editTask = (index) => {
  taskToEdit.value = { ...props.tasks[index] };
  isEditing.value = true;
};

const handleCloseEdit = () => {
  isEditing.value = false;
};

const handleEditTask = (updatedTask) => {
  const index = props.tasks.findIndex(t => t.id === updatedTask.id);
  if (index !== -1) {
    props.tasks[index] = updatedTask;
    localStorage.setItem('tasks', JSON.stringify(props.tasks));
  }
  isEditing.value = false;
};

const showCompletedTasks = () => {
  completedTasks.value = props.tasks.filter(task => task.status == "done");
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

.task-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.task-table th,
.task-table td {
  padding: 0 10px;
  border: 1px solid #ddd;
  transition: background-color 0.3s;
}

.task-table th {
  background: linear-gradient(to right, #3b82f6, #6366f1);
  color: #ffffff;
  text-align: center;
  font-weight: 600;
}

.task-table tbody tr {
  background-color: #ffffff;
}

.task-table tbody tr:nth-child(even) {
  background-color: #d9ebe1;
}

.task-table tbody tr:hover {
  background-color: #cdd1e4;
}

.task-table td {
  color: #374151;
}
</style>
