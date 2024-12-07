// tailwind.config.js
const plugin = require("tailwind-scrollbar");

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "scrollbar-thumb": "#4a5568",
        "scrollbar-track": "#1a202c",
        "scrollbar-thumb-hover": "#2d3748",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".code-block": {
          // backgroundColor: "#333333",
          borderRadius: "8px",
          padding: "10px",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          overflowX: "auto",
          fontFamily: '"Courier New", monospace',
          fontSize: "14px",
        },
        pre: {
          margin: "0",
        },
      });
    },
    plugin({ nocompatible: true }),
  ],
};
