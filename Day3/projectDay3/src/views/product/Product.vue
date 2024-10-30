<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '@/stores/store';

const store = useProductStore();
const initCart = () => {
    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
};

function customPrice(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

const countItemsInCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.length;
};

onMounted(() => {
    initCart();
});

const itemCount = ref(countItemsInCart());
</script>

<template>
    <div class="mt-16 bg-white pt-3">
        <section>
            <h2 class="text-3xl text-center mb-7">Danh sách các sản phẩm</h2>
            <div class="flex flex-wrap gap-4 px-4">
                <div v-for="(item, id) in store.products" :key="id"
                    class="flex flex-col gap-2 text-xs p-4 border-slate-900 border-[1px] rounded-md">
                    <img class="w-36 self-center border-slate-300 border-[1px] rounded-md" :src="item.imageUrl"
                        :alt="item.name">
                    <div class="text-lg">{{ item.name }}</div>
                    <div>{{ customPrice(item.price) }}</div>
                    <div v-if="item.isBestSeller" class="flex gap-3">
                        <div class="text-red-800">Bán chạy</div>
                        <img class="w-3" src="../fire.png" alt="">
                    </div>
                    <div v-else>Bán không chạy</div>
                    <router-link :to="{ name: 'ProductDetail', params: { id: item.id } }"
                        class="bg-[#91C2BC] text-[12px] text-black  h-6 w-28 self-center border-slate-900 rounded-md hover:bg-[#2E756D] hover:text-white scale-75 transition-transform duration-200 hover:scale-90 flex items-center justify-center">
                        Xem sản phẩm
                    </router-link>
                </div>
            </div>
            <div class="text-center mt-4">
                <p>Số lượng sản phẩm trong giỏ: {{ itemCount }}</p>
            </div>
        </section>
    </div>
</template>

<style scoped></style>
