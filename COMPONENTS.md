# COMPONENTS.md — 컴포넌트 정의

> 26-1 DAH EXHIBITION — B형 반응형 웹
> 모든 컴포넌트는 tokens.js 기반. TypeScript 금지, JSX만. 아이콘은 lucide-react.

---

## 1. 레이아웃 컴포넌트

### `Layout` — `src/components/layout/Layout.jsx`
```
전체 앱 래퍼.
- 상단 Header (고정)
- ScrollToTop 포함
- 페이지 콘텐츠 영역 (좌우 px-6/px-10/px-16, 상단 pt-20 헤더 여백)
- 하단 Footer
Props: children
```

### `Header` — `src/components/layout/Header.jsx`
```
상단 고정 가로 헤더. height 56px.
[좌] "26-1 DAH EXHIBITION" — 얇게(weight 500, SUIT). 볼드/블랙 금지.
[우 데스크탑] NavLink 7개: About / Against the Flow / Projects / Contest / Award / LUCID / Gallery
   · 정상 가로, 우측 정렬, SUIT weight 600
   · active #F5C518 / 비active #BABABA → hover #f0f0f0
[우 모바일] 햄버거 (Menu, lucide-react)
- background #0a0a0a, 스크롤 시 rgba(10,10,10,0.85) + backdrop-blur
- border-bottom 1px #F5C518
Props: 없음 (내부 useLocation)
```

### `MobileMenu` — `src/components/layout/MobileMenu.jsx`
```
모바일 전용 슬라이드다운 메뉴 (풀스크린 오버레이 아님).
- 헤더 바로 아래에서 펼침. 배경 #0a0a0a.
- 메뉴 7개 세로 나열. 클릭 시 닫힘.
Props: isOpen, onClose
```

### `Footer` — `src/components/layout/Footer.jsx`
```
모든 페이지 공통. Layout에서 렌더.
border-top 1px #1f1f1f, background #0a0a0a, py-10(데스크탑)/py-8(모바일)

[좌측]
  (SVG 로고 자리 — 디인예 로고 placeholder) + "한림대학교 디지털인문예술전공"
  한 줄 아래: "Hallym University  DAH"
    → href https://sites.google.com/glab.hallym.ac.kr/dah-hallym/about?authuser=0
    → target=_blank rel=noopener noreferrer, caption #BABABA → hover #f0f0f0, ExternalLink 아이콘 10px
  한 줄 아래: "© 2026 디지털인문예술전공. All rights reserved." (caption #BABABA)

[우측 — 우측정렬, caption #BABABA]
  한림대학교 디지털인문예술전공 운영위원회 LUCID
  강원특별자치도 춘천시 한림대학길 1 Campus Life Center 1F
  웹사이트 제작/수정 문의 주현호(h20222538@glab.hallym.ac.kr)

데스크탑 2컬럼 / 모바일 1컬럼
Props: 없음
```

### `FadeIn` — `src/components/ui/FadeIn.jsx`
```
IntersectionObserver 진입 시 1회 fade-in (opacity 0→1, translateY 12px→0)
- duration 0.4~0.5s, ease-out(cubic-bezier(0.16,1,0.3,1)), once
- reduced-motion: 즉시 표시
- immediate prop이면 마운트 즉시 (Hero용)
- direction prop ('up'|'left'|'right'|'down') — Plus X식 방향 진입 (Projects 그리드용)
Props: children, immediate, delay, direction, className
```

---

## 2. 공통 UI 컴포넌트

### `Button` — `src/components/ui/Button.jsx`
```
variant: 'primary' | 'ghost' | 'text'
primary: bg #F5C518, text #0a0a0a, hover bg #D9AD0F
ghost:   border 1px #2a2a2a, text #f0f0f0, hover border #3a3a3a
text:    text #BABABA, hover #f0f0f0, 언더라인 애니메이션
Props: variant, size('sm'|'md'|'lg'), onClick, href, to, children, disabled, className
```

### `AwardBadge` — `src/components/ui/AwardBadge.jsx`
```
type: 'grand' | 'excellence' | 'encouragement'
grand:        border #F5C518, text #F5C518, bg rgba(245,197,24,0.05)
excellence:   border #BABABA, text #f0f0f0, bg transparent
encouragement: border #2a2a2a, text #BABABA, bg transparent
라벨: 최우수상 / 우수상 / 장려상. caption, px-3 py-1, radius 2px
Props: type
```

### `SectionLabel` — `src/components/ui/SectionLabel.jsx`
```
섹션 레이블. caption, letter-spacing 0.15em, uppercase, color #BABABA
Props: children, number (선택)
```

### `Divider` — `src/components/ui/Divider.jsx`
```
1px solid #1f1f1f 수평선
Props: className
```

### `BackLink` — `src/components/ui/BackLink.jsx`
```
← [텍스트] 링크. ArrowLeft(lucide-react), body-sm, #BABABA → hover #f0f0f0
Props: to, children
```

