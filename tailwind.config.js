/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#CCFF00', // Radioactive Lime
        secondary: '#FF00FF', // Electric Magenta
        tertiary: '#00F0FF', // Cyan Glitch
        background: '#050505', // Obsidian
        surface: '#121212', // Dark Room
        elevated: '#1A1A1A', // Carbon
      },
    },
  },
  plugins: [],
};
