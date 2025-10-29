/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'tm-accent': '#7f5af0',
      },
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(127, 90, 240, 0.5)',
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};
