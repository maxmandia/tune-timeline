/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "input-txt": "var(--input-txt)",
        "input-bg": "var(--input-bg)",
      },
    },
  },
  plugins: [],
};
