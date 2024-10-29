<template>
    <div>
        <div>
            <button class="parent">
                <img class="cart" src="./cart.png" alt="">
                <span class="counter">{{ counter }}</span>
            </button>
            <div>
                <label for="payment-method">Phương thức thanh toán:</label>
                <select id="payment-method" v-model="data.selectedPayment" @change="onPaymentMethodChange">
                    <option v-for="method in data.paymentMethods" :value="method.value" :key="method.value">
                        {{ method.text }}
                    </option>
                </select>
            </div>
        </div>
        <h2>Tất cả sản phẩm</h2>
        <div class="allProducts">
            <div class="product" v-for="(product, id) in data.products" :key="id">
                <img :src="product.image" :alt="product.name">
                <h2>{{ product.name }}</h2>
                <button @click="addToCart(product)">Thêm vào giỏ hàng</button>
                <div>Giá sản phẩm: {{ product.price }}</div>
                <div class="hot" v-if="product.hot">Sắp cháy hàng !!!</div>
            </div>
        </div>

        <h2>Danh sách các sản phẩm đang hot</h2>
        <div class="allProducts">
            <div class="product" v-for="(product, id) in isHots" :key="id">
                <img :src="product.image" :alt="product.name">
                <h2>{{ product.name }}</h2>
                <button @click="addToCart(product)">Thêm vào giỏ hàng</button>
                <div>Giá sản phẩm: {{ product.price }}</div>
                <div class="hot" v-if="product.hot">Sắp cháy hàng !!!</div>
            </div>
        </div>

        <h2>Sản phẩm đắt rẻ</h2>
        <div class="buttons">
            <button @click="showCheapest">Sản phẩm rẻ nhất</button>
            <button @click="showMostExpensive">Sản phẩm đắt nhất</button>
        </div>
        <div class="allProducts" v-if="currentProduct">
            <div class="product">
                <img :src="currentProduct.image" :alt="currentProduct.name">
                <h2>{{ currentProduct.name }}</h2>
                <button @click="addToCart(currentProduct)">Thêm vào giỏ hàng</button>
                <div>Giá sản phẩm: {{ currentProduct.price }}</div>
                <div class="hot" v-if="currentProduct.hot">Sắp cháy hàng !!!</div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
const cartData = JSON.parse(localStorage.getItem('cart')) || [];
const counter = ref(cartData.length);
console.log(cartData)
console.log(cartData.length)
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
    ],
    paymentMethods: [
        { text: "COD", value: 1 },
        { text: "Banking", value: 2 },
        { text: "Ứng dụng bên thứ 3", value: 3 },
    ],
    selectedPayment: 2,
});

const isHots = computed(() => {
    return data.products.filter(product => product.hot);
});

const cheapest = computed(() => {
    const validProducts = data.products.filter(product => product.price !== null && product.price !== undefined);
    return validProducts.sort((a, b) => a.price - b.price)[0];
});

const mostExpensive = computed(() => {
    const validProducts = data.products.filter(product => product.price !== null && product.price !== undefined);
    return validProducts.sort((a, b) => b.price - a.price)[0];
});

const currentProduct = ref(mostExpensive.value);

function showCheapest() {
    currentProduct.value = cheapest.value;
}

function showMostExpensive() {
    currentProduct.value = mostExpensive.value;
}

if (!currentProduct.value) {
    currentProduct.value = mostExpensive.value;
}

function onPaymentMethodChange () {
    alert("Đổi phương thức thanh toán thành công")
}

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
</script>

<style scoped>
h2 {
    font-size: 30px;
    text-align: center;
    font-weight: 700;
}

.allProducts {
    display: flex;
    gap: 20px;
    max-width: 1024px;
    margin: 20px auto;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

.product {
    border: 1px solid grey;
    padding: 30px 50px;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
}

img {
    width: 150px;
    align-self: center;
    border: 5px solid rgb(193, 193, 193);
    border-radius: 20px;
    padding: 10px;
}

.hot {
    color: red;
}

.buttons {
    display: flex;
    justify-content: space-evenly;
}

button {
    height: 30px;
    background-color: rgb(255, 183, 83);
    border-radius: 10px;
    border: 1px solid rgb(181, 181, 181);
}

button:hover {
    cursor: pointer;
    background-color: rgb(180, 116, 26);
    color: white;
}

.cart {
    border: none;
    width: 100px;
}

.parent {
    position: relative;
    background-color: transparent;
    border: none;
}

.parent:hover {
    background-color: transparent;
}

.counter {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    background-color: #ff0000;
    color: white;
    text-align: center;
    font-size: 13px;
    font-weight: bold;
    position: absolute;
    left: 45px;
    top: 10px
}
</style>
