module.exports = {
  content: [
    "../../apps/**/*.{js,jsx,ts,tsx}",
    "../../packages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          light: "#fafafa",
          dark: "#000000",
        },
        "secondary": {
          light: "#f0f0f0",
          dark: "#000000",
        },
        "maximum-blue-purple": "#acb6e5",
        "turquoise-blue": "#86fde8",
      },
    },
  },
  plugins: [],
};
// linear-gradient(to bottom right,#acb6e5,#86fde8)
