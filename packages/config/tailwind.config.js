module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fafafa",
        secondary: "#f0f0f0",
        tprimary: "#000000",
        tsecondary: "#000000",
      },
    },
  },
  plugins: [],
};
