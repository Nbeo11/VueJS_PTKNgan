<template>
    <tr>
        <td class="border border-gray-200 p-2">{{ product.name }}</td>
        <td class="border border-gray-200 p-2">{{ product.price }}</td>
        <td class="border border-gray-200 p-2">{{ product.description }}</td>
        <td class="border border-gray-200 p-2">
            <button @click="confirmProduct" :disabled="product.isCheck">
                Xác nhận
            </button>
        </td>
        <td class="border border-gray-200 p-2">{{ product.isCheck ? 'Đã xác nhận' : 'Chưa xác nhận' }}</td>
    </tr>
</template>

<script setup>
import { defineProps, onMounted, defineEmits } from 'vue';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const emit = defineEmits();

const confirmProduct = () => {
    emit('confirm', props.product.id);
};

onMounted(() => {
    console.log(`Component Item đã được tạo cho sản phẩm: ${props.product.name}`);
});
</script>

<style scoped>
table {
    width: 100%;
    margin: 10px 0;
}

th,
td {
    text-align: left;
}

button {
    padding: 5px 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>