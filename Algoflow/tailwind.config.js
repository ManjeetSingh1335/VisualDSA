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
          primary: '#7c3aed',
          secondary: '#6366f1',
          accent: '#a78bfa',
          cyan: '#06b6d4',
          darkBg: '#090b16',
        },
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(124, 58, 237, 0.5)',
        'glow-secondary': '0 0 15px rgba(99, 102, 241, 0.5)',
        'glow-cyan': '0 0 15px rgba(6, 182, 212, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}