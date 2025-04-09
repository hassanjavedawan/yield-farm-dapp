/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'usdt': '#26A17B',
        'cake': '#D1884F',
        'pink': '#EC4899',
      },
    },
  },
  plugins: [],
}
