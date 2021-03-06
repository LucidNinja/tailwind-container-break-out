module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      colors: {
        blue: { DEFAULT: '#10A5E9', light: '#E0F1FE', lightest: '#F0F8FF' }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwind-container-break-out')]
};
