// src/tokens.js — 26-1 DAH EXHIBITION 디자인 토큰
// DESIGN.md 단일 소스. 하드코딩 HEX 금지, 이 파일 토큰만 사용.

export const colors = {
    bg: {
        primary: '#0a0a0a',
        elevated: '#1e1e1e',
    },
    surface: '#141414',
    border: {
        subtle: '#1f1f1f',
        default: '#2a2a2a',
        strong: '#3a3a3a',
    },
    text: {
        primary: '#f0f0f0',
        muted: '#BABABA',
        inverse: '#0a0a0a',
    },
    accent: '#F5C518',
    accentDim: '#D9AD0F',
}

export const fonts = {
    display: "'Barlow Condensed', sans-serif",
    body: "'Pretendard Variable', 'Pretendard', sans-serif",
    ui: "'SUIT Variable', 'SUIT', sans-serif",
}

export const fontWeight = {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
}

export const spacing = {
    0: '0px', 1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '20px',
    6: '24px', 8: '32px', 10: '40px', 12: '48px', 16: '64px',
    20: '80px', 24: '96px', 32: '128px',
}

export const screens = {
    xs: '320px', sm: '390px', md: '768px', lg: '1024px',
    xl: '1280px', '2xl': '1440px', '3xl': '1920px',
}

export const radius = {
    card: '4px',
    button: '8px',
    pill: '20px',
}

export const easing = {
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
}

export const layout = {
    headerHeight: '56px',
    maxWidth: '1280px',
    maxWidthWide: '1440px',
    sidebarWidth: '220px',
}