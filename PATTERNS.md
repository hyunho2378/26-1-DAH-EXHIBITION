# PATTERNS.md — 반복 UI 패턴

> 26-1 DAH EXHIBITION — 전시 사이트
> 모든 페이지 일관 적용. tokens.js만 사용, 하드코딩 HEX 금지.

---

## 1. 카드 패턴 — 프로젝트 카드 (호버 중앙 정렬)

```jsx
<Link to={`/projects/${work.id}`} className="group block">
  <div
    className="relative overflow-hidden"
    style={{ aspectRatio: '1 / 1.414', borderRadius: '4px',
             background: '#141414', border: '1px solid #1f1f1f' }}
  >
    <ProjectImage
      src={work.thumbnail}
      type={work.type}
      alt={`${work.author} - ${work.title}`}
      className="w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]"
    />
    {work.award && (
      <div className="absolute top-3 right-3 z-10">
        <AwardBadge type={work.award} />
      </div>
    )}
    {/* 호버 오버레이 — 중앙 정렬: 작품명 + 한 줄 아래 author */}
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3
                 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]"
      style={{ background: 'rgba(10,10,10,0.55)' }}
    >
      <p className="text-base font-semibold text-text-primary text-center" style={{ wordBreak: 'keep-all' }}>
        {work.title}
      </p>
      <p className="text-xs text-text-muted text-center">{work.author}</p>
    </div>
  </div>
</Link>
```

**hover 원칙**
- 카드 외부 텍스트 없음. 정보는 호버 오버레이 안에만.
- scale은 이미지만. 레이아웃 시프트 금지 (transform/opacity only).
- 키컬러 바텀 바 금지.

---

## 2. 사이드 필터 텍스트 패턴 (Plus X식 — opacity)

```jsx
// 비활성: #f0f0f0 + opacity 0.6
// 활성: #F5C518 + opacity 1
// hover 비활성: opacity 1 전환 (transition 0.2s)
// 박스/border/background 없음
<button
  onClick={() => onChange(s.id)}
  className={`font-display font-bold uppercase bg-transparent border-none p-0 text-left cursor-pointer
    text-lg lg:text-2xl transition-opacity duration-200
    ${activeId === s.id ? 'text-accent opacity-100' : 'text-text-primary opacity-60 hover:opacity-100'}`}
>
  {s.name}
</button>
```

---

## 3. 선택 과목 정보 패널 패턴

```jsx
{activeId !== 'all' && (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-text-primary">{subject.name}</h2>
    <p className="text-sm text-text-muted mt-1">지도교수: {subject.professor}</p>
    <p className="text-sm text-text-muted mt-2 leading-relaxed" style={{ wordBreak: 'keep-all' }}>
      {subject.description}
    </p>
  </div>
)}
// professor가 빈 문자열이면 "지도교수: " 만 출력 (운영자가 직접 채움)
```

---

## 4. 아코디언 패턴 (역대 전시)

```jsx
const [open, setOpen] = useState(null)
{items.map((it, idx) => (
  <div key={idx} style={{ borderBottom: '1px solid #1f1f1f' }}>
    <button
      onClick={() => setOpen(open === idx ? null : idx)}
      className="w-full flex items-center justify-between py-4 text-left transition-colors duration-200"
      style={{
        color: it.highlight ? '#F5C518' : '#f0f0f0',
        fontWeight: it.highlight ? 700 : 400,
      }}
    >
      <span>{it.year}년 {it.term}  {it.title}</span>
      <ChevronDown
        size={18}
        style={{ transform: open === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
      />
    </button>
    <div style={{ maxHeight: open === idx ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease-out' }}>
      <p className="pb-4 text-sm text-text-muted" style={{ wordBreak: 'keep-all' }}>{it.body}</p>
    </div>
  </div>
))}
```

---

## 5. 인포 리스트 패턴 (key-value)