### `PageHeader` — `src/components/ui/PageHeader.jsx`
```
페이지 최상단 제목. 페이지명(display-lg, Barlow Condensed) + 서브(body-md, #BABABA, 선택) + Divider
Props: title, subtitle (선택)
```

### `Accordion` — `src/components/ui/Accordion.jsx`
```
역대 전시 목록용 (Against the Flow).
각 행: 좌측 "연도 학기 + 전시명", 우측 chevron(lucide-react)
- 현재 회차(highlight prop): 텍스트 #F5C518 + weight 700
- 나머지: #f0f0f0 → hover #F5C518
- 클릭 시 아래 설명 영역 펼침/접힘 (max-height transition 0.3s)
- border-bottom 1px #1f1f1f
Props: items[{year, term, title, body, highlight}]
```

### `Carousel` — `src/components/ui/Carousel.jsx`
```
가로 사진 캐러셀 (Gallery용). < > 좌우 화살표(ChevronLeft/Right).
- 사진 없으면 빈 상태 placeholder + 화살표 골격만
- 자동재생 없음 (수동)
Props: photos[] (빈 배열 가능)
```

---

## 3. 프로젝트(작품) 컴포넌트

### `ProjectCard` — `src/components/project/ProjectCard.jsx`
```
[레이아웃] 이미지 컨테이너만. 외부 텍스트 없음.
  - aspect-ratio 1/1.414 (A2 세로), overflow hidden, radius 4px
  - 배경 #141414, border 1px #1f1f1f
  - 키컬러 바텀 바 금지

[hover]
  - 오버레이 rgba(10,10,10,0.55), 중앙 정렬
    1행: 작품명 (heading-md, #f0f0f0, 중앙)
    2행: 과목명 (caption, #BABABA, 중앙, 한 줄 아래)
  - 이미지 scale(1.02), transition 0.4s ease-out (transform/opacity만)
  - 수상작: AwardBadge 우상단 오버레이

Props: work (id,title,author,subjectName,type,thumbnail,award)
```

### `ProjectGrid` — `src/components/project/ProjectGrid.jsx`
```
2/3/4/5 컬럼 (xs/md/lg/2xl), gap-4(모바일)/gap-6(데스크탑)
진입: FadeIn direction 번갈아(좌/우/상/하), stagger 짧게(~30ms)
Props: works[]
```

### `ProjectFilter` — `src/components/project/ProjectFilter.jsx`
```
[데스크탑] 세로 사이드 필터 (고정폭 ~220px)
[모바일]   상단 가로 스크롤 칩

각 항목 (칩, radius 20px):
  비활성: 텍스트 #f0f0f0, border 1px #2a2a2a, bg transparent
  hover:  border #3a3a3a
  활성:   텍스트 #F5C518, border #F5C518, bg transparent  (← 텍스트에만 프라이머리)
  · 왼쪽 노란 바 금지
Props: subjects[], activeId, onChange
```

### `SubjectInfoPanel` — `src/components/project/SubjectInfoPanel.jsx`
```
선택 과목 정보 (ALL 아닐 때만 그리드 위 표시)
  [과목명]        heading-lg, #f0f0f0
  지도교수: [빈칸] body-sm, #BABABA (professor 값 비어있으면 "지도교수: " 만 출력)
  [설명]          body-sm, #BABABA, word-break keep-all 자동 줄바꿈
Props: subject ({name, professor, description})
```

### `ProjectDetail` — `src/components/project/ProjectDetail.jsx`
```
[2컬럼] 좌 이미지(60%, max 90vh, GIF 자동재생) / 우 정보(40%)
우측:
  작품명 (heading-xl, text-primary)
  author (body-lg, #BABABA) — 라벨 없이 값만. 개인이면 이름, 팀이면 팀명.
  과목명 (caption, #F5C518)
  외부 링크 목록 (links.length > 0 일 때만):
    · Ghost 버튼 (border #2a2a2a, radius 8px, px-3 py-1, #f0f0f0)
    · hover: border #F5C518, text #F5C518, transition 0.2s
    · ExternalLink 아이콘(12px) + label. target="_blank".
    · flex row, gap-2, flex-wrap.
  설명 (body-md, 있을 때, word-break keep-all)
  팀원 목록 (members.length > 0 일 때만):
    · 각 줄: 이름 (caption #f0f0f0) + 학번/전공 (caption #BABABA)
    · 형식: "김동건 (20236604, 빅데이터전공)"
    · "팀원" 한글 라벨 없음. members 비어있으면 섹션 자체 미렌더.
  AwardBadge (있을 때)
  BackLink
Props: work (members, links 포함)
```

### `ProjectImage` — `src/components/project/ProjectImage.jsx`
```
type별 렌더. png/webp: <img loading=lazy alt="작가명 - 작품명">. gif: 자동재생.
스켈레톤 로딩 포함.
Props: src, type, alt, className
```

---

## 4. About 전용

