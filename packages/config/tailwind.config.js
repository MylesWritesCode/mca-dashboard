module.exports = {
  content: [
    "../../apps/**/*.{js,jsx,ts,tsx}",
    "../../packages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#fafafa",
          dark: "#000000",
        },
        secondary: {
          light: "#f0f0f0",
          dark: "#000000",
        },
      },
    },
  },
  plugins: [],
};
