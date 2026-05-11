/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#FAFBF9',
        surface: '#F1F4F1',
        primary: '#6D7A6D', // Darkened for accessibility (was #A3B1A3)
        action: '#5D6B5D',  // Darkened for accessibility (was #7D8F7D)
        content: '#2F352F',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
