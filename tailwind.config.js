/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: "class" means dark styles activate when <html> has class="dark"
  // The alternative is "media" which follows the OS setting automatically
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
