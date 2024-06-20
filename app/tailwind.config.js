/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      orange: colors.orange,
      teal: colors.teal,
      red: colors.red,
    },
    extend: {
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [],
};
