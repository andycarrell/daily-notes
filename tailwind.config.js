const typographyPlugin = require("@tailwindcss/typography");

module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [typographyPlugin],
};
