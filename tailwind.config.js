/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/scripts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#FAFBF9',
        surface: '#F5F7F5', // Neutral soft grey-white, not minty
        primary: '#638263', // Vibrant but sophisticated Sage
        action: '#4A634A',  // Deep Forest accent
        content: '#1A1C1A', // Richer contrast
        black: '#0A0B0A',   // Deep "Charcoal Black" for the footer
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
