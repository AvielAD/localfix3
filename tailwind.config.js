/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@avielad/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'sidebarlx': '20% 1fr',
        'sidebar': '1fr',
      },
      gridTemplateRows:{
        'headerlx': '6% 1fr',
        'header': '6% 1fr'
      }
    },
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      primary: colors.blue,
      secondary: colors.gray, 
      warning: colors.orange,
      danger: colors.red,
      success: colors.green,
      theme1: colors.purple,
      theme2: colors.indigo,
      theme3: colors.orange,
      theme4: colors.red,
      theme5: colors.orange,
      theme6: colors.green,
      theme7: colors.black
    }
  },
  plugins: [],
}

