module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  variants: {
    extend: {
      tableLayout: ['hover', 'focus'],
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  corePlugins: {
    // preflight: false,
  }
}