```jsx
<dl className="space-y-4">
  <div className="flex flex-col gap-1">
    <dt><SectionLabel>일시</SectionLabel></dt>
    <dd className="text-sm text-text-primary" style={{ wordBreak: 'keep-all' }}>
      2025년 12월 02일 (화) ~ 12월 04일 (목)
    </dd>
  </div>
  <Divider />
  <div className="flex flex-col gap-1">
    <dt><SectionLabel>장소</SectionLabel></dt>
    <dd className="text-sm text-text-primary">한림대학교 일송기념도서관 4층 C.Square</dd>
  </div>
</dl>
```

---

## 6. 페이지 진입 페이드인 (IntersectionObserver, 방향)

```jsx
// hooks/useIntersectionFade.js
import { useEffect, useRef, useState } from 'react'
export function useIntersectionFade(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVisible(true); return }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.1, ...options })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

// FadeIn direction별 초기 transform
// up:    translateY(12px)
// down:  translateY(-12px)
// left:  translateX(12px)
// right: translateX(-12px)
// visible 시 transform none, transition 0.4s ease-out
```

---

## 7. Plus X식 그리드 진입 패턴

```jsx
// 카드마다 방향 번갈아 (좌/우/상/하), stagger 짧게
const DIRS = ['up', 'left', 'right', 'down']
{works.map((work, i) => (
  <FadeIn key={work.id} direction={DIRS[i % 4]} delay={Math.min(i * 30, 400)}>
    <ProjectCard work={work} />
  </FadeIn>
))}
// stagger 최대 400ms 이내 (delay cap)
```

---

## 8. 네비게이션 링크 패턴 (상단 헤더)

```jsx
<NavLink
  to="/projects"
  className={({ isActive }) =>
    `text-xs tracking-widest uppercase font-semibold transition-colors duration-200 ${
      isActive ? 'text-accent' : 'text-text-muted hover:text-text-primary'
    }`
  }
>
  Projects
</NavLink>
```

---

## 9. 반응형 이미지 패턴

```jsx
<img src={src} alt={alt} loading="lazy" decoding="async" className={className}
  onError={e => { e.target.style.display = 'none' }} />
```

---

## 10. 캐러셀 패턴 (Gallery)

```jsx
const [idx, setIdx] = useState(0)
// photos 빈 배열이면 빈 상태 placeholder + < > 골격만
<div className="relative">
  <button onClick={() => setIdx(Math.max(0, idx - 1))} aria-label="이전"><ChevronLeft /></button>
  {/* 사진 영역 */}
  <button onClick={() => setIdx(Math.min(photos.length - 1, idx + 1))} aria-label="다음"><ChevronRight /></button>
</div>
```

---

## 11. 빈 상태 패턴

```jsx
<div className="flex flex-col items-center justify-center py-24 gap-3">
  <span className="text-[11px] text-text-muted uppercase tracking-widest">Coming Soon</span>
  <p className="text-sm text-text-muted text-center max-w-xs" style={{ wordBreak: 'keep-all' }}>
    전시 현장 사진은 행사 이후 업데이트됩니다.
  </p>
</div>
```

---

## 12. 섹션 구분 패턴

```jsx
<section className="py-16 md:py-24">
  <SectionLabel number="01">About</SectionLabel>
  <Divider className="mt-4 mb-8" />
  {/* 콘텐츠 */}
</section>
```

---

## 패턴 사용 절대 규칙

1. 레이아웃 시프트 hover 금지 (margin/padding 변화 금지, transform만)
2. transition 없는 color/opacity 변화 금지
3. 스크롤 진입은 1회만 (observer.disconnect())
4. 이미지는 항상 alt + loading="lazy"
5. prefers-reduced-motion 분기 필수
6. 회색은 text-muted(#BABABA) 단일값만. 다른 회색 금지.
7. 한글 본문은 word-break: keep-all (자동 줄바꿈)
8. 키컬러 바텀 바 등 DESIGN.md에 없는 장식 추가 금지