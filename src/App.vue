<template>
  <div 
  class="flex flex-col h-screen font-Montserrat opacity-80 bg-gradient-to-b shadow-inner from-weather-primary to-weather-secondary dark:from-weather-sdark dark:to-weather-pdark">
    <SiteNavigation />
    <RouterView />
  </div>
</template>

<script setup>
import SiteNavigation from './components/SiteNavigation.vue';
import { RouterView } from 'vue-router';
</script>

