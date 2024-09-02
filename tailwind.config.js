/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,html,js}"],
  theme: {
    extend: {
      colors: {
        'weather-primary': "#aee5e6",
        'weather-secondary': "#19805d",
        'weather-light': "#e8e8e8",
      },
    },
    fontFamily: {
      Montserrat: ["Montserrat, sans-serif"],
    },
    boxShadow: {
      '3xl': '0 0 8px white',
    },
  },
  plugins: [],
}

