<template>
    <main class="flex h-dvh w-4/5 self-center">
        <a href="/detailed" class="w-full lg:mx-16"><div v-if="weatherData"
            class="flex h-fit w-full rounded-lg backdrop-blur-xl items-center">
            <div class="hover:shadow-3xl border-b-2 border-opacity-40 border-weather-light rounded-md flex flex-row p-4 w-full items-center justify-between dark:text-weather-light">
                <div class="flex flex-row items-center gap-2">
                    <div>
                        <p>{{ weatherData.location.name }}</p>
                        <p class="text-xs">{{ weatherData.location.country }}</p>
                    </div>
                    <img :src="weatherData.current.condition.icon" alt="Weather icon" width="40" />
                </div>
                <p class="text-xl">{{ formattedTemperature }}°{{ unit }}</p>
            </div>
        </div></a>
    </main>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';
import { weatherData } from '@/services/api';



const props = defineProps({
    weatherData: {
        type: Object,
        Required: true
    }
});

</script>

<script>
import swal from 'sweetalert';

const unit = ref('C');

const formattedTemperature = computed(() => {
  return unit.value === 'C' ? weatherData.value.current.temp_c : weatherData.value.current.temp_f;
});

export function toggleUnit() {
  unit.value = unit.value === 'C' ? 'F' : 'C';
  swal("Success", "The temperature unit is changed succesfully!", "success");
};
</script>
