/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Alumni Sans', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}