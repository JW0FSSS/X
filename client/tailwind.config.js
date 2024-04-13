/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#FF9900',
        secondary: '#3f9cf3',
        accent: '#66CCCC',
      }
    },
  },
  plugins: [],
}