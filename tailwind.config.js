/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core brand palette — deep navy, restrained champagne accent, warm neutral surfaces.
        navy: {
          DEFAULT: '#0B2447',
          600: '#12305A',
          700: '#0E2649',
          800: '#0A1E3F',
          900: '#061530',
        },
        ink: {
          DEFAULT: '#151C25',
          muted: '#5C6772',
          soft: '#8B94A0',
        },
        champagne: {
          DEFAULT: '#C5A070',
          light: '#DCC6A2',
          dark: '#A9814B',
          tint: '#F4EDE2',
        },
        ivory: '#FBF9F5',
        mist: '#F3F5F7',
        line: '#E6E3DC',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6.4vw, 5.25rem)', { lineHeight: '1.02', letterSpacing: '-0.022em' }],
        'display-lg': ['clamp(1.95rem, 4.3vw, 3.4rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.55rem, 2.9vw, 2.3rem)', { lineHeight: '1.14', letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.2rem, 1.8vw, 1.5rem)', { lineHeight: '1.24', letterSpacing: '-0.01em' }],
        label: ['0.7rem', { lineHeight: '1', letterSpacing: '0.26em' }],
      },
      borderRadius: {
        card: '14px',
        panel: '20px',
      },
      boxShadow: {
        soft: '0 20px 50px -32px rgba(11, 36, 71, 0.35)',
        lift: '0 34px 70px -34px rgba(11, 36, 71, 0.45)',
        nav: '0 10px 30px -24px rgba(11, 36, 71, 0.45)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'hero-zoom': {
          from: { transform: 'scale(1.05)' },
          to: { transform: 'scale(1)' },
        },
        'sheet-in': {
          from: { opacity: '0', transform: 'translateY(-12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.85s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1.1s ease-out both',
        'hero-zoom': 'hero-zoom 1.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'sheet-in': 'sheet-in 0.34s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
