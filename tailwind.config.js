/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'raise-once': 'raise-once 1s'
      },
      keyframes: {
        translate: {
          '-10': '-10px',
        },
        transitionDuration: {
          '200': '500ms',
        },
      }
    },
  },
  plugins: [],
}