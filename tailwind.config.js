/** @type {import('tailwindcss').Config} */
import animatedTailwind  from 'tailwindcss-animated'
export default {
  content: [
	"./index.html",
	"./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
	extend: {
    fontFamily: {
      quicksand: ["Quicksand", "sans-serif"],
      alexandria: ["Alexandria", "sans-serif"], 
      amatic: ["Amatic SC", "sans-serif"],
      asimovian: ["Asimovian", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      kalam: ["Kalam", "sans-serif"],
      manrope: ["Manrope", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
      nunito: ["Nunito", "sans-serif"],
      pacifico: ["Pacifico", "sans-serif"],
      plusJakarta: ["Plus Jakarta Sans", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      spline: ["Spline Sans", "sans-serif"],
      storyScript: ["Story Script", "sans-serif"],
    },
  },
  },
  plugins: [
    animatedTailwind
  ],
}
