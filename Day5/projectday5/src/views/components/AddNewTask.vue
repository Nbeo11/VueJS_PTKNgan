<template>
    <div>
        <form @submit.prevent
            class="absolute top-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-xl bg-[#b5c0fb] p-4 flex flex-col gap-3 shadow-lg shadow-gray-500">
            <h2 class="text-lg font-bold">Add New Task</h2>
            <TaskForm v-model:taskModel="task" v-model:dateModel="date" v-model:statusModel="status" />
            <div class="flex gap-2 mt-4">
                <Button :title="'Add'" :classButton="'text-xs p-1 rounded-md'" @click="addTask" />
                <Button :title="'Cancel'" :classButton="'text-xs p-1 rounded-md'" @click="onClose" />
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import TaskForm from './TaskForm.vue';
import Button from './Button.vue';

const props = defineProps({
    onClose: {
        type: Function,
        required: true,
    },
    onAddTask: {
        type: Function,
        required: true,
    },
});

const task = ref('');
const date = ref('');
const status = ref('todo');

const addTask = () => {
    const newTask = {
        id: generateId(),
        task: task.value,
        date: date.value,
        status: status.value,
        checked: false,
    };
    console.log("New Task:", newTask);
    if (task.value && date.value) {
        props.onAddTask(newTask);

        task.value = '';
        date.value = '';
        status.value = 'todo';
        alert("Added")
    } else {
        alert("Chưa điền đủ thông tin");
    }
};


const generateId = () => {
    return Date.now();
};

</script>

<style scoped></style>
