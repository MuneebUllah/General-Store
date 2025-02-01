/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
              animation: {
                lineAnim: 'lineAnim 1s linear infinite',
              },
              keyframes: {
                        lineAnim: {
                          '0%': { left: '-40%' },
                          '50%': { left: '20%', width: '80%' },
                          '100%': { left: '100%', width: '100%' },
                        },
    },
  },
  plugins: [],
},
}