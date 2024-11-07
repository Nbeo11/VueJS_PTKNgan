<template>
    <button :class="classButton" @click="props.onClick">
        {{ props.title }}
    </button>
</template>

<script setup>
const props = defineProps({
    classButton: {
        type: String,
        default:
            'bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gradient-to-l hover:from-indigo-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-300',
    },
    title: {
        type: String,
        default: '',
    },
    onClick: {
        type: Function,
        default: () => { },
    },
})
</script>

<style scoped>
button {
    background-image: linear-gradient(90deg, #4a90e2, #7b61ff);
    color: white;
    font-weight: bold;
    transition:
        background 0.3s ease,
        transform 0.2s ease;
}

button:hover {
    background-image: linear-gradient(90deg, #7b61ff, #4a90e2);
}

button:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(123, 97, 255, 0.4);
}

button:active {
    transform: scale(0.98);
}
</style>