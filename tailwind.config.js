import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fg: colors.emerald,
        bg: colors.stone,
        McS: colors.orange,
        McL: colors.purple,
      },
      fontFamily: {
        katex: ["KaTeX_Main", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};
