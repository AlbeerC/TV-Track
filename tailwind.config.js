/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom colors from your SCSS variables
      colors: {
        'main': '#a40990', // Your main color
        'primary': '#a40990', // Alias for main color
        'black': '#000000',
        'white': '#ffffff',
      },
      
      // Custom fonts from your SCSS variables
      fontFamily: {
        'title': ['"Inter"', 'system-ui', 'sans-serif'],
        'text': ['"Inter"', 'system-ui', 'sans-serif'],
      },
      
      // Custom breakpoints from your SCSS variables
      screens: {
        'tablet': '768px',
        'pc': '992px',
      },
    },
  },
  plugins: [],
}
