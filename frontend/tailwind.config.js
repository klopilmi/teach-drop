/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F3FA',
          100: '#D5DEEF',
          200: '#B1C9EF',
          300: '#8AAEE0',
          400: '#628ECB',
          500: '#395886',
        },
        warning: {
          light: '#FEF9C3', // light yellow
          DEFAULT: '#FACC15', // yellow-400
        },
        error: {
          light: '#FEE2E2', // light red
          DEFAULT: '#EF4444', // red-500
        },
        success: {
          light: '#D1FAE5', // light green
          DEFAULT: '#10B981', // emerald-500
        },
      }
    },
  },
  plugins: [],
}

