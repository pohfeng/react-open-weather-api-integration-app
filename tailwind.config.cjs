/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'scale-bounce': 'scale-bounce 0.3s linear 1',
      },
      keyframes: {
        'scale-bounce': {
          '0%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1.1)' },
          '80%': { transform: 'scale(0.8)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
