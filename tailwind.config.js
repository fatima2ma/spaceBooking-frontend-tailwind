/** @type {import('tailwindcss').Config} */
// const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'custome-dark-gray': '#161e2f',
      },
      // fontFamily:{
      //   sans: ["nunito", ...defaultTheme.fontFamily.sans],
      // },
    },
  },
  plugins: [],
  experimental:{
    applyComplexClasses: true,
  },
}
