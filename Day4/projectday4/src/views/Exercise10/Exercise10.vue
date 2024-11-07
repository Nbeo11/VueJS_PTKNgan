<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="shadow-[2px_2px_5px_rgba(0,0,0,0.3)] p-6 rounded-md max-w-xl mx-auto">
    <form @submit.prevent="fetchWeatherAPI" class="flex justify-end gap-2 text-xs">
      <input class="px-2 py-1 border-[1px] border-gray-800 rounded-sm w-28" v-model="city" type="text">
      <button class="border-2 rounded-md bg-slate-200 px-3 transition-all hover:scale-110 hover:bg-slate-700 hover:text-white" @click="fetchWeatherAPI">Search</button>
    </form>
    <div :class="weatherBackgroundClass" class="relative  mt-8 text-3xl text-white">
      <div class="absolute inset-0 bg-black opacity-30 rounded-md"></div>
      <div class="relative text-shadow flex flex-col items-center justify-center h-64 gap-5">
        <div>{{ citySelected }}</div>
        <div>{{ degree }} °C</div>
        <div class="flex items-center gap-3">
          <div class="px-4">{{ status }}</div>
        </div>
        <div class="flex gap-9 text-lg">
          <div>
            Humidity: {{ humidity }} %
          </div>
          <div>
            Rainfall: {{ rainfall }} mm
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

const city = ref('Ha Noi');
const citySelected = ref('');
const apiKey = 'ff3ec1cb2ec149418cc83608240611';
const degree = ref('');
const status = ref('');
const iconUrl = ref('');
const humidity = ref('');
const rainfall = ref('');

onMounted(() => {
  fetchWeatherAPI();
});

const weatherBackgroundClass = computed(() => {
  if (status.value === 'Clear') {
    return 'bg-clear';
  } else if (status.value === 'Overcast') {
    return 'bg-overcast';
  } else if (status.value === 'Light rain shower') {
    return 'bg-lightrainshower';
  } else if (status.value === 'Partly cloudy') {
    return 'bg-partlycloudy';
  } else {
    return '';
  }
});

const fetchWeatherAPI = async () => {
  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?q=${city.value}&key=${apiKey}`);
    degree.value = response.data.current.temp_c;
    citySelected.value = response.data.location.name;
    status.value = response.data.current.condition.text;
    humidity.value = response.data.current.humidity;
    rainfall.value = response.data.current.precip_mm;
    iconUrl.value = `http:${response.data.current.condition.icon}`;
    console.log(response.data);
    console.log(degree.value);
  } catch {
    alert('Không tìm thấy');
  }
};
</script>

<style scoped>
.bg-clear {
  background-image: url('./images/clear.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.bg-overcast {
  background-image: url('./images/overcast.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.bg-lightrainshower {
  background-image: url('./images/lightrainshower.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.bg-partlycloudy {
  background-image: url('./images/partlycloudy.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}


.text-shadow {
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}
</style>
