const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        'sans': ['"PT Sans"', 'sans-serif'],
      },
      colors: {
        'beige': '#E5EFC1',
        'greenish': '#A2D5AB',
        'greenish-dark': '#8ebd97',
        'blueish': '#39AEA9',
        'blueish-dark': '#319d97',
        'whiteish': '#FDF6EC',
        'pinkish': '#FFA8A8',
      }
    },
  },

  plugins: [],
};

module.exports = config;
