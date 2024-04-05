/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        mulish: ['var(--font-mulish)'],
        pt_serif: ['var(--font-pt-serif)']
      },
      colors: {
        black: '#25313C',
        yellow: '#FBB500',
        blue: '#5A4FF3',
        text_gray: '#6D7D8B',
        purple: '#9747FF'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
