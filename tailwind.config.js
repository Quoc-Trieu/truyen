// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        bounce : {
          '0%, 100%': { transform: 'translateY(-100%)'  },
          '50%': { transform: 'translateY(50%)' },
        }
      },
      boxShadow: {
        '3xl': '0px 3px 8px rgba(0, 0, 0, 0.24)',
      },
      colors: {
        'primary': '#FF1393',
      },
      borderRadius: {
        'default': '10px',
      },
      hover: ['disabled'],
      
    },
  },
  plugins: [],
};
