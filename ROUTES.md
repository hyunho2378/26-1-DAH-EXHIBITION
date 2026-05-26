# ROUTES.md — React Router v6 라우팅

> 26-1 DAH EXHIBITION — Vite + React, JSX 전용

---

## 1. 전체 라우트 구조

```jsx
// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

```jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from './components/layout/Layout'

const AboutPage         = lazy(() => import('./pages/AboutPage'))
const AgainstPage       = lazy(() => import('./pages/AgainstPage'))
const DesignSystemPage  = lazy(() => import('./pages/DesignSystemPage'))
const ProjectsPage      = lazy(() => import('./pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'))
const ContestPage       = lazy(() => import('./pages/ContestPage'))
const AwardPage         = lazy(() => import('./pages/AwardPage'))
const LucidPage         = lazy(() => import('./pages/LucidPage'))
const GalleryPage       = lazy(() => import('./pages/GalleryPage'))
const NotFoundPage      = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/"                        element={<AboutPage />} />
          <Route path="/against"                 element={<AgainstPage />} />
          <Route path="/against/design-system"   element={<DesignSystemPage />} />
          <Route path="/projects"                element={<ProjectsPage />} />
          <Route path="/projects/:id"            element={<ProjectDetailPage />} />
          <Route path="/contest"                 element={<ContestPage />} />
          <Route path="/award"                   element={<AwardPage />} />
          <Route path="/lucid"                   element={<LucidPage />} />
          <Route path="/gallery"                 element={<GalleryPage />} />
          <Route path="*"                        element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="text-xs text-text-muted tracking-widest uppercase">Loading</span>
    </div>
  )
}
```

---

## 2. 라우트 상세

### `/` — AboutPage
데이터: src/data/about.js (intro 본문, 일정 상수)

### `/against` — AgainstPage
데이터: src/data/history.js (역대 전시 아코디언). 수상작 포스터 이미지.
하단 [Design System →] 버튼 → navigate('/against/design-system')

### `/against/design-system` — DesignSystemPage
tokens.js 기반 시각화. [← Back] → /against

### `/projects` — ProjectsPage
데이터: src/data/works.js 전체, src/data/subjects.js
상태: 선택된 subjectId (기본 'all'). 필터링은 클라이언트.
```js
const [activeSubject, setActiveSubject] = useState('all')
const filtered = activeSubject === 'all'
  ? works
  : works.filter(w => w.subjectId === activeSubject)
const activeInfo = subjects.find(s => s.id === activeSubject)
```

### `/projects/:id` — ProjectDetailPage
```js
const { id } = useParams()
const work = works.find(w => w.id === id)
const i = works.findIndex(w => w.id === id)
const prev = i > 0 ? works[i - 1] : null
const next = i < works.length - 1 ? works[i + 1] : null
// 유효하지 않은 id → NotFoundPage
```

### `/contest` — ContestPage
데이터: src/data/contests.js (공모전 3개)

### `/award` — AwardPage
데이터: works.js award 필드 필터. 최우수 1 + 그 외 13 골격.

### `/lucid` — LucidPage
데이터: src/data/lucid.js (committee, history)

### `/gallery` — GalleryPage
데이터: 현장 사진 캐러셀 (추후). 현재 빈 캐러셀 + < > 골격.

### `*` — NotFoundPage
"404" + [← 홈으로] → navigate('/')

---

## 3. 네비게이션 유틸

```js
// src/utils/workUtils.js
export function getWorkById(works, id) {
  return works.find(w => w.id === id) ?? null
}
export function getAdjacentWorks(works, id) {
  const index = works.findIndex(w => w.id === id)
  return {
    prev: index > 0 ? works[index - 1] : null,
    next: index < works.length - 1 ? works[index + 1] : null,
  }
}
export function filterBySubject(works, subjectId) {
  return subjectId === 'all' ? works : works.filter(w => w.subjectId === subjectId)
}
export function getAwardWorks(works) {
  return {
    grand:        works.filter(w => w.award === 'grand'),
    rest:         works.filter(w => w.award && w.award !== 'grand'),
    none:         works.filter(w => !w.award),
  }
}
```

---

## 4. 스크롤 복원

```jsx
// src/components/layout/ScrollToTop.jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}
// Layout.jsx 내부에 <ScrollToTop /> 포함
```

---

## 5. 링크 사용 원칙
- 내부 이동: Link / NavLink (react-router-dom)
- 프로그래매틱: useNavigate (navigate('/projects'), navigate(-1))
- 외부 링크: `<a href target="_blank" rel="noopener noreferrer">`

---

## 6. 페이지 타이틀

```jsx
useEffect(() => {
  document.title = '26-1 DAH EXHIBITION — 디지털인문예술전공 프로젝트 전시회'
}, [])
// 상세: `${work.title} — 26-1 DAH EXHIBITION`
```

---

## 7. Vite 배포 (SPA fallback)

```json
// vercel.json (rootDirectory를 client로 지정)
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```