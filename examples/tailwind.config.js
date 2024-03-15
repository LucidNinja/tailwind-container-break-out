module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem'
      }
    },
    extend: {
      colors: {
        blue: { DEFAULT: '#10A5E9', light: '#E0F1FE', lightest: '#F0F8FF' }
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwind-container-break-out')]
};
