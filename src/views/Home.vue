<template>
    <main class="flex my-10 w-4/5 self-center">
        <div
            class="flex flex-col h-fit lg:mx-16 w-full p-4 backdrop-blur-xl items-center justify-between">
            <form class="flex w-full">
                <div class="w-full">
                    <label for="location" class=" dark:text-weather-light sticky text-xs ps-2 opacity-70">Location</label>
                    <input id="location" v-model="searchQuery.query" @input="handleSearch"
                        class="w-full dark:text-weather-light border-opacity-40 px-4 py-1 rounded-lg focus:outline-0 bg-transparent border-b-2 border-weather-primary active:outline-0 focus:shadow-3xl hover:shadow-3xl placeholder-black dark:placeholder-weather-light placeholder-opacity-50"
                        placeholder="Search for a location...">
                </div>
                <button type="button" class="w-6 h-6 mt-7 mx-4 dark:text-weather-light dark:hover:text-weather-secondary hover:text-weather-light" @click="getWeather(searchQuery.results[0].id)">
                    <span class="material-symbols-outlined">search</span></button>

            </form>
            <div class="w-full mt-4 py-2 max-h-36 overflow-y-auto overflow-x-hidden">
                <button v-for="place in searchQuery.results" :key="place.id" @click="getWeather(place.id)"
                    class="w-full dark:text-weather-light py-2 text-sm bg-transparent active:outline-0 hover:scale-110 items-center">
                    {{ place.name }}, {{ place.country }}
                </button>
            </div>
        </div>
    </main>
    
    <Weather :weatherData="weatherData" />

</template>

<script setup>
import Weather from '@/components/Weather.vue';
import { searchQuery, weatherData } from '@/services/api';
import { getWeather } from '@/services/api';
import { handleSearch } from '@/services/api';

</script>

<style scoped>
.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 300,
        'GRAD' 0,
        'opsz' 40;
}
</style>