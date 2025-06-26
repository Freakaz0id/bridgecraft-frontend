/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#8b5cf6', // Tailwind's violet-500
          light: '#a78bfa',    // Tailwind's violet-400 (lighter)
          dark: '#7c3aed',     // Tailwind's violet-600 (darker)
        },
        // Synthwave palette
        neon: {
          pink: '#ff0080',
          blue: '#00ffff',
          purple: '#8000ff',
          magenta: '#ff00ff',
          cyan: '#00d4ff',
        },
        synthwave: {
          dark: '#0a0a0f',
          purple: '#1a0033',
          magenta: '#330066',
          pink: '#ff0080',
          blue: '#0066ff',
          cyan: '#00ffff',
          yellow: '#ffff00',
          orange: '#ff8000',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'grid-move': 'grid-move 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'twinkle': 'twinkle 8s infinite',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
          },
          '50%': {
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
          },
        },
        'grid-move': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(40px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'twinkle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
      },
      boxShadow: {
        'neon-pink': '0 0 20px #ff0080, 0 0 40px #ff0080, 0 0 60px #ff0080',
        'neon-cyan': '0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff',
        'neon-purple': '0 0 20px #8b5cf6, 0 0 40px #8b5cf6, 0 0 60px #8b5cf6',
      },
      backgroundImage: {
        'synthwave-gradient': 'linear-gradient(180deg, #0a0a0f 0%, #1a0033 25%, #330066 50%, #0a0a0f 100%)',
        'grid-pattern': 'linear-gradient(rgba(255, 0, 128, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 128, 0.3) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
} 