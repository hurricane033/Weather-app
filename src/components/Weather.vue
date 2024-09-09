<template>
    <main class="flex h-fit w-4/5 self-center">
        <a href="/detailed" class="w-full">
        <div v-if="weatherData"
            class="hover:shadow-3xl border-b-2 border-opacity-40 border-weather-light rounded-md flex flex-row p-4 w-full items-center justify-between dark:text-weather-light">
            <div class="flex flex-row items-center gap-2">
                <div>
                    <p>{{ weatherData.location.name }}</p>
                    <p class="text-xs">{{ weatherData.location.country }}</p>
                </div>
                <img :src="weatherData.current.condition.icon" alt="Weather icon" width="40" />
            </div>
            <p class="text-xl">{{ formattedTemperature('current') }}°{{ unit }}</p>
        </div>
    </a>
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
import { forDays } from '@/services/api';

const unit = ref('C');

export const formattedTemperature = (type, forDayId) => {
    return computed(() => {
        const isCelsius = unit.value === 'C';
        switch(type) {
            case 'current':
                return isCelsius ? Math.round(weatherData.value.current.temp_c) : Math.round(weatherData.value.current.temp_f);
            case 'feelsLike':
                return isCelsius ? Math.round(weatherData.value.current.feelslike_c) : Math.round(weatherData.value.current.feelslike_f);
            case 'max':
                return isCelsius ? Math.round(weatherData.value.forecast.forecastday[forDayId].day.maxtemp_c) : Math.round(weatherData.value.forecast.forecastday[forDayId].day.maxtemp_f);
            case 'min':
                return isCelsius ? Math.round(weatherData.value.forecast.forecastday[forDayId].day.mintemp_c) : Math.round(weatherData.value.forecast.forecastday[forDayId].day.mintemp_f);
            default:
                return null;
        }
    });
};



export function toggleUnit() {
    unit.value = unit.value === 'C' ? 'F' : 'C';
    swal("Success", "The temperature unit is changed succesfully!", "success");
};
</script>