### `AboutHero` — `src/components/about/AboutHero.jsx`
```
제17회 디인예 전시회 / 「흐르는 경계: DAH」 (Barlow Condensed display-hero)
부제 + CTA 2개([전시 작품 보기 → /projects], [전시회 소개 → 스크롤])
FadeIn(immediate)
```

### `AboutIntro` — `src/components/about/AboutIntro.jsx`
```
전시회 소개 본문 (about.js intro). body-md, word-break keep-all. FadeIn.
```

### `AboutSchedule` — `src/components/about/AboutSchedule.jsx`
```
주요 행사 일정 (오프라인 전시 / 시상식). SectionLabel + 인포 리스트. FadeIn.
```

---

## 5. Against 전용

### `AwardHero` — `src/components/against/AwardHero.jsx`
```
[2컬럼] 좌 수상작 포스터(A2, max-w ~440px) / 우 텍스트(전시명, 일시, 시상식, 주최)
```

### `HistoryAccordion` — `src/components/against/HistoryAccordion.jsx`
```
Accordion 컴포넌트 사용. history.js 데이터. 2026-1 highlight.
```

### `DesignSystemCTA` — `src/components/against/DesignSystemCTA.jsx`
```
Against 하단. Button primary "Design System →" → /against/design-system
```

---

## 6. Contest 전용

### `ContestSection` — `src/components/contest/ContestSection.jsx`
```
공모전 1개 단위. 공모전명(heading-lg) + 설명(body-md, 빈칸 가능) + 출품작 그리드 또는 링크
Props: contest ({title, description, works[], link})
```

---

## 7. Award 전용

### `AwardGrandSection` — `src/components/award/AwardGrandSection.jsx`
```
최우수상 1자리. 대형 ProjectCard 1개 + AwardBadge grand. 추후 데이터.
```

### `AwardRestSection` — `src/components/award/AwardRestSection.jsx`
```
그 외 13자리. 소형 그리드. 추후 데이터. 지금은 플레이스홀더 골격.
```

---

## 8. LUCID 전용

### `LucidIntro` — `src/components/lucid/LucidIntro.jsx`
```
인트로 카피 (lucid.js intro). 좌측 SVG 로고 자리 placeholder.
```

### `CommitteeList` — `src/components/lucid/CommitteeList.jsx`
```
운영위원회 구성 (committee 데이터). 부서별 그룹.
```

### `HistoryList` — `src/components/lucid/HistoryList.jsx`
```
연혁 (history 데이터). 연도 / 학생회명 / 명단.
```

---

## 9. Gallery 전용

### `GalleryCarousel` — `src/components/gallery/GalleryCarousel.jsx`
```
Carousel 컴포넌트 사용. 사진 추후. 현재 빈 상태 + < >.
```

---

## 10. 로고

### `LogoMark` — `src/components/ui/LogoMark.jsx`
```
디인예/LUCID SVG 로고 placeholder. 실제 SVG는 추후 교체.
Footer 좌측, LUCID 페이지 좌측에 배치.
Props: size, className
```

---

## 11. 스켈레톤

### `ProjectSkeleton` — `src/components/ui/ProjectSkeleton.jsx`
```
카드 로딩 상태. 이미지 영역 #141414 + 약한 pulse.
```

---

## 컴포넌트 파일 구조

```
26-1 전시회 웹사이트/        ← 최상위 폴더 (CLAUDE.md, AGENTS.md는 운영자가 배치)
├── client/                  ← Vite + React
│   ├── public/
│   │   └── works/[id]/full.webp, thumbnail.webp
│   └── src/
│       ├── components/
│       │   ├── layout/   (Layout, Header, MobileMenu, Footer, ScrollToTop)
│       │   ├── ui/       (Button, AwardBadge, SectionLabel, Divider, BackLink,
│       │   │              PageHeader, Accordion, Carousel, FadeIn, LogoMark, ProjectSkeleton)
│       │   ├── project/  (ProjectCard, ProjectGrid, ProjectFilter, SubjectInfoPanel,
│       │   │              ProjectDetail, ProjectImage)
│       │   ├── about/    (AboutHero, AboutIntro, AboutSchedule)
│       │   ├── against/  (AwardHero, HistoryAccordion, DesignSystemCTA)
│       │   ├── contest/  (ContestSection)
│       │   ├── award/    (AwardGrandSection, AwardRestSection)
│       │   ├── lucid/    (LucidIntro, CommitteeList, HistoryList)
│       │   └── gallery/  (GalleryCarousel)
│       ├── pages/        (About, Against, DesignSystem, Projects, ProjectDetail,
│       │                  Contest, Award, Lucid, Gallery, NotFound)
│       ├── data/         (subjects.js, works.js, about.js, history.js, contests.js, lucid.js)
│       ├── styles/       (tokens.js)
│       └── utils/        (workUtils.js)
├── CLAUDE.md   (운영자 배치)
├── AGENTS.md   (운영자 배치)
├── DESIGN.md
├── IA.md
├── ROUTES.md
├── COMPONENTS.md
├── PATTERNS.md
├── SETUP.md
└── PROGRESS.md
```