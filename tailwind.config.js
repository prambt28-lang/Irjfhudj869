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
        // Vazirmatn leads both stacks: every heading and label is Persian now.
        sans: ['Vazirmatn', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Vazirmatn', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Latin-only brand lockup keeps the original Montserrat identity.
        brand: ['Montserrat', 'Vazirmatn', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6.4vw, 5.25rem)', { lineHeight: '1.16', letterSpacing: '0' }],
        'display-lg': ['clamp(1.95rem, 4.3vw, 3.4rem)', { lineHeight: '1.24', letterSpacing: '0' }],
        'display-md': ['clamp(1.55rem, 2.9vw, 2.3rem)', { lineHeight: '1.3', letterSpacing: '0' }],
        'display-sm': ['clamp(1.2rem, 1.8vw, 1.5rem)', { lineHeight: '1.45', letterSpacing: '0' }],
        // Persian script is cursive: letter-spacing separates joined letters, so it stays near zero.
        label: ['0.72rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
      },
      borderRadius: {
        card: '14px',
        panel: '20px',
      },
      boxShadow: {
        soft: '0 20px 50px -32px rgba(11, 36, 71, 0.35)',
        lift: '0 34px 70px -34px rgba(11, 36, 71, 0.45)',
        nav: '0 10px 30px -24px rgba(11, 36, 71, 0.45)',
        // Depth scale: layered, navy-tinted shadows so surfaces read as lit, stacked planes.
        'depth-sm': '0 1px 2px -1px rgba(6, 21, 48, 0.12), 0 8px 18px -12px rgba(6, 21, 48, 0.28)',
        depth:
          '0 2px 4px -2px rgba(6, 21, 48, 0.14), 0 18px 36px -22px rgba(6, 21, 48, 0.34), 0 40px 60px -50px rgba(6, 21, 48, 0.3)',
        'depth-lg':
          '0 4px 8px -4px rgba(6, 21, 48, 0.16), 0 28px 50px -26px rgba(6, 21, 48, 0.34), 0 60px 90px -60px rgba(6, 21, 48, 0.36)',
        'depth-xl':
          '0 6px 14px -6px rgba(6, 21, 48, 0.18), 0 44px 80px -36px rgba(6, 21, 48, 0.38), 0 90px 120px -80px rgba(6, 21, 48, 0.4)',
        'inner-depth': 'inset 0 2px 4px -2px rgba(6, 21, 48, 0.12), inset 0 -1px 0 rgba(255, 255, 255, 0.6)',
        'rim-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.65), 0 18px 36px -24px rgba(6, 21, 48, 0.3)',
        glow: '0 0 0 4px rgba(197, 160, 112, 0.22)',
        press: 'inset 0 2px 6px -2px rgba(6, 21, 48, 0.35)',
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
        'plane-in': {
          from: { opacity: '0', transform: 'translateY(26px) scale(0.97)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.85s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1.1s ease-out both',
        'hero-zoom': 'hero-zoom 1.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'sheet-in': 'sheet-in 0.34s cubic-bezier(0.22, 1, 0.36, 1) both',
        'plane-in': 'plane-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
