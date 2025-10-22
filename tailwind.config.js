/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        productSans: ['ProductSans']
      },
      colors: {
        "drawer-primary-blue-800":"#1881b7",
        "drawer-primary-icon": "#97d1ef"
      }
    },
  },
  plugins: [ require("daisyui")],
}
