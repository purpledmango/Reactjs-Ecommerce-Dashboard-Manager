/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-color": "#0B132B",
        "accent-color": "#5BC0BE",
        "typography-color": "#FFFFFF",
        "primary-color": "#1C2541",
        "secondary-color": "#3A506B"
      }
    },
  },
  plugins: [],
}
