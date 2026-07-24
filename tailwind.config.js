/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark mode
        'dark-bg': '#0F0E0D',
        'dark-surface': '#1C1A18',
        'dark-text': '#F1EDE9',
        'dark-muted': '#A09A94',
        // Light mode
        'light-bg': '#FAF7F2',
        'light-surface': '#FFFFFF',
        'light-text': '#1A1815',
        'light-muted': '#6B6460',
        // Accents
        terracotta: '#E07A5F',
        'terracotta-light': '#C9603F',
        'terracotta-hover': '#d4694e',
        sage: '#81B29A',
        'sage-light': '#5C8A72',
        'sage-hover': '#6ea085',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
