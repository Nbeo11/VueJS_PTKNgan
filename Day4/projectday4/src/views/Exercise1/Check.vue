<template>
    <div>
        <div>Trạng thái sản phẩm:</div>
        <ul>
            <li v-for="product in products" :key="product.id">
                {{ product.name }} - Trạng thái: {{ product.isCheck ? 'Đã xác nhận' : 'Chưa xác nhận' }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
const props = defineProps({
    products: {
        type: Array,
        required: true
    }
})

onMounted(() => {
    console.log(`Component Item đã được tạo cho sản phẩm: ${props.item}`)
})
</script>

<style scoped></style>