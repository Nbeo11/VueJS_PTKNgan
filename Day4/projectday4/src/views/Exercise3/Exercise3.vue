<template>
    <div>
        <h2 class="text-3xl font-bold text-center">Tất cả sản phẩm</h2>
        <div class="my-4 pl-10 mb-7">
            <div class="flex mb-4 items-center">
                <div class="font-semibold text-xl">Lọc sản phẩm:</div>
                <button @click="resetFilter"
                    :class="isFilter ? 'border-2 p-2 rounded-md bg-green-400 text-black hover:bg-green-900 hover:text-white' : 'border-2 p-2 rounded-md bg-red-700 text-white hover:cursor-default'"
                    class="ml-8">
                    Tất cả sản phẩm
                </button>
                <button @click="toggleFilter"
                    :class="isFilter ? 'border-2 p-2 rounded-md bg-red-700 text-white hover:cursor-default' : 'border-2 p-2 rounded-md bg-green-400 text-black hover:bg-green-900 hover:text-white'"
                    class="ml-8">
                    Lọc sản phẩm theo giá tối thiểu
                </button>
            </div>
            <div v-if="isFilter">
                <div v-if="isFilter">
                    <div class="mb-3">Lọc sản phẩm theo giá tối thiểu:</div>
                    <form @submit.prevent="applyFilter">
                        <input v-model="minPrice" class="border-2 p-[3px] text-sm border-gray-400" type="number"
                            placeholder="Giá tối thiểu" />
                        <button type="submit"
                            class="ml-8 border-2 px-3 py-[2px] rounded-md bg-green-400 text-black hover:bg-green-900 hover:text-white">
                            Lọc
                        </button>
                    </form>
                </div>

            </div>
        </div>
        <div class="flex flex-wrap justify-start max-w-screen-xl mx-auto gap-[70px] px-10">
            <div class="border border-gray-400 p-8 rounded-lg shadow-md" v-for="(product, id) in filteredProducts"
                :key="id">
                <img :src="product.image" :alt="product.name"
                    class="w-36 mx-auto border-4 border-gray-300 rounded-lg p-2">
                <h2 class="text-xl font-semibold">{{ product.name }}</h2>
                <button @click="addToCart(product)"
                    class="h-8 bg-orange-400 rounded-lg border border-gray-300 hover:bg-orange-600 hover:text-white transition">
                    Thêm vào giỏ hàng
                </button>
                <div class="mt-2">Giá sản phẩm: {{ product.price }}</div>
                <div class="text-red-600 font-semibold mt-1" v-if="product.hot">Sắp cháy hàng !!!</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';

const cartData = JSON.parse(localStorage.getItem('cart')) || [];
const counter = ref(cartData.length);
const isFilter = ref(false);
const minPrice = ref(null);

const data = reactive({
    cart: [],
    products: [
        {
            id: 1,
            name: "PS5",
            price: 5555,
            publicDate: "05-05-2021",
            image: "https://cdn.vjshop.vn/hightech/may-choi-game/ps5/sony-ps-5-1.jpg",
            hot: true,
        },
        {
            id: 2,
            name: "PS4",
            price: 4444,
            publicDate: "04-04-2021",
            image: "https://gmedia.playstation.com/is/image/SIEPDC/ps4-slim-image-block-01-en-24jul20?$native--t$",
            hot: true,
        },
        {
            id: 3,
            name: "PS3",
            price: 3333,
            publicDate: "03-03-2021",
            image: "https://gmedia.playstation.com/is/image/SIEPDC/ps4-slim-image-block-01-en-24jul20?$native--t$",
            hot: false,
        },
        {
            id: 4,
            name: "PS8",
            price: 2222,
            publicDate: "05-05-2021",
            image: "https://cdn.vjshop.vn/hightech/may-choi-game/ps5/sony-ps-5-1.jpg",
            hot: true,
        },
        {
            id: 5,
            name: "PS7",
            price: 1111,
            publicDate: "04-04-2021",
            image: "https://gmedia.playstation.com/is/image/SIEPDC/ps4-slim-image-block-01-en-24jul20?$native--t$",
            hot: true,
        },
        {
            id: 6,
            name: "PS6",
            price: 3456,
            publicDate: "03-03-2021",
            image: "https://gmedia.playstation.com/is/image/SIEPDC/ps4-slim-image-block-01-en-24jul20?$native--t$",
            hot: false,
        },
    ],
});

const filteredProducts = computed(() => {
    if (isFilter.value && minPrice.value !== null) {
        return data.products.filter(product => product.price >= minPrice.value);
    }
    return data.products;
});

function addToCart(product) {
    const productData = {
        name: product.name,
        price: product.price
    };
    data.cart.push(productData);
    counter.value++;
    localStorage.setItem('cart', JSON.stringify(data.cart));
    alert(`Đã thêm ${product.name} với giá ${product.price} vào giỏ hàng!`);
}

function toggleFilter() {
    isFilter.value = !isFilter.value;
}

function resetFilter() {
    isFilter.value = false;
    minPrice.value = null;
}

function applyFilter() {
    isFilter.value = true;
}

function submitFilter(e) {

}
</script>

<style scoped></style>
