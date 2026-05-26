export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0a',
        'bg-elevated': '#1e1e1e',
        surface: '#141414',
        'border-subtle': '#1f1f1f',
        'border-default': '#2a2a2a',
        'border-strong': '#3a3a3a',
        'text-primary': '#f0f0f0',
        'text-muted': '#BABABA',
        'text-inverse': '#0a0a0a',
        accent: '#F5C518',
        'accent-dim': '#D9AD0F',
      },
      fontFamily: {
        display: ['Barlow Condensed', 'sans-serif'],
        body: ['Pretendard Variable', 'Pretendard', 'sans-serif'],
        ui: ['SUIT Variable', 'SUIT', 'sans-serif'],
      },
      screens: {
        xs: '320px', sm: '390px', md: '768px',
        lg: '1024px', xl: '1280px', '2xl': '1440px', '3xl': '1920px',
      },
      maxWidth: { content: '1280px', wide: '1440px' },
      transitionTimingFunction: { out: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
  plugins: [],
}
