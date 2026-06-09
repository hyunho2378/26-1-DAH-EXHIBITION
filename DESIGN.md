# DESIGN.md — 26-1 DAH EXHIBITION 디자인 시스템

> 제17회 디지털인문예술전공 프로젝트 전시회 (2026-1 운영)
> 전시명: 흐르는 경계: DAH / 키 비주얼: Against the Flow (최우수상작)
> 플랫폼: B형 반응형 웹 (320px ~ 2560px)
> 레퍼런스: plus-ex.com 갤러리 레이아웃 + 수상작 포스터 Visual Identity 계승

---

## 1. 플랫폼 확정

| 항목 | 값 |
|---|---|
| 형태 | B형 반응형 웹 |
| 최소 너비 | 320px |
| 최대 콘텐츠 너비 | 1280px (데스크탑), 1440px (와이드) |
| 기준 뷰포트 | 1280px |
| 네비게이션 | 상단 고정 가로 헤더 (얇게) / 모바일 햄버거 |

---

## 2. 색상 팔레트 (tokens.js의 `colors` 객체로 관리)

```
Background
  --color-bg-primary:    #0a0a0a   // 전체 배경 (단일 톤)
  --color-bg-elevated:   #1e1e1e   // 모달, 오버레이

Surface
  --color-surface:       #141414   // 카드 배경 (단일. surface-01/02 분리 금지)

Border
  --color-border-subtle: #1f1f1f   // 섹션 구분선
  --color-border-default:#2a2a2a   // 일반 테두리
  --color-border-strong: #3a3a3a   // 강조 테두리

Text
  --color-text-primary:  #f0f0f0   // 본문 메인
  --color-text-muted:    #BABABA   // 부제, 캡션, 메타 (회색 단일값. 이외 회색 금지)
  --color-text-inverse:  #0a0a0a   // 골드 위 텍스트

Accent (수상작 포스터 골드)
  --color-accent:        #F5C518   // 메인 포인트 (골드)
  --color-accent-dim:    #D9AD0F   // 호버 시 어두워진 골드
```

### 사용 원칙
- 배경은 `#0a0a0a` 단일 톤 유지. 그라디언트 배경 금지.
- 카드 배경은 `#141414` 단일. surface 단계 분리 금지.
- 액센트(`#F5C518`)는 포인트로만: 활성 링크 텍스트, 강조 타이틀, 얇은 보더.
- 이미지(작품)가 화면의 컬러를 결정. UI는 뒤로 빠진다.
- 화이트 사용 금지. 텍스트 최대값은 `#f0f0f0`.
- **회색은 `#BABABA`(text-muted) 단일값만 허용. #555/#888/#999 등 다른 회색 전부 금지.**

---

## 3. 타이포그래피

### 폰트 패밀리

```css
/* 1. Barlow Condensed (영문 디스플레이 — Bold/Black) */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&display=swap');

/* 2. Pretendard Variable (한글/영문 body) */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');

/* 3. SUIT Variable (숫자/인덱스/UI 레이블) */
@import url('https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/variable/woff2/SUIT-Variable.css');

font-family-display: 'Barlow Condensed', sans-serif        /* 영문 대형 디스플레이 */
font-family-body:    'Pretendard Variable', sans-serif     /* 한글+영문 본문 */
font-family-ui:      'SUIT Variable', sans-serif           /* 숫자/인덱스/네비 */
```

### 폰트 역할 분담

| 폰트 | 사용처 | 안 쓰는 곳 |
|---|---|---|
| **Barlow Condensed** | 영문 대형 디스플레이: Hero, 페이지 대제목(PROJECTS/AWARD…), 영문 라벨 | 한글, 본문 |
| **Pretendard** | 모든 한글, 본문, 작품 설명, 작품명(한글), 부제 | 영문 대형 디스플레이 |
| **SUIT** | 숫자, 네비 영문 라벨, tabular-nums | 본문 |

원칙: 큰 영문 = Barlow Condensed / 한글·본문 = Pretendard / 숫자·UI = SUIT.

### 헤더 로고 예외 (중요)
- 헤더 좌측 `26-1 DAH EXHIBITION` 은 **얇게**. weight 500 이하. 볼드/블랙 금지 (무거워 보임).
- 페이지 대제목(Hero/PROJECTS 등)만 Barlow Condensed 800~900 허용.

