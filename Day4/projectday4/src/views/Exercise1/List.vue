<template>
    <div>
        <h2 class="text-xl mb-5 font-bold">Danh sách sản phẩm</h2>
        <table class="min-w-full border-collapse border border-gray-200">
            <thead>
                <tr class="text-red-600">
                    <th class="border border-gray-200 p-2">Tên sản phẩm</th>
                    <th class="border border-gray-200 p-2">Giá</th>
                    <th class="border border-gray-200 p-2">Mô tả</th>
                    <th class="border border-gray-200 p-2">Hành động</th>
                    <th class="border border-gray-200 p-2">Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                <Item 
                    v-for="(product) in products" 
                    :key="product.id" 
                    :product="product" 
                    @confirm="handleConfirm"
                />
            </tbody>
        </table>
        <Check :products="products" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Item from './Item.vue';
import Check from './Check.vue';

const products = ref([
    { id: 1, name: "Sản phẩm 1", price: 100000, description: "Mô tả sản phẩm 1"},
    { id: 2, name: "Sản phẩm 2", price: 200000, description: "Mô tả sản phẩm 2"},
    { id: 3, name: "Sản phẩm 3", price: 300000, description: "Mô tả sản phẩm 3"},
]);

const handleConfirm = (id) => {
    const product = products.value.find(product => product.id === id);
    if (product) {
        if (!product.isCheck) {
            product.isCheck = true; 
            alert(`Sản phẩm ${product.name} đã được xác nhận!`);
        } else {
            alert(`Sản phẩm ${product.name} đã được xác nhận trước đó.`);
        }
    }
};
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
</style>
