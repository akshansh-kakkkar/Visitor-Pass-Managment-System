/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'gym-orange': '#FF4D1C',
        'gym-dark': '#0A0A0B',
        'gym-gray': '#1A1A1C',
        'gym-light-gray': '#2A2A2C',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'athlete-hero': "url('../assets/athlete.png')",
        'muscular-hero': "url('../assets/muscular-man.png')",
      }
    },
  },
  plugins: [],
}