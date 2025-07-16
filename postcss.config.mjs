const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {}
  },
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: '#6366F1' } },
      animation: { fade: 'fade 0.4s ease-out' },
      keyframes: { fade: { from: { opacity: 0 }, to: { opacity: 1 } } }
    }
  },
};

export default config;
