<template>
    <div class="container">
        <div>
            <!-- <header>
                <a href="">Message</a>
                <a href="">Today's Task</a>
                <a href="">Last Activity</a>
            </header> -->
            <div>
                <div class="title">
                    <div>
                        <h2>Today's Task <span>({{ count }} items)</span></h2>
                        <div class="todayDate">{{ formattedDate }}</div>
                    </div>
                    <button @click="toggleForm">Add new</button>
                </div>
                <div class="lists">
                    <div class="list" v-for="item in arr" :key="item.id">
                        <div>
                            <div>
                                <div class="task">{{ item.task }}</div>
                                <div>{{ item.detail }}</div>
                            </div>
                            <input type="checkbox" class="checkBox" v-model="item.status" @change="updateTaskStatus(item)">
                        </div>
                        <hr>
                        <div>
                            <div>
                                {{ formatDate(item.start) }}
                                <br>
                                {{ formatTime(item.start) }} - {{ formatTime(item.end) }}
                            </div>
                            <div class="buttonIcon">
                                <button @click="editTask(item.id)">
                                    <img src="./edit.png" alt="Edit">
                                </button>
                                <button @click="removeTask(item.id)">
                                    <img src="./delete.png" alt="Delete">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="formVisible" class="form">
            <form @submit.prevent="handleSubmitForm">
                <label>Add New</label>
                <input type="text" v-model="todo" placeholder="Add a new todo" />
                <textarea v-model="detail" placeholder="Detail" rows="3"></textarea>
                <div>
                    <input type="date" v-model="selectedDate" :min="currentDate" placeholder="Select date" />
                    <input type="time" v-model="startTime" placeholder="Start time" />
                    <input type="time" v-model="endTime" placeholder="End time" />
                </div>
                <div>
                    <button type="submit">Add</button>
                    <button @click="formVisible = false">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';

const arr = ref([]);
const todo = ref('');
const detail = ref('');
const selectedDate = ref('');
const startTime = ref('');
const endTime = ref('');
const formattedDate = ref('');
const currentDate = ref('');
const formVisible = ref(false);
const editingTaskId = ref(null);

const count = computed(() => arr.value.length);

onMounted(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        arr.value = JSON.parse(storedTodos);
        arr.value.sort((a, b) => new Date(a.start) - new Date(b.start));
    }
    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    formattedDate.value = today.toLocaleDateString('en-US', options);
    currentDate.value = today.toISOString().split('T')[0];
});

function handleSubmitForm() {
    if (todo.value.trim() === '' || selectedDate.value === '' || startTime.value === '' || endTime.value === '') return;

    const newTask = {
        id: editingTaskId.value !== null ? editingTaskId.value : Date.now(),
        status: false,
        task: todo.value,
        detail: detail.value,
        start: `${selectedDate.value} ${startTime.value}`,
        end: `${selectedDate.value} ${endTime.value}`
    };

    if (editingTaskId.value) {
        const index = arr.value.findIndex(item => item.id === editingTaskId.value);
        if (index !== -1) {
            arr.value.splice(index, 1, newTask);
            alert(`Updated "${todo.value}" in the todo list.`);
        }
    } else {
        arr.value.push(newTask);
        alert(`Added "${todo.value}" to the todo list.`);
    }

    arr.value.sort((a, b) => new Date(a.start) - new Date(b.start));
    localStorage.setItem('todos', JSON.stringify(arr.value));

    resetForm();
}

function formatDate(dateTime) {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function formatTime(dateTime) {
    const date = new Date(dateTime);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
}

function toggleForm() {
    formVisible.value = true;
}

function updateTaskStatus(item) {
    localStorage.setItem('todos', JSON.stringify(arr.value));
}

function resetForm() {
    todo.value = '';
    detail.value = '';
    selectedDate.value = '';
    startTime.value = '';
    endTime.value = '';
    editingTaskId.value = null; 
    formVisible.value = false;
}

function editTask(taskId) {
    const task = arr.value.find(item => item.id === taskId);
    if (task) {
        todo.value = task.task;
        detail.value = task.detail;
        const startDateTime = new Date(task.start);
        const endDateTime = new Date(task.end);
        selectedDate.value = startDateTime.toISOString().split('T')[0];
        startTime.value = startDateTime.toTimeString().split(' ')[0].substring(0, 5);
        endTime.value = endDateTime.toTimeString().split(' ')[0].substring(0, 5);
        editingTaskId.value = taskId; 
        formVisible.value = true;
    }
}

const removeTask = (listId) => {
    arr.value = arr.value.filter(list => list.id !== listId);
    localStorage.setItem('todos', JSON.stringify(arr.value));
};
</script>

<style scoped>
.container {
    max-width: 500px;
    margin: 0 auto;
    border: 1px solid rgb(238, 238, 238);
    padding: 30px;
    border-radius: 20px;
    background-color: rgb(61, 64, 84);
    position: relative;
}
h2 {
    color: white;
}
input {
    height: 28px;
    border-radius: 8px;
    border: 1px solid grey;
    padding: 5px;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.title > button {
    height: 40px;
    border-radius: 8px;
    border: none;
    background-color: rgb(252, 227, 197);
}

.title > button:hover {
    cursor: pointer;
    scale: 1.1;
}

.form {
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: rgb(144, 222, 222);
    border-radius: 10px;
    width: 400px;
    resize: vertical;
}

form {
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

form > div {
    display: flex;
    justify-content: space-around;
}

form > label {
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    color: black;
}

.lists {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.list {
    padding: 15px;
    border-radius: 15px;
    background-color: white;
}

.list > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.task {
    font-size: 20px;
}

hr {
    border: 0;
    height: 1px;
    background: #ccc;
    margin: 10px 0;
}

textarea {
    width: 100%;
    resize: vertical;
    border-radius: 4px;
    border: 1px solid grey;
    padding: 5px;
}

.checkBox {
    width: 30px;
    height: 30px;
}

.buttonIcon > button > img {
    height: 20px;
    width: 20px;
}
.buttonIcon > button {
    background-color: rgb(204, 227, 246);
    border: none;
    border-radius: 5px;
    margin-left: 5px;
}
.todayDate {
    color: white;
    font-size: 12px;
}
</style>
