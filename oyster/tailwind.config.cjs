const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        'sans': ['"PT Sans"', 'sans-serif'],
      },
    },
    colors: {
      'beige': '#E5EFC1',
      'greenish': '#A2D5AB',
      'blueish': '#39AEA9',
    }
  },

  plugins: [],
};

module.exports = config;
