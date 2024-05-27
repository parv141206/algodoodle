import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "main-bg": ` linear-gradient( to bottom, rgba(255, 255, 255, 0.955), rgba(255, 255, 255, 0.955)), url("/images/doodle-bg.png");`,
        "main-bg-dark": ` linear-gradient( to bottom, rgba(17, 24 ,39, 0.955), rgba(17, 24 ,39, 0.955)), url("/images/doodle-bg-white.png");`,
      },
    },
  },
  plugins: [],
};
export default config;
