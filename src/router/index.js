import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Weather from '@/components/Weather.vue'
import DetailedWeather from '../views/DetailedWeather.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/weather',
      name: 'weather',
      component: Weather
    },
    {
      path: '/detailed',
      name: 'detailed',
      component: DetailedWeather
    },
  ]
})

export default router
