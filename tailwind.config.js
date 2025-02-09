/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Ensure your components are inside src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
