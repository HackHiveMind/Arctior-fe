/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'ark-purple': '#2D1B33', // Movul închis de fundal
        'ark-purple-light': '#3D2844',
        'ark-gold': '#C19A6B',   // Auriul pentru accente
      },
    },
  },
  plugins: [],
}
