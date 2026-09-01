/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/scripts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Ivory & Ink — Warm Clinical" system (see REDESIGN-NOTES.md for contrast math)
        paper: '#FAF7F1',      // page canvas — warm bone white (calm, clinical, human)
        surface: '#FFFFFF',    // cards / panels / form — clean-room crispness
        surfaceAlt: '#F1EDE3', // tinted panels, footer — quiet depth
        ink: '#2B2822',        // primary text — warm near-black, 13.74:1 on paper
        inkDim: '#5C564C',     // secondary text — 6.79:1 on paper
        inkFaint: '#716B5F',   // micro-labels/captions — 4.95:1 on paper
        accent: '#8A2F52',     // brand raspberry — links/buttons/focus, 7.53:1 on paper
        accentDeep: '#6E2340', // hover/pressed accent
        accentTint: '#F7E9EE', // soft accent washers
        line: '#E6DFD3',       // hairlines, dividers, borders
        dark: '#17140F',       // hero scrim base, lightbox chrome
        success: '#18794E',    // form success (on white, 5.41:1)
        error: '#A61B1B',      // form error (on white, 7.52:1)
        white: '#FFFFFF',
        black: '#000000',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(43, 40, 34, 0.05), 0 6px 20px rgba(43, 40, 34, 0.06)',
        cardHover: '0 2px 4px rgba(43, 40, 34, 0.06), 0 12px 32px rgba(43, 40, 34, 0.10)',
      },
    },
  },
  plugins: [],
}
