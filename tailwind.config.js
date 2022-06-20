const typographyPlugin = require("@tailwindcss/typography");

module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],

  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      backgroundImage: () => ({
        checkbox: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23FCE7F3'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
      }),
    },
  },
  plugins: [typographyPlugin],
};
