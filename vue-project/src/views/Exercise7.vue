<template>
  <div class="container">
    <div class="content">
      <div>
        <h3>Đăng ký tài khoản</h3>
      </div>
      <form @submit.prevent="checkForm">
        <div>
          <label for="username">Họ và tên:</label>
          <input type="text" v-model="username" name="username" id="username" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" name="email" id="email" />
        </div>
        <div>
          <label for="phoneNumber">Số điện thoại:</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            v-model="phoneNumber"
            @input="this.value = this.value.replace(/[^0-9]/g, '')"
          />
        </div>
        <div>
          <label for="password">Mật khẩu:</label>
          <input
            type="password"
            v-model="password"
            name="password"
            id="password"
          />
        </div>
        <div>
          <label for="re-password">Nhập lại mật khẩu:</label>
          <input
            type="password"
            v-model="rePassword"
            name="re-password"
            id="re-password"
          />
        </div>
        <input
          :class="{ bgBlue: checkPassword, disabled: !checkPassword }"
          class="submit"
          type="submit"
          :value="checkPassword ? 'Đăng ký' : 'Đăng ký'"
          :disabled="!checkPassword"
        />
      </form>
      <p v-if="formCompleted && submitted">Form đã hoàn thành</p>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, computed, watch } from 'vue'

const username = ref('')
const email = ref('')
const phoneNumber = ref('')
const password = ref('')
const rePassword = ref('')
const formCompleted = ref(false)
const submitted = ref(false)

const checkPassword = computed(() => {
  return password.value.length >= 8
})

watch([username, email, phoneNumber, password, rePassword], () => {
  formCompleted.value =
    username.value &&
    email.value &&
    phoneNumber.value &&
    password.value &&
    rePassword.value
})

const checkForm = () => {
  if (formCompleted.value) {
    submitted.value = true
    console.log('Form has been submitted')
  }
}
</script>
  
  <style scoped>
.container {
  max-width: 1024px;
  margin: 0 auto;
}
.content {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: antiquewhite;
  padding: 20px;
  border-radius: 20px;
}
h3 {
  text-align: center;
  font-size: 30px;
}
form {
  font-size: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
form > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
input {
  width: 350px;
  height: 35px;
  border-radius: 10px;
  border: 1px solid grey;
  padding: 10px;
}
.submit {
  width: 100px;
  background-color: rgb(113, 113, 113);
  color: white;
  height: auto;
  align-self: center;
  cursor: not-allowed;
}

.bgBlue {
  background-color: rgb(39, 81, 171);
  cursor: pointer;
}

.bgBlue:hover {
  background-color: rgb(30, 61, 127);
}

.disabled {
  background-color: grey;
}
</style>
  