### 타입 스케일 (B형 반응형)

| 토큰명 | 모바일 | 데스크탑 | 폰트 | weight | 용도 |
|---|---|---|---|---|---|
| `display-hero` | 56px | 140px | Barlow Condensed | 900 | Hero 메인 |
| `display-2xl` | 44px | 96px | Barlow Condensed | 800 | 페이지 대제목 영문 |
| `display-xl` | 36px | 64px | Barlow Condensed | 800 | 섹션 대제목 영문 |
| `display-lg` | 28px | 44px | Barlow Condensed/Pretendard | 700 | 페이지 타이틀 |
| `heading-xl` | 22px | 30px | Pretendard | 700 | 카드 제목, 한글 작품명 대형 |
| `heading-lg` | 18px | 24px | Pretendard | 600 | 서브 제목 |
| `heading-md` | 16px | 20px | Pretendard | 600 | 레이블 |
| `body-lg` | 16px | 18px | Pretendard | 400 | 본문 강조 |
| `body-md` | 15px | 16px | Pretendard | 400 | 기본 본문 |
| `body-sm` | 13px | 14px | Pretendard | 400 | 부연 설명 |
| `caption` | 11px | 12px | SUIT/Pretendard | 600 | 캡션, 메타, 네비 |

### 타이포그래피 원칙
- Barlow Condensed: `letter-spacing` -0.01em ~ -0.02em, `line-height` 0.95~1.05
- Pretendard 본문: `letter-spacing` -0.01em, `line-height` 1.6~1.7, **자동 줄바꿈(word-break: keep-all) 필수**
- UI/네비/캡션: weight 최소 500 이상
- 숫자: SUIT, `font-variant-numeric: tabular-nums`
- 화이트 금지, 텍스트 최대 `#f0f0f0`
- **em dash(—) 금지.** 기간 표기는 물결(~) 또는 하이픈(-).

---

## 4. 간격 시스템 (4pt 배수)

```js
spacing: { '0':'0px','1':'4px','2':'8px','3':'12px','4':'16px','5':'20px',
  '6':'24px','8':'32px','10':'40px','12':'48px','16':'64px','20':'80px','24':'96px','32':'128px' }
```

---

## 5. 브레이크포인트

```js
screens: { 'xs':'320px','sm':'390px','md':'768px','lg':'1024px','xl':'1280px','2xl':'1440px','3xl':'1920px' }
```

---

## 6. 레이아웃 시스템

### 그리드
```
모바일(~768px):   4컬럼, 마진 16px, 거터 12px
태블릿(768px~):   8컬럼, 마진 24px, 거터 16px
데스크탑(1024px~): 12컬럼, 마진 40px, 거터 24px, max-width 1280px
```

### 상단 헤더 (전 페이지 공통)
```
position: fixed, top 0, 가로 전체
height: 56px
background: #0a0a0a (스크롤 시 rgba(10,10,10,0.85) + backdrop-blur)
border-bottom: 1px solid #F5C518

[좌] 26-1 DAH EXHIBITION  (얇게, weight 500, SUIT/Barlow Condensed, 볼드 금지)
[우] About / Against the Flow / Projects / Contest / Award / LUCID / Gallery
     · 정상 가로, 우측 정렬, SUIT weight 600
     · active: #F5C518 / 비active: #BABABA → hover #f0f0f0
```

### 콘텐츠 영역
```
좌우 패딩: px-6 / px-10 / px-16 (반응형)
상단 패딩: 헤더 높이(56px) + 여백 확보 (pt-20 이상)
```

---

## 7. PROJECTS 페이지 레이아웃 (세로 사이드 필터)

> plus-ex.com 좌측 세로 필터 방식 참고. 단, 과목명이 길어 사이드바 폭 확보.

