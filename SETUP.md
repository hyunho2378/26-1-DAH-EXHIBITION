# SETUP.md — PHASE 0 초기 세팅

> 26-1 DAH EXHIBITION — AGENT-SETUP 전용
> PHASE 0 완료 전까지 PHASE 1 시작 금지 (AGENTS.md 준수)

---

## 1. 스택 확정

```
Vite + React (JSX 전용, TypeScript 금지)
react-router-dom v6      라우팅
tailwindcss              스타일 (tokens.js 토큰 매핑)
lucide-react             아이콘
framer-motion 미사용     (GSAP 포함 모든 애니메이션 라이브러리 금지 — CSS + IntersectionObserver만)
```

> 키컬러 추출(color-thief 등)은 이번 빌드에 포함하지 않는다 (키컬러 바텀 바 폐기됨).

---

## 2. 폴더 생성

```
26-1 전시회 웹사이트/        ← 최상위 (CLAUDE.md, AGENTS.md 운영자 배치)
└── client/
    ├── public/
    │   └── works/           ← 작품 이미지 (추후 운영자 업로드)
    ├── src/
    │   ├── components/{layout,ui,project,about,against,contest,award,lucid,gallery}/
    │   ├── pages/
    │   ├── data/
    │   ├── styles/          ← tokens.js
    │   ├── hooks/           ← useIntersectionFade.js
    │   └── utils/           ← workUtils.js
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

---

## 3. package.json (핵심 의존성)

```json
{
  "name": "dah-exhibition-2026",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

---

## 4. tailwind.config.js (DESIGN.md / tokens.js 매핑)

```js
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
```

---

## 5. index.html (폰트 CDN)

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>26-1 DAH EXHIBITION</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/variable/woff2/SUIT-Variable.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 6. src/index.css (글로벌)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { --ease-out: cubic-bezier(0.16, 1, 0.3, 1); }

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: #0a0a0a;
  color: #f0f0f0;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  -webkit-font-smoothing: antialiased;
}
/* 한글 본문 자동 줄바꿈 기본값 */
p, dd, span, h1, h2, h3 { word-break: keep-all; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. .env.example

```
# 현재 외부 API 없음. 필요 시 추가.
```

---

## 8. PHASE 0 완료 조건

- [ ] npm install 성공
- [ ] npm run dev 정상 실행
- [ ] 빈 App.jsx 라우팅 1개 이상 동작 (예: `/` → "About" 텍스트)
- [ ] tailwind 토큰 클래스 동작 확인 (bg-bg-primary, text-accent 등)
- [ ] 폰트 3종 로드 확인 (Barlow Condensed / Pretendard / SUIT)
- [ ] tokens.js 배치 완료

> 위 전부 통과 후에만 PHASE 1 시작.