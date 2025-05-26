// client/postcss.config.cjs
module.exports = {
  plugins: {
    tailwindcss: { config: './tailwind.config.cjs' }, // <-- Make sure this path is correct
    autoprefixer: {},
  },
};