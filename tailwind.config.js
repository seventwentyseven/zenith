/** @type {import('tailwindcss').Config} */

main = '230'
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './sections/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        dolphinbanner: 'url(https://seventwentyseven.xyz/banners/4',
        heroBackground: 'url(https://seventwentyseven.xyz/backgrounds/3)'
      },
      spacing: {
        '3px': '3px'
      },
      rotate: {
        full: '360deg'
      },
      height: {
        18: '72px',
        15: '60px'
      },
      borderWidth: {
        px: '1px',
        3: '3px'
      },
      colors: {
        hsl: {
          5: 'hsl(var(--main), 5%, 5%)',
          10: 'hsl(var(--main), 10%, 10%)',
          15: 'hsl(var(--main), 15%, 15%)',
          20: 'hsl(var(--main), 20%, 20%)',
          25: 'hsl(var(--main), 25%, 25%)',
          30: 'hsl(var(--main), 30%, 30%)',
          35: 'hsl(var(--main), 35%, 35%)',
          40: 'hsl(var(--main), 40%, 40%)',
          45: 'hsl(var(--main), 45%, 45%)',
          50: 'hsl(var(--main), 50%, 50%)',
          55: 'hsl(var(--main), 55%, 55%)',
          60: 'hsl(var(--main), 60%, 60%)',
          65: 'hsl(var(--main), 65%, 65%)',
          70: 'hsl(var(--main), 70%, 70%)',
          75: 'hsl(var(--main), 75%, 75%)',
          80: 'hsl(var(--main), 80%, 80%)',
          85: 'hsl(var(--main), 85%, 85%)',
          90: 'hsl(var(--main), 90%, 90%)',
          95: 'hsl(var(--main), 95%, 95%)',

          '30-15': 'hsl(var(--main), 30%, 15%)',
          '25-30': 'hsl(var(--main), 25%, 30%)',
          '25-10': 'hsl(var(--main), 25%, 10%)',
          '15-25': 'hsl(var(--main), 15%, 25%)',
          '15-20': 'hsl(var(--main), 15%, 20%)',
          '15-25': 'hsl(var(--main), 15%, 25%)',
          '15-10': 'hsl(var(--main), 15%, 10%)',
          '10-30': 'hsl(var(--main), 10%, 30%)',
          '10-25': 'hsl(var(--main), 10%, 25%)',
          '10-20': 'hsl(var(--main), 10%, 20%)',
          '10-15': 'hsl(var(--main), 10%, 15%)'
        }
      },
      fontFamily: {
        comfortaa: ['Comfortaa', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        torus: ['Torus', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('flowbite/plugin')]
}
