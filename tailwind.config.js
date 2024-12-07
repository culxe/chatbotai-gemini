// tailwind.config.js
const plugin = require("tailwind-scrollbar");

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    // Sesuaikan dengan path file Anda
  ],
  theme: {
    extend: {
      colors: {
        "scrollbar-thumb": "#4a5568", // Warna thumb
        "scrollbar-track": "#1a202c", // Warna track
        "scrollbar-thumb-hover": "#2d3748", // Warna thumb saat hover
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".code-block": {
          backgroundColor: "#000000", // Background abu-abu muda untuk block code
          borderRadius: "8px",
          padding: "10px",
          whiteSpace: "pre-wrap", // Agar kode wrap jika panjang
          wordWrap: "break-word", // Agar kata panjang terpotong
          overflowX: "auto", // Agar horizontal scroll muncul jika kode panjang
          fontFamily: '"Courier New", monospace', // Font monospace untuk kode
          fontSize: "14px",
        },
        pre: {
          margin: "0", // Hilangkan margin default dari tag <pre>
        },
      });
    },
    plugin({ nocompatible: true }),
  ],
};
