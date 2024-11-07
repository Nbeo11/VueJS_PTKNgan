<template>
    <div class="max-w-xl mx-auto p-5 mt-8 bg-gradient-to-br from-blue-300 via-white to-blue-300 border border-blue-200 rounded-xl shadow-xl">
        <div class="text-xl text-center">Chuyển đổi tiền tệ $$$</div>
        <div class="max-w-lg mx-auto mt-8 flex flex-col gap-3">
            <div class="flex">
                <label class="w-1/4" for="money">Nhập vào số tiền: </label>
                <div class="w-3/4 flex justify-between">
                    <input v-model="amount" class="border-2" type="text" name="money" id="amount">
                    <span class="text-xl">→</span>
                    <input v-model="convertedAmount" class="border-2" type="text" name="money" readonly>
                </div>
            </div>
            <div class="flex">
                <label class="w-1/4" for="money">Chuyển đổi: </label>
                <div class="w-3/4 flex justify-between">
                    <select v-model="fromCurrency" id="fromCurrency">
                        <option v-for="(rate, code) in conversionRates" :key="code" :value="code">
                            {{ code }}
                        </option>
                    </select>
                    <button class="bg-transparent" @click="change">
                        <span class="text-xl">↔</span>
                    </button>
                    <select v-model="toCurrency" class="border-2" id="toCurrency">
                        <option v-for="(rate, code) in conversionRates" :key="code" :value="code">
                            {{ code }}
                        </option>
                    </select>
                </div>
            </div>

            <button class="submitButton" @click="convertCurrency">Chuyển đổi</button>

        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';

const amount = ref(0);
const convertedAmount = ref(0);
const fromCurrency = ref('USD');
const toCurrency = ref('USD');
const conversionRates = ref({})

onMounted(async () => {
    try {
        const response = await axios.get('https://v6.exchangerate-api.com/v6/95f18e56e6b7fcb50c4b0416/latest/USD');
        conversionRates.value = response.data.conversion_rates;
        console.log(conversionRates.value)
    } catch {
        console.log("Loi khi lay du lieu tu API")
    }
})

const convertCurrency = () => {
    if (conversionRates.value[fromCurrency.value] && conversionRates.value[toCurrency.value]) {
        const rate = conversionRates.value[toCurrency.value] / conversionRates.value[fromCurrency.value]
        convertedAmount.value = (amount.value * rate).toFixed(2);
    }
}

const change = () => {
    if (conversionRates.value[fromCurrency.value] && conversionRates.value[toCurrency.value]) {
        const temp = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = temp
    }
}


</script>

<style scoped>
input,
select {
    padding: 0 5px;
    border: 1px solid gray;
    border-radius: 3px;
    height: 25px;
    width: 150px;
}

.submitButton {
    padding: 5px;
    color: black;
    background-color: rgb(163, 174, 255);
    border-radius: 3px;
    width: 80px;
    align-self: center;
    font-size: 12px;
    transition: transform 0.3s;
}

.submitButton:hover {
    cursor: pointer;
    color: rgb(255, 255, 255);
    background-color: rgb(74, 71, 144);
    transform: scale(1.1);
}
</style>
