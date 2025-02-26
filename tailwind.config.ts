import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widget/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        inherit: 'inherit',
      },
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          to: { opacity: '1', transform: 'none' },
        },
        'image-rotate': {
          '0%': { transform: 'rotateX(25deg)' },
          '25%': { transform: 'rotateX(25deg) scale(0.9)' },
          '60%': { transform: 'none' },
          '100%': { transform: 'none' },
        },
        'image-glow': {
          '0%': {
            opacity: '0',
            'animation-timing-function': 'cubic-bezier(0.74,0.25,0.76,1)',
          },
          '10%': {
            opacity: '1',
            'animation-timing-function': 'cubic-bezier(0.12,0.01,0.08,0.99)',
          },
          '100%': {
            opacity: '0.2',
          },
        },
        bounce: {
          '50%': {
            transform: 'scale(0.98)',
          },
        },
        'sketch-lines': {
          '0%': { 'stroke-dashoffset': '1' },
          '50%': { 'stroke-dashoffset': '0' },
          '99%': { 'stroke-dashoffset': '0' },
          '100%': { visiblity: 'hidden' },
        },
        'glow-line-horizontal': {
          '0%': { opacity: '0', transform: 'translateX(0)' },
          '5%': { opacity: '1', transform: 'translateX(0)' },
          '90%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(min(60vw, 45rem))' },
        },
        'glow-line-vertical': {
          '0%': { opacity: '0', transform: 'translateY(0)' },
          '5%': { opacity: '1', transform: 'translateY(0)' },
          '90%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(min(21vw, 45rem))' },
        },
        lightning: {
          '0%, 9%, 11%, 100% ': {
            fill: 'transparent',
          },
          '10%': {
            fill: 'white',
          },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
        ripple: {
          '0%, 100%': {
            transform: 'translate(-50%, -50%) scale(1)',
          },
          '50%': {
            transform: 'translate(-50%, -50%) scale(0.9)',
          },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'fade-in': 'fade-in 1000ms var(--animation-delay, 0ms) ease forwards',
        'image-rotate': 'image-rotate 1400ms ease forwards',
        'image-glow': 'image-glow 4100ms 600ms ease-out forwards',
        'sketch-lines': 'sketch-lines 1200ms ease-out forwards',
        'glow-line-horizontal':
          'glow-line-horizontal var(--animation-duration) ease-in forwards',
        'glow-line-horizontal-reverse':
          'glow-line-horizontal var(--animation-duration) ease-in forwards reverse',
        'glow-line-vertical':
          'glow-line-vertical var(--animation-duration) ease-in forwards',
        'glow-line-vertical-reverse':
          'glow-line-vertical var(--animation-duration) ease-in forwards reverse',
        lightning: 'lightning 2250ms calc(var(--index) * 20ms) linear infinite',
        bounce: '240ms ease 0s 1 running bounce',
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
      },
      maxWidth: {
        '8xl': '96rem',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      boxShadow: {
        primary: 'rgb(80 63 205 / 50%) 0px 1px 40px',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(ellipse 50% 80% at 20% 40%,rgba(93,52,221,0.1),transparent), radial-gradient(ellipse 50% 80% at 80% 50%,rgba(120,119,198,0.15),transparent)',
        'page-gradient':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(var(--home-page-gradient-color)), transparent);',
        'hero-glow':
          'conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg)',
        'glow-lines':
          'linear-gradient(var(--direction),#9d9bf2 0.43%,#7877c6 14.11%,rgba(120,119,198,0) 62.95%)',
        'radial-faded':
          'radial-gradient(circle at bottom center,rgba(var(--home-page-gradient-color)),transparent 70%)',
      },
      transitionDelay: {
        '2000': '2000ms',
        '680': '680ms',
        '650': '650ms',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('tailwindcss-animate'),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/typography'),
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.text-shadow': {
          'text-shadow': 'rgb(0 0 0 / 56%) 0px 3px 12px',
        },
        '.text-gradient': {
          background:
            'linear-gradient(to right bottom, rgba(var(--text-gradient-start)) 30%, rgba(var(--text-gradient-end)))',
          'background-clip': 'text',
          color: 'transparent',
        },
        '.mask-radial-faded': {
          'mask-image':
            'radial-gradient(circle at center center, black, transparent 80%)',
        },
        '.mask-linear-faded': {
          'mask-image': 'linear-gradient(black, transparent 70%)',
        },
        '.mask-image': {
          'mask-image':
            'linear-gradient(transparent 0%, rgba(0, 0, 0, 0.57) 33.98%, black 100%)',
        },
      });
    },
  ],
} as Config;
export default config;
