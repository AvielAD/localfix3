/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'dashboardcolumns': '250px 1fr'
      },
      gridTemplateRows:{
        'dashboardtop': '50px auto'
      }
    },
  },
  plugins: [],
}

