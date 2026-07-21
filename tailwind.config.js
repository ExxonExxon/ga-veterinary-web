/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/scripts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: '#0D0F0D',
        surface: '#171A17',
        surfaceLight: '#1E221E',
        primary: '#A8D5A8',
        primaryDim: '#94BD94',
        action: '#5D7D5D',
        content: '#E4E7E2',
        contentDim: '#AFB5AC',
        contentMuted: '#7D847A',
        black: '#050605',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
