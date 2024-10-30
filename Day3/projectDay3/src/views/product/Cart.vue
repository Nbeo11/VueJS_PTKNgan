<template>
    <div class="mt-16 bg-white p-5">
        <h2 class="text-2xl font-bold mb-8">Giỏ hàng của bạn</h2>
        <div v-if="cartItems.length > 0">
            <div v-for="(item, index) in cartItems" :key="index" class="px-10 flex flex-col gap-10">
                <div v-for="(colorItem, colorIndex) in item.colors" :key="colorIndex" class="flex gap-7">
                    <img class="w-36 h-36 border-gray-300 border-2" :src="item.imageUrl" alt="">
                    <div class="grid grid-cols-5 gap-4 w-full items-center">
                        <h2 class="text-xl font-bold">{{ item.name }}</h2>
                        <div>
                            <strong>Màu: </strong> {{ colorItem.color }}
                        </div>
                        <div>
                            <strong>Số lượng: </strong> <input type="number" v-model.number="colorItem.quantity" min="0"
                                @change="updateQuantity(item, colorItem)"
                                class="border border-gray-300 rounded w-16 text-center" />
                        </div>
                        <div>
                            <strong>Giá: </strong> {{ customPrice(colorItem.price) }}
                        </div>
                        <button>
                            <img class="w-10" src="../delete.png" alt="">
                        </button>
                    </div>
                </div>
            </div>
            <div class="mt-10 text-xl">Thành tiền: {{ customPrice(totalPrice()) }}</div>
            <div class="flex justify-center">
                <button @click="complete()"
                    class="bg-[#91C2BC] h-10 w-24 hover:bg-[#2E756D] hover:text-white scale-75 transition-transform duration-200 hover:scale-90 flex items-center justify-center">Thanh
                    toán</button>
            </div>
        </div>
        <div v-else>Giỏ hàng trống</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '@/stores/store';

const cartItems = ref([]);
const store = useProductStore();

onMounted(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.value = cart.map(item => {
        const product = store.products.find(p => p.name === item.name);
        if (product) {
            return {
                name: product.name,
                imageUrl: product.imageUrl,
                colors: item.colors,
            };
        }
        return null;
    }).filter(item => item !== null);
});

function totalPrice() {
    let total = 0
    cartItems.value.forEach(item => {
        item.colors.forEach(color => {
            total += color.price * color.quantity
        })
    });
    return total;
}

function removeItem() {
    
}

function complete() {
    localStorage.removeItem("cart");
    cartItems.value = [];
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    alert("Thanh toán thành công")
}
function customPrice(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
</script>

<style lang="scss" scoped></style>