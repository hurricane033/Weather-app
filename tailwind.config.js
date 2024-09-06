/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"class",
  content: ["./src/**/*.{vue,html,js}"],
  theme: {
    extend: {
      colors: {
        'weather-primary': "#aee5e6",
        'weather-secondary': "#19805d",
        'weather-light': "#e8e8e8",

        'weather-pdark': "#314f4f",
        'weather-sdark': "#033826",
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

