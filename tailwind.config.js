/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        textSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'gradient-move': 'gradientMove 15s ease infinite',
        'text-slide-in': 'textSlideIn 2s ease-in-out forwards',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'shine': 'shine 2s linear infinite',
      },
      backgroundImage: {
        'dark-to-light-gray': 'linear-gradient(90deg, #0d0d0d, #1a1a1a)',
        'gradient-border': 'linear-gradient(45deg, rgba(0, 255, 0, 0.5), rgba(0, 0, 255, 0.5))'
      },
      colors: {
        'primary': '#0d0d0d', // Custom color
        'secondary': '#1a1a1a', // Custom color
      },
    },
  },
  plugins: [nextui()],
  darkMode: "class",
};
