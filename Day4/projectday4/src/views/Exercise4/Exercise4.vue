<template>
    <div class="max-w-[350px] mx-auto border-2 rounded-xl p-8 bg-[#95c6e8] text-[#003B46]">
        <h3 class="text-2xl text-center mb-5">Đăng ký tài khoản</h3>
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-8">
            <div class="relative">
                <div class="flex justify-between">
                    <label for="username"> Username: </label>
                    <input class="rounded-md p-1 px-2 text-xs" type="text" name="username" id="username"
                        placeholder="username" v-model="username" />
                </div>
                <span class="text-red-500 absolute text-sm">{{ usernameError }}</span>
            </div>

            <div class="relative">
                <div class="flex justify-between">
                    <label for="email">Email: </label>
                    <input class="rounded-md p-1 px-2 text-xs" type="text" name="email" id="email" placeholder="email"
                        v-model="email" />
                </div>
                <span class="text-red-500 absolute text-sm">{{ emailError }}</span>
            </div>

            <div class="relative">
                <div class="flex justify-between">
                    <label for="password"> Password: </label>
                    <input class="rounded-md p-1 px-2 text-xs" type="password" name="password" id="password"
                        placeholder="password" v-model="password" />
                </div>
                <span class="text-red-500 absolute text-sm">{{ passwordError }}</span>
            </div>

            <button class="bg-green-900 w-24 h-7 text-white text-xs rounded-md self-center mt-4"
                :disabled="!isFormValid">
                Đăng ký
            </button>
        </form>
    </div>
</template>

<script setup>

import { computed, ref } from 'vue';
const username = ref('');
const password = ref('')
const email = ref('')

const usernameError = computed(() => {
    return username.value.trim() ? '' : "Username is required";
});

const emailError = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) return "Email is required";
    if (!emailRegex.test(email.value)) {
        return 'Invalid email format';
    }
    return '';
})

const passwordError = computed(() => {
    if (!password.value.trim()) return "Password is required";
    if (password.value.trim().length < 6) return 'Password must be at least 6 characters long';
    return '';
})

const isFormValid = computed(() => {
    return !usernameError.value && !emailError.value && !passwordError.value;
});


function handleSubmit() {
    if(isFormValid.value) {
        alert('Registration successful');
        username.value = '';
        email.value = '';
        password.value = '';
    }
}
</script>

<style scoped></style>
