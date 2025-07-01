/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        primaryLight: "#60a5fa",
        background: "#f9fafb",
        text: "#22223b",
        label: "#6b7280",
      },
    },
  },
  plugins: [],
}