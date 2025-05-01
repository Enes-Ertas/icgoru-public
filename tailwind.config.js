/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-home":
          "linear-gradient(to bottom right, #CAC9C8 0%, #CCCAC8 30%, #C1BAAE 60%, #BAB1A3 100%)",
        "gradient-analysis":
          "linear-gradient(to bottom right, #F9F8F7 0%, #F7F6F5 30%, #EFEEEA 60%, #ECE8E4 100%)",
      },
      colors: {
        // Bej tonları — istediğin hex’i koyabilirsin
        "beige-light": "#F5EAE0",
        "beige-dark": "#E3D7CF",
      },
    },
  },
  plugins: [],
};
