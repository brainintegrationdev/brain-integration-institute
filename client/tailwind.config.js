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
        'dark-green': "#2B663D",
        'blue': '#4F72AF',
        'dark-gray': "#676767",
        'red': "#B32C36",
        'light-gray': "#B7B7B7"
      }, 
      dropShadow: {
        'md': '0 4px 4px rgba(0, 0, 0, 0.25)',
     
    },
     
    },
  },
  plugins: [],
}