/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height'
      },
      fontFamily: {
        'gilroy-regular': ['Gilroy-Regular'],
        'gilroy-bold': ['Gilroy-Bold'],
        'gilroy-light': ['Gilroy-Light'],
        'gilroy-black': ['Gilroy-Black'],
        'gilroy-medium': ['Gilroy-Medium']

      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'primary-dark': '#4F3A92',
        'primary-base': '#6950ba',
        'primary-light': '#F0EBFF',
        'accent-dark': '#D50D8E',
        'accent-base': '#F670C7',
        'accent-light': '#FFC1E9',
        'neutral-dark': '#6F6E6E',
        'neutral-light': '#DCDCDC',
        'neutral-base': '#BDBCBC',
        'primary-text': '#202020',
        'secondary-text': '#7D7D7D',
        'success-dark': '#1f8c30',
        'success-base': '#24AB39',
        'success-light': '#BAF0C3',
        'warning-dark': '#D4930D',
        'warning-base': '#FFB319',
        'warning-light': '#FFE9BC',
        'error-dark': '#B81414',
        'error-base': '#D33030',
        'error-light': '#FFC6C6',
        'white': '#FFFFFF',
      },
      screens: {
        'mobile': '320px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
