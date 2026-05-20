/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'prime-bg': '#020510',
        'prime-navy': '#040d1f',
        'prime-card': '#060f22',
        'prime-blue': '#1a6bff',
        'prime-blue-bright': '#3d8bff',
        'prime-cyan': '#00c9ff',
        'prime-purple': '#6b42ff',
        'prime-muted': '#8899bb',
        'prime-dim': '#6b7d9a',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(135deg, #1a6bff 0%, #0057cc 100%)',
        'cyan-gradient': 'linear-gradient(135deg, #00c9ff 0%, #1a6bff 100%)',
        'section-gradient': 'linear-gradient(180deg, #020510 0%, #040d1f 50%, #020510 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        }
      },
    },
  },
  plugins: [],
}
