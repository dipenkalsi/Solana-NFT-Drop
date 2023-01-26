/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        type: 'type 2.7s ease-out .8s infinite alternate both',
      },
      fontFamily:{
        'silkscreen':["Silkscreen, cursive"]
      },
      backgroundImage: {
        'hero': "url('https://i.ytimg.com/vi/cvh_IFNp9YU/maxresdefault.jpg')",
        'hero2':'url(https://i.pinimg.com/originals/e8/f1/85/e8f185f1f410690ab9d14a2984b7e383.jpg)',
        'hero3':'url(https://wallpaperaccess.com/full/1719859.jpg)',
      },
      keyframes: {
        type: {
          '0%': { transform: 'translateX(0ch)' },
          '5%, 10%': { transform: 'translateX(4ch)' },
          '15%, 20%': { transform: 'translateX(8ch)' },
          '25%, 30%': { transform: 'translateX(12ch)' },
          '35%, 40%': { transform: 'translateX(16ch)' },
          '45%, 50%': { transform: 'translateX(20ch)' },
          '55%, 60%': { transform: 'translateX(24ch)' },
          '65%, 70%': { transform: 'translateX(28ch)' },
          '75%, 80%': { transform: 'translateX(32ch)' },
          '85%, 90%': { transform: 'translateX(36ch)' },
          '95%, 100%': { transform: 'translateX(40ch)' },
        },
      },
    },
  },
  plugins: [],
}