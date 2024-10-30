<template>
    <div class="mt-16 bg-white pt-3">
        <h1 class="ml-2">Chi tiết sản phẩm</h1>
        <div v-if="product" class="p-5">
            <div class="flex gap-32">
                <div class="w-2/5">
                    <img :src="mainImage" :alt="product.name"
                        class="w-[400px] h-[400px] object-cover mb-4 border-gray-300 border-2" />
                    <div class="flex gap-5 w-[400px] overflow-hidden">
                        <img :src="product.imageUrl" alt=""
                            class="thumbnail w-16 border-gray-300 border-2 hover:cursor-pointer hover:scale-105"
                            @mouseover="updateMainImage(product.imageUrl)" />
                        <img v-for="color in product.colors" :key="color.color" :src="color.imageUrl" :alt="color.color"
                            class="thumbnail w-16 border-gray-300 border-2 hover:cursor-pointer hover:scale-105"
                            @mouseover="updateMainImage(color.imageUrl)" />
                    </div>

                    <div class=" mt-10 ">
                        <div v-if="product.isBestSeller" class="text-3xl flex gap-7 items-end text-red-600">
                            <div>
                                Bán chạy
                            </div>
                            <img class="w-10" src="../fire.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="text-xl w-3/5">
                    <h2 class="text-3xl mb-7">{{ product.name }}</h2>
                    <div class="bg-purple-300 h-20 text-red-600 pl-8 text-5xl flex items-center ">{{
                        customPrice(product.price) }}</div>
                    <div class="pl-8 text-lg flex flex-col gap-5">
                        <div class="mt-4">Mô tả: {{ product.description }}</div>
                        <div>Ngày sản xuất: {{ customDate(product.releaseDate) }}</div>
                        <div>Nhãn hiệu: {{ product.brand }}</div>
                        <div>Màu sắc: </div>
                        <div class="flex gap-8">
                            <div v-for="color in product.colors" :key="color.color"
                                :style="{ backgroundColor: colorMap[color.color] }"
                                class="color-box rounded-3xl border-gray-300 border-2 hover:cursor-pointer hover:scale-105"
                                :class="{ 'selected-color': selectedColor?.color === color.color }"
                                @click="selectColor(color)">
                            </div>
                        </div>
                        <div>Số lượng sản phẩm còn lại:</div>
                        <li v-for="color in product.colors" :key="color.color">Màu {{ color.color }} : {{ color.quantity
                            }} sản phẩm</li>
                    </div>
                    <div class="flex justify-center mt-5">
                        <button class="bg-[#91C2BC] p-3 text-black hover:bg-[#2E756D] hover:text-white"
                            :disabled="!selectedColor"
                            :class="{ 'curson-default': !selectedColor || selectedColor.quantity === 0 }"
                            @click="() => { if (selectedColor && selectedColor.quantity > 0) addToCart(); }">
                            Thêm vào giỏ hàng
                        </button>
                    </div>

                </div>
            </div>
        </div>
        <div v-else>
            <p>Sản phẩm không tồn tại.</p>
        </div>
    </div>
</template>

<script setup>
import { useProductStore } from '@/stores/store';
import { toRefs, ref } from 'vue';

const productCart = []

const colorMap = {
    'Trắng': '#FFFFFF',
    'Đen': '#000000',
    'Xanh dương': '#0000FF',
    'Xám': '#808080',
    'Xanh lá': '#008000',
    'Vàng': '#e2fa6b',
    'Nâu': '#FFE4B5',
};

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});

const store = useProductStore();
const product = store.products.find(item => item.id === props.id);
const mainImage = ref(product.imageUrl);
const selectedColor = ref(null);

function updateMainImage(imageUrl) {
    mainImage.value = imageUrl;
}

function selectColor(color) {
    selectedColor.value = color;
}

function customPrice(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function customDate(date) {
    const [year, month, day] = date.split('-')
    return `ngày ${day} tháng ${month} năm ${year}`
}

function addToCart() {
    if (selectedColor.value) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const cartItem = {
            name: product.name,
            color: selectedColor.value.color,
            quantity: 1,
            price: product.price
        };

        const existingProductIndex = cart.findIndex(item => item.name === cartItem.name);

        if (existingProductIndex > -1) {
            const existingColorIndex = cart[existingProductIndex].colors.findIndex(colorItem => colorItem.color === cartItem.color);

            if (existingColorIndex > -1) {
                cart[existingProductIndex].colors[existingColorIndex].quantity += 1;
            } else {
                cart[existingProductIndex].colors.push({
                    color: cartItem.color,
                    quantity: 1,
                    price: cartItem.price
                });
            }
        } else {
            cart.push({
                name: cartItem.name,
                colors: [{
                    color: cartItem.color,
                    quantity: 1,
                    price: cartItem.price
                }]
            });
        }
        const colorInProduct = product.colors.find(color => color.color === selectedColor.value.color);
        if (colorInProduct && colorInProduct.quantity > 0) {
            colorInProduct.quantity -= 1; 
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(`Thêm sản phẩm ${cartItem.name} với màu ${cartItem.color} vào giỏ hàng`);
        alert(`Thêm sản phẩm ${cartItem.name} với màu ${cartItem.color} vào giỏ hàng`);
        // Phát ra sự kiện tùy chỉnh khi giỏ hàng được cập nhật
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
}


</script>

<style scoped>
.selected-color {
    transform: scale(1.2);
    border: 2px solid #9f6464;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); 
}


.color-box {
    width: 40px;
    height: 40px;
    transition: transform 0.2s;
}

.curson-default {
    cursor: default;
    background-color: grey;
    color: black;
}
</style>
