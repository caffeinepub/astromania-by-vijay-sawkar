/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cinzel', 'Georgia', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'Georgia', 'serif'],
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        border: 'oklch(var(--border) / <alpha-value>)',
        input: 'oklch(var(--input) / <alpha-value>)',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'oklch(0.78 0.14 75)',
          foreground: 'oklch(0.12 0.02 255)',
          light: 'oklch(0.88 0.10 80)',
          dark: 'oklch(0.60 0.14 70)',
        },
        secondary: {
          DEFAULT: 'oklch(0.18 0.04 255)',
          foreground: 'oklch(0.90 0.02 85)',
        },
        destructive: {
          DEFAULT: 'oklch(0.55 0.22 25)',
          foreground: 'oklch(0.97 0.01 85)',
        },
        muted: {
          DEFAULT: 'oklch(0.18 0.03 255)',
          foreground: 'oklch(0.78 0.02 85)',
        },
        accent: {
          DEFAULT: 'oklch(0.72 0.12 195)',
          foreground: 'oklch(0.10 0.02 255)',
        },
        popover: {
          DEFAULT: 'oklch(0.13 0.03 255)',
          foreground: 'oklch(0.97 0.015 85)',
        },
        card: {
          DEFAULT: 'oklch(0.14 0.03 255)',
          foreground: 'oklch(0.97 0.015 85)',
        },
        // Cosmic palette
        cosmic: {
          gold: 'oklch(0.78 0.14 75)',
          'gold-light': 'oklch(0.88 0.10 80)',
          'gold-dark': 'oklch(0.60 0.14 70)',
          cyan: 'oklch(0.72 0.12 195)',
          'cyan-light': 'oklch(0.82 0.10 195)',
          navy: 'oklch(0.10 0.025 255)',
          'navy-light': 'oklch(0.14 0.03 255)',
          'navy-mid': 'oklch(0.18 0.04 255)',
          purple: 'oklch(0.55 0.15 280)',
          green: 'oklch(0.65 0.18 145)',
          white: 'oklch(0.97 0.015 85)',
          'white-muted': 'oklch(0.85 0.015 85)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'gold-sm': '0 2px 8px oklch(0.78 0.14 75 / 0.25)',
        'gold-md': '0 4px 16px oklch(0.78 0.14 75 / 0.30)',
        'gold-lg': '0 8px 32px oklch(0.78 0.14 75 / 0.35)',
        'gold-xl': '0 16px 48px oklch(0.78 0.14 75 / 0.40)',
        'cyan-sm': '0 2px 8px oklch(0.72 0.12 195 / 0.25)',
        'cyan-md': '0 4px 16px oklch(0.72 0.12 195 / 0.30)',
        'cosmic': '0 8px 32px oklch(0.10 0.025 255 / 0.8)',
      },
      backgroundImage: {
        'cosmic-radial': 'radial-gradient(ellipse at center, oklch(0.18 0.05 255) 0%, oklch(0.10 0.025 255) 70%)',
        'gold-shimmer': 'linear-gradient(135deg, oklch(0.78 0.14 75), oklch(0.65 0.12 60), oklch(0.78 0.14 75))',
        'cosmic-hero': 'linear-gradient(180deg, oklch(0.10 0.025 255) 0%, oklch(0.13 0.04 260) 50%, oklch(0.10 0.025 255) 100%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px oklch(0.78 0.14 75 / 0.3)' },
          '50%': { boxShadow: '0 0 25px oklch(0.78 0.14 75 / 0.7), 0 0 50px oklch(0.78 0.14 75 / 0.3)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 3s linear infinite',
        float: 'float 3s ease-in-out infinite',
        twinkle: 'twinkle 2s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};
