<template>
    <header class="top-0 sticky h-16 bg-white/30 backdrop-blur-xl shadow-3xl">
        <nav class="flex flex-row px-10 justify-between items-center opacity-80 text-weather-secondary">
            <div class="flex flex-row items-center">
                <span class="material-symbols-outlined text-4xl  m-2">emoji_nature</span>
                <RouterLink :to="{name: 'home'}" class="text-2xl">Weather Forecast</RouterLink>
            </div>
            <span class="material-symbols-outlined cursor-pointer" @click="isDark">dark_mode</span>
        </nav>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {};
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