```
[데스크탑] 좌측 사이드 필터(고정폭 ~220px) + 우측 그리드
[모바일]   상단 가로 스크롤 칩 + 아래 그리드

사이드 필터 항목 (과목 13개 + ALL):
  · 비활성:  텍스트 #f0f0f0(화이트톤), 보더 1px #2a2a2a, 배경 transparent, radius 20px (Plus X식 칩)
  · hover:   보더 #3a3a3a
  · 활성:    텍스트만 #F5C518, 보더 #F5C518, 배경 transparent (← 텍스트에만 프라이머리)
  · 왼쪽 노란 바 금지

상단 선택 과목 정보 패널 (필터에서 과목 선택 시 그리드 위에 표시):
  ┌─────────────────────────────────────────┐
  │ [과목명]            ← heading-lg, #f0f0f0 │
  │ 지도교수: [빈칸]    ← body-sm, #BABABA    │  (값은 비워둠. 운영자가 직접 채움)
  │ [과목 설명]         ← body-sm, #BABABA, word-break: keep-all 자동 줄바꿈 │
  └─────────────────────────────────────────┘
  · ALL 선택 시 정보 패널 숨김
```

---

## 8. 카드 (PROJECTS 그리드)

```
배경: #141414
border: 1px solid #1f1f1f
border-radius: 4px
이미지: aspect-ratio 1/1.414 (A2 세로), object-fit cover, loading lazy
키컬러 바텀 바 금지. 카드 외부 텍스트 없음.

[hover]
  이미지 위 오버레이: rgba(10,10,10,0.55)
  중앙 정렬:
    1행: 작품명 (heading-md, #f0f0f0, 중앙)
    2행: 과목명 (caption, #BABABA, 중앙, 한 줄 아래)
  이미지 scale(1.02), transition 0.4s ease-out (transform/opacity만)
```

---

## 9. 컴포넌트 스타일 규칙

### 버튼
```
Primary: bg #F5C518, text #0a0a0a, weight 600, px-6 py-3, hover bg #D9AD0F
Ghost:   border 1px #2a2a2a, text #f0f0f0, hover border #3a3a3a
Text:    text #BABABA, hover #f0f0f0, underline 애니메이션
```

### 수상 배지
```
최우수상: border 1px #F5C518, text #F5C518, bg rgba(245,197,24,0.05)
우수상:   border 1px #BABABA, text #f0f0f0, bg transparent
장려상:   border 1px #2a2a2a, text #BABABA, bg transparent
```

### 섹션 구분
- 수평선: `border-top: 1px solid #1f1f1f`
- 섹션 간 간격: `pt-24 pb-24` (모바일 `pt-16 pb-16`)

### 아코디언 (Against the Flow 역대 전시 목록)
```
각 행: 연도+학기+전시명, 클릭 시 펼침/접힘
구분선: border-bottom 1px #1f1f1f
현재 회차(2026-1 Against the Flow): 텍스트 #F5C518 + weight 700 강조
나머지: #f0f0f0 → hover #F5C518
chevron 아이콘 (lucide-react), transition 0.3s
```

---

## 10. 모션 / 인터랙션

라이브러리: **GSAP 금지.** CSS transition + IntersectionObserver만.

- Hero 진입: CSS fade-in + translateY (opacity 0→1, y 12px→0), 0.5s ease-out, 1회
- 스크롤 등장: IntersectionObserver 1회 fade-in, 0.4s, once
- PROJECTS 그리드: Plus X식 — 카드마다 다른 방향에서 fade+translate (좌/우/상/하 번갈아), stagger 짧게(~30ms)
- 카드 호버: CSS scale(1.02), 0.4s ease-out
- 페이지 전환: opacity fade 0.3s

### 금지
- WebGL/Three.js, 패럴랙스, 스크롤 하이재킹, 자동재생 캐러셀(Gallery 수동 캐러셀 예외)

### 이징 (CSS)
```
--ease-out: cubic-bezier(0.16, 1, 0.3, 1)
```

---

## 11. 이미지 처리
- 포스터: `aspect-ratio: 1/1.414` (A2 세로), object-fit cover, loading lazy
- WebP 우선, PNG fallback
- 배경 블러 없음
- 상세 뷰: 원본 비율, max-height 90vh

---

## 12. 접근성
- WCAG 2.1 AA. 텍스트 #f0f0f0 on #0a0a0a = 18.7:1
- 액센트 #F5C518 on #0a0a0a 대비 충분
- 모든 이미지 alt 필수 (`작가명 - 작품명`)
- focus-visible: `outline: 2px solid #F5C518`
- prefers-reduced-motion: 모든 애니메이션 비활성