const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "ui-sans-serif", "system-ui"],
        Satisfy: ["Satisfy", "ui-sans-serif", "system-ui"],
        Contastian: ["Constantian", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
});
