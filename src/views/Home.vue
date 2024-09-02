<template>
    <main class="flex h-dvh my-16 w-4/5 self-center justify-center">
        <form class="flex shadow-3xl h-fit lg:mx-16 w-full p-4 rounded-lg backdrop-blur-xl items-center justify-between">
            <div class="w-full">
                <label for="location" class="text-xs ps-2 opacity-70">Location</label>
                <input id="location" class="w-full px-4 py-1 rounded-lg focus:outline-0 bg-transparent border-b-2 border-weather-light active:outline-0 focus:shadow-3xl hover:shadow-3xl placeholder-black placeholder-opacity-50" placeholder="Search for a location...">
            </div>
            <button type="button" class="w-6 h-6 mt-5 mx-4 hover:text-weather-light">
                <span class="material-symbols-outlined">search</span></button>
        </form>

    </main>
</template>

<script>
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