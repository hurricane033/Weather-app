<template>
    <!--Location-->
    <div class="mt-4 mx-4 border-weather-light rounded-md flex flex-row p-4 items-center dark:text-weather-light">
        <div class="w-full flex flex-col items-center gap-1">
            <div class="self-start flex gap-2">
                <p>{{ weatherData.location.name }}</p>
                <span class="material-symbols-outlined">location_on</span>
            </div>

            <!--Temperature-->
            <div
                class=" px-4 py-2 rounded-lg max-[432px]:mt-4 max-[432px]:self-start flex items-center gap-2 hover:bg-weather-primary hover:bg-opacity-50">
                <div>
                    <p class="text-5xl my-2">{{ formattedTemperature('current') }}°</p>
                    <p>{{ weatherData.current.condition.text }}</p>
                    <p class="text-xs">Feels Like {{ formattedTemperature('feelsLike') }}°</p>
                </div>
                <img class="self-start" :src="weatherData.current.condition.icon" alt="Weather icon" width="70" />
            </div>

            <!--3 Day Forecast-->
            <div class="w-full mt-2">
                <!-- don't forget to add C to F -->
                <div v-for="forDay in forDays"
                    class="flex my-1 py-2 items-center justify-between w-full bg-weather-primary bg-opacity-50 px-4 rounded-2xl hover:bg-opacity-70">
                    <p>{{ forDay.title }}</p>
                    <div class="flex gap-4 items-center">
                        <img class="self-start" :src="weatherData.forecast.forecastday[forDay.id].day.condition.icon"
                            alt="Weather icon" width="30" />
                        <p> {{ formattedTemperature('max', forDay.id) }}°</p>
                        <p> {{ formattedTemperature('min', forDay.id) }}°</p>
                    </div>
                </div>


                <!--UV-->
            </div>
            <div class="flex w-full gap-2">
                <div
                    class="flex h-16 justify-between mt-4 w-1/2 py-2 px-4 rounded-2xl items-center self-start bg-weather-primary bg-opacity-30 hover:bg-opacity-50">
                    <div>
                        <div class="flex gap-1 text-xs items-center">
                            <span class="material-symbols-outlined text-xs">wb_sunny</span>
                            <p>UV Index</p>
                        </div>
                        <p class="text-lg mt-2">{{ uvScale(weatherData.current.uv) }}</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <p class="text-3xl text-end">{{ weatherData.current.uv }}</p>
                    </div>
                </div>

                <!--Humidity-->
                <div
                    class="flex h-16 justify-between mt-4 w-1/2 py-2 px-4 rounded-2xl self-start bg-weather-primary bg-opacity-30 hover:bg-opacity-50">
                    <div>
                        <div class="flex gap-1 text-xs items-center">
                            <span class="material-symbols-outlined text-xs">humidity_percentage</span>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <p class="text-3xl text-end">{{ weatherData.current.humidity }}%</p>
                    </div>
                </div>
            </div>


            <!--Sun Graph-->
            <div
                class="flex mt-2 h-16 justify-between w-full  bg-weather-primary bg-opacity-30 py-2 px-4 rounded-2xl hover:bg-opacity-50">
                <div class="flex gap-1 text-xs items-center">
                    <span class="material-symbols-outlined text-xs">wb_sunny</span>
                    <p>Sunrise</p>
                </div>

                <div class="flex w-full mx-4">
                    <div :style="{ width: graphWidth2 }"
                        class="bg-weather-light bg-opacity-60 w-full rounded-l-full h-1 self-center">
                    </div>

                    <div :style="{ width: graphWidth1 }" class="bg-black bg-opacity-60 w-full rounded-r-full h-1 self-center">
                        <span id="sun"
                            class="-translate-y-4 text-yellow-500 -translate-x-4 material-symbols-outlined text-3xl">clear_day</span>
                    </div>
                </div>

                <div class="flex gap-1 text-xs items-center">
                    <span class="material-symbols-outlined text-xs">wb_twilight</span>
                    <p>Sunset</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            sunriseTime: weatherData.value.forecast.forecastday[0].astro.sunrise,
            sunsetTime: weatherData.value.forecast.forecastday[0].astro.sunset,
            currentTime: weatherData.value.location.localtime,
        }
    },

    computed: {
        sunriseMinutes() {
            return this.convertTimeToMinutes(this.sunriseTime);
        },
        sunsetMinutes() {
            return this.convertTimeToMinutes(this.sunsetTime);
        },
        currentMinutes() {
            return this.convertCurrentTimeToMinutes(this.currentTime);
        },
        dayLength() {
            return this.sunsetMinutes - this.sunriseMinutes;
        },
        graphWidthPercentage() {
            return ((this.sunsetMinutes - this.currentMinutes) / this.dayLength) * 100;
        },
        graphWidth1() {
            const graphWidthPercentage = Math.round(this.graphWidthPercentage);
            return graphWidthPercentage > 0 ? `${graphWidthPercentage}%` : '100%';
        },
        graphWidth2() {
            const graphWidthPercentage = this.graphWidthPercentage;
            const graphWidth2 = Math.round(100 - graphWidthPercentage);
            return graphWidthPercentage > 0 ? `${graphWidth2}%` : '0%';
        }

    },
    methods: {
        convertTimeToMinutes(time) {
            const [timePart, period] = time.split(' ');
            const [hours, minutes] = timePart.split(':').map(Number);

            let totalMinutes = hours * 60 + minutes;
            if (period === 'PM' && hours < 12) {
                totalMinutes += 12 * 60;
            }
            if (period === 'AM' && hours === 12) {
                totalMinutes -= 12 * 60;
            }

            return totalMinutes;
        },

        convertCurrentTimeToMinutes(datetime) {
            const [date, time] = datetime.split(' ');
            const [hours, minutes] = time.split(':').map(Number);

            let totalMinutes = hours * 60 + minutes;

            return totalMinutes;
        },
    },

};

</script>
<script setup>
import { computed } from 'vue';
import { weatherData } from '@/services/api';
import { formattedTemperature } from '@/components/Weather.vue';
import { forDays } from '@/services/api';


const props = defineProps({
    weatherData: {
        type: Object,
        Required: true
    }
});

function uvScale(uv) {
    if (uv < 3) {
        return ("Low");
    }
    else if (uv < 6) {
        return ("Moderate")
    }
    else if (uv < 8) {
        return ("High")
    }
    else {
        return ("Very High")
    }
}

</script>

<style scoped>
.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 300,
        'GRAD' 0,
        'opsz' 40;
}

#sun {
    font-variation-settings:
        'FILL' 1,
        'wght' 300,
        'GRAD' 0,
        'opsz' 40;
}
</style>