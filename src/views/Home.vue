<template>
    <main class="flex h-dvh my-16 w-4/5 self-center">
        <div class="flex flex-col shadow-3xl h-fit lg:mx-16 w-full p-4 rounded-lg backdrop-blur-xl items-center justify-between">
        <form class="flex w-full">
            <div class="w-full">
                <label for="location" class="text-xs ps-2 opacity-70">Location</label>
                <input id="location" v-model="searchQuery.query" @input="handleSearch"
                    class="w-full px-4 py-1 rounded-lg focus:outline-0 bg-transparent border-b-2 border-weather-primary active:outline-0 focus:shadow-3xl hover:shadow-3xl placeholder-black placeholder-opacity-50"
                    placeholder="Search for a location...">
            </div>
            <button type="button" class="w-6 h-6 mt-7 mx-4 hover:text-weather-light">
                <span class="material-symbols-outlined">search</span></button>

        </form>
        <div class="mt-4">
            <button v-for="place in searchQuery.results" :key="place.id"
                class="w-full py-2 mt-2 text-sm rounded-md px-4 bg-transparent active:outline-0 hover:shadow-3xl">
                {{ place.name }}, {{ place.region }}, {{ place.country }}
            </button>
        </div>
    </div>


    </main>
</template>



<script setup>
import { reactive } from 'vue';

const searchQuery = reactive({
    query: '',
    timeout: null,
    results: null
});

const handleSearch = async () => {
    if (searchQuery.query !== '') {
        clearTimeout(searchQuery.timeout);

        searchQuery.timeout = setTimeout(async () => {
            try {
                const res = await fetch(`api=${searchQuery.query}`);
                //insert api
                const data = await res.json();
                searchQuery.results = data;
                console.log(data)
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }, 500);
    }
    else {
        searchQuery.results = null;
    }
};
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