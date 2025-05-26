// client/tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"], // Keep this as your project uses it
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // We'll keep a few essential colors from your theme for testing,
      // especially those used in your global CSS (index.css)
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        // You can add one very simple custom color for a direct test
        // 'my-custom-red': '#ff0000',
      },
    },
  },
  plugins: [], // Remove ALL plugins for this test
};

module.exports = config;