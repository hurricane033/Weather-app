<template>
    <header class="flex items-center justify-center top-0 sticky h-16 bg-white/30 dark:bg-weather-sdark backdrop-blur-xl shadow-3xl">
        <nav class="flex w-full px-2 justify-between items-center opacity-80 text-weather-secondary dark:text-weather-light">
            <div class="flex flex-row items-center">
                <span class="material-symbols-outlined min-[432px]:text-4xl  m-2">emoji_nature</span>
                <RouterLink :to="{ name: 'home' }" class="min-[432px]:text-2xl text-lg">Weather Forecast</RouterLink>
            </div>
            <div class="h-6">
                <span v-if="settingsOpen" class="material-symbols-outlined cursor-pointer" @click="toggleDark()">dark_mode</span>
                <span v-if="settingsOpen" class="material-symbols-outlined cursor-pointer min-[400px]:px-2" @click="toggleUnit">device_thermostat</span>
                <span class="material-symbols-outlined cursor-pointer" 
                :style="{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.3s ease' }" @click="settingsTrigger()">settings</span>
                
            </div>
        </nav>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';
import { toggleUnit } from './Weather.vue';
import { useDark, useToggle } from '@vueuse/core';


const isDark = useDark();
const toggleDark = useToggle(isDark);


let settingsOpen = ref(false);
const rotation = computed(() => (settingsOpen.value ? 90 : 0));

function settingsTrigger () {
    settingsOpen.value = !settingsOpen.value;
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