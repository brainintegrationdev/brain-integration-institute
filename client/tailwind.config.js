/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'libre': ['Frank Ruhle Libre', 'serif'],
        'fira': ['Fira Sans', 'sans-serif'],
        'fenix': ['Fenix', 'serif']
      },
      colors: {
        'gray': '#ECECEC',
        'dark-green': "#2B663D"
      }
     
    },
  },
  plugins: [],
}