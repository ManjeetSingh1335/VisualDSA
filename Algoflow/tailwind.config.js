/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#06b6d4',
          secondary: '#0077b6',
          accent: '#22d3ee',
          cyan: '#06b6d4',
          darkBg: '#0a192f',
        },
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(6, 182, 212, 0.5)',
        'glow-secondary': '0 0 15px rgba(0, 119, 182, 0.5)',
        'glow-cyan': '0 0 15px rgba(6, 182, 212, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}