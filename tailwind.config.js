module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '440px',
      md: '868px',
      lg: '1080px',
      xl: '1280px',
      '2xl': '1280px'
    },
    extend: {}
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms')({
      strategy: 'class'
    })
  ]
};
