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
        secondary: '#3366FF',
        accent: '#66CCCC',
      }
    },
  },
  plugins: [],
}