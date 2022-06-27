/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'Vazir': ['"Vazir"', 'serif'] // Ensure fonts with spaces have " " surrounding it.
    },
    extend: {},
  },
  plugins: [],
}