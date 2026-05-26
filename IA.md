# IA.md — 정보 구조 (Information Architecture)

> 26-1 DAH EXHIBITION — 제17회 디지털인문예술전공 프로젝트 전시회
> 전시명: 흐르는 경계: DAH / 키 비주얼: Against the Flow

---

## 1. 전체 페이지 목록

| 페이지 ID | 경로 | 이름 | 설명 |
|---|---|---|---|
| `about` | `/` | About | 전시 소개, 메인 |
| `against` | `/against` | Against the Flow | 최우수상작 + 전시 컨셉 + 역대 전시 아코디언 |
| `design-system` | `/against/design-system` | Design System | Against 하단 버튼 → 디자인 시스템 페이지 |
| `projects` | `/projects` | Projects | 출품작 전체 (과목별 사이드 필터, 약 90작품) |
| `project-detail` | `/projects/:id` | 작품 상세 | 개별 작품 확대 뷰 |
| `contest` | `/contest` | Contest | 신규 캐릭터/장서표/포스터 공모전 3개 |
| `award` | `/award` | Award | 수상 결과 (최우수 1 + 13) |
| `lucid` | `/lucid` | LUCID | 운영위원회 소개 |
| `gallery` | `/gallery` | Gallery | 전시 현장 사진 캐러셀 (추후) |
| `not-found` | `*` | 404 | 없는 페이지 |

---

## 2. About 페이지 구성

> 스크롤 펼침 구성. 등장은 CSS/IntersectionObserver fade-in (GSAP 금지).

```
[섹션 1] Hero
  - 메인: 제17회 디인예 전시회 / 「흐르는 경계: DAH」 (Barlow Condensed display-hero)
  - 부제: 디지털 기술과 인문학적 상상력이 만나는 창의적인 결과물들을 만나보세요.
  - CTA 2개: [전시 작품 보기 → /projects]  [전시회 소개 → 아래 섹션 스크롤]
  - 진입 fade-in

[섹션 2] 전시회 소개 (본문, 한글, word-break: keep-all)
  디지털인문예술전공의 17번째 기말 프로젝트 전시회 '흐르는 경계: DAH'에 오신 것을 환영합니다.
  본 전시회는 2017년 2학기에 처음 개최된 이래, 2025년 2학기에 17회를 맞이한 디지털인문예술전공의 주요 행사입니다.
  학생들이 한 학기 동안 탐구하고 제작한 다양한 창작 결과물을 선보이는 자리로 이번 제17회 전시회 '흐르는 경계: DAH'에는
  12개 수업과 동아리에서 총 61개의 작품이 출품되어 디지털 인문 예술의 다양한 가능성을 보여줍니다.
  전시회는 온/오프라인 동시에 진행되며, 오프라인 전시는 2025년 12월 02일(화)부터 04일(목)까지 일송기념도서관 4층 C.Square에서
  자유롭게 관람하실 수 있습니다. 시상식은 12월 04일(목) 오후 6시, 일송기념도서관 4층 C.Square에서 진행될 예정입니다.
  제17회 디지털인문예술전공 프로젝트 전시회를 빛내주신 모든 분께 진심으로 감사드리며
  학우분들의 많은 참여와 격려를 부탁드립니다. 감사합니다.

  ※ 위 본문은 운영자가 추후 수정. 데이터는 src/data/about.js 상수로 분리.

[섹션 3] 주요 행사 일정
  오프라인 전시회 일정
    일시: 2025년 12월 02일 (화) ~ 12월 04일 (목)
    장소: 한림대학교 일송기념도서관 4층 C.Square
  시상식 일정
    일시: 2025년 12월 04일 (목) 18:00 ~
    장소: 한림대학교 일송기념도서관 4층 C.Square
  ※ 날짜는 임시값. 추후 변경.

[섹션 4] Footer (공통)
```

---

## 3. Against the Flow 페이지 구성

```
[상단 — 2컬럼]
  좌측: 수상작 포스터 (A2 비율, 너무 크지 않게 — max-width ~440px)
  우측: 텍스트
    제17회 디지털인문예술전공 기말 프로젝트 전시회
    일     시: 2025.12.02.(화) - 12.04.(목) 도서관 4층 C.Square
    시 상 식: 2025.12.04(목) 도서관 4층 C.Square(Blue), 오후 6시 ~
    주     최: 디지털인문예술전공, SW중심대학사업, 디지털인문학연구소
    ※ 임시값. 추후 수정.

[중단 — 역대 전시 아코디언]
  현재 회차 강조 (텍스트 #F5C518 + bold):
    2026년 1학기  Against the Flow
  이하 #f0f0f0 → hover #F5C518:
    2025년 2학기  흐르는 경계: DAH
    2025년 1학기  Pulse
    2024년 2학기  NEXUS: 연결의 시작
    2024년 1학기  Free-child
    2023년 2학기  무한
    2023년 1학기  흐름
    2022년 2학기  Display 공존
    2022년 1학기  팔레트
    2021년 2학기  샛별
    2021년 1학기  모두 DAH 함께
    2020년 2학기  전시회, 우리들의 축제
    2020년 1학기  내 손 안의 작은 전시회
    2019년 2학기  그래서 우리는 DAH다
    2019년 1학기  DAH:다
    2018년 2학기  (제목 미정)
    2018년 1학기  (제목 미정)
    2017년 2학기  (제목 미정)
  ※ 데이터는 src/data/history.js 배열로 분리. 각 항목 펼치면 설명 영역(빈칸, 추후 채움).

[하단 — Design System 진입 버튼]
  Primary 버튼: "Design System →" → /against/design-system 이동
```

---

## 4. Design System 페이지 (/against/design-system)

```
디자인 시스템 공개 페이지. 컬러 토큰, 타이포 스케일, 컴포넌트 상태 시각화.
- COLOR TOKENS (스와치 + HEX)
- TYPOGRAPHY (스케일 샘플)
- COMPONENTS (사이드 필터/카드 hover/네비/버튼/배지)
- SPACING / RADIUS
[← Back to Against the Flow]
```

---

## 5. Projects 페이지 구성

```
[데스크탑] 좌측 세로 사이드 필터 + 우측 그리드
[모바일]   상단 가로 스크롤 칩 + 그리드

[사이드 필터] — ALL + 과목 13개 (src/data/subjects.js)
  ALL / 디지털인문예술입문 / 디지털디자인1 / UX디자인 / 한국문화와콘텐츠개발 /
  문화원형과 고전콘텐츠 / 디지털문화콘텐츠마케팅 / 문화콘텐츠기초 / AI디자인 /
  스토리텔링창작실습 / 디지털디자인3 / 지역혁신연구방법론 / 디인예 전공 동아리 / 자율 프로젝트

[선택 과목 정보 패널] (ALL 아닐 때 그리드 위 표시)
  [과목명]
  지도교수: [빈칸 — 운영자 입력]
  [과목 설명 — subjects.js의 description, word-break keep-all]

[그리드]
  모바일 2 / 태블릿 3 / 데스크탑 4 / 와이드 5 컬럼
  카드: 이미지만, 외부 텍스트 없음
  hover: 중앙 작품명 + 한 줄 아래 과목명
  진입: Plus X식 방향 fade (좌/우/상/하 번갈아)

[클릭] → /projects/:id
```

---

## 6. Project Detail 페이지

```
[2컬럼: 데스크탑 / 1컬럼: 모바일]
좌측(60%): 작품 이미지 대형 (max 90vh), GIF 자동재생
우측(40%):
  작품명 (heading-xl)
  팀명/작가명 (body-lg, #BABABA)
  과목명 (caption, #F5C518)
  작품 설명 (body-md, 있을 경우)
  수상 배지 (있을 경우)
  [← Back]
[하단] 이전/다음 작품 화살표
```

---

## 7. Contest 페이지 구성

```
[헤더] "Contest"
[공모전 3개 섹션 — src/data/contests.js]
  1. 신규 캐릭터 공모전
  2. 장서표 디자인 공모전
  3. 전시회 포스터 공모전
  각 섹션: 공모전명 + 설명(빈칸, 추후) + 출품작 큐레이션 그리드 또는 링크
```

---

## 8. Award 페이지 구성

```
[헤더] "Award"
[최우수상] 1자리 — 크게 (PosterCard 대형 1개)
[그 외] 13자리 — 아래로 그리드 (소형)
※ 수상작 데이터는 6/4 이후 입력. 지금은 섹션 골격 + 플레이스홀더만.
```

---

## 9. LUCID 페이지 구성

```
[인트로]
  물감은 섞일수록 어두워지지만, 빛은 섞일수록 밝고 투명해집니다.
  LUCID는 인문과 기술, 다양한 전공이 모인 이곳에서 나다움을 잃지 않으면서도
  서로를 빛내주는 시너지를 만들고자 합니다.
  다양한 색이 모여 만드는 가장 눈부신 가능성을 마음껏 펼칠 수 있도록
  2026년 한 해 동안 여러분의 길잡이가 되겠습니다.
  ※ 좌측에 LUCID/디인예 SVG 로고 자리 확보 (placeholder)

[COMMITTEE — 운영위원회 구성] (src/data/lucid.js committee)
  위원장      주현호(디지털인문예술 22)
  부위원장    윤현아(디지털인문예술 23)
  기획부      한수빈, 김소연
  홍보부      여동규, 김지연, 송은채, 정민서
  웹전시부    임지우, 임세연

[HISTORY — 연혁] (src/data/lucid.js history)
  2025  제7대 학생회 CUBE     권서영, 최서연
  2024  제6대 학생회 채움      송유경, 심재연
  2023  제5대 학생회 DX        윤호용, 원수정
  2022  제4대 학생회 OPEN      곽선재, 윤숙영
  2021  제3대 학생회 DEAR      안유미, 오소민
  2020  제2대 학생회 Harmonies 김도경, 정예찬
  2019  제1대 학생회 Curtain Up 송채원, 박재정
  2018  임시 학생회            주영훈, 김도경
  2017  임시 학생회            신소령, 이해솔
```

---

## 10. Gallery 페이지 구성

```
[헤더] "Gallery"
[캐러셀] 가로 사진 캐러셀 — < > 좌우 화살표만. 사진은 추후 추가.
  현재: 빈 상태 placeholder + < > 컨트롤 골격
```

---

## 11. 네비게이션 플로우

```
About (/)
  ├── [전시 작품 보기]    → /projects
  ├── Against the Flow    → /against → [Design System] → /against/design-system
  ├── Contest             → /contest
  ├── Award               → /award
  ├── LUCID               → /lucid
  └── Gallery             → /gallery

Projects (/projects)
  └── [카드 클릭] → /projects/:id → [Back/Prev/Next]
```

---

## 12. 데이터 구조

```js
// src/data/subjects.js — 과목 13개 (사이드 필터 + 정보 패널)
export const subjects = [
  { id: 'all', name: 'ALL', professor: '', track: '', description: '' },
  { id: 'intro',     name: '디지털인문예술입문', professor: '', track: '공통 기초',
    description: '전공 기초 과목으로, 이론보다는 실습을 통해 디지털 기술을 가볍게 경험합니다. 트렌디한 생성형 AI와 데이터 분석 도구를 활용해 나만의 디지털 프로젝트와 웹사이트를 직접 만들어보며 전공에 대한 흥미를 높입니다.' },
  { id: 'dd1',       name: '디지털디자인1', professor: '', track: '미래융합디자인',
    description: '디자인의 기초인 형태, 색상, 폰트를 배우는 입문 수업입니다. 어도비 일러스트레이터와 포토샵 기초를 익혀 나만의 포스터, 패턴, 굿즈 등을 직접 제작해보며 시각적 표현 능력을 기릅니다.' },
  { id: 'ux',        name: 'UX디자인', professor: '', track: '미래융합디자인',
    description: 'UX(사용자 경험) 디자인의 기초 이론과 실무를 배우는 수업입니다. 팀 프로젝트를 통해 실제 서비스의 UX를 기획하고 디자인하는 과정을 경험하며, 최신 트렌드와 현업 사례를 통해 실무 감각을 익힙니다.' },
  { id: 'kcontent',  name: '한국문화와콘텐츠개발', professor: '', track: '문화예술콘텐츠',
    description: '전 세계적으로 인기 있는 K-콘텐츠의 힘이 어디서 오는지 배웁니다. 한국 고유의 문화와 이야기를 분석하고, 이를 바탕으로 글로벌 시장에 통할 수 있는 새로운 콘텐츠를 직접 기획해 봅니다.' },
  { id: 'classic',   name: '문화원형과 고전콘텐츠', professor: '', track: '문화예술콘텐츠',
    description: '옛이야기나 고전 문학이 현대의 드라마, 영화, 게임으로 어떻게 재탄생하는지 탐구합니다. 한국의 고전 서사를 분석하고, 이를 현대적인 감각으로 재해석하여 새로운 문화 콘텐츠로 기획하는 실습을 합니다.' },
  { id: 'marketing', name: '디지털문화콘텐츠마케팅', professor: '', track: '문화예술콘텐츠',
    description: '문화예술 분야의 마케팅 전략을 배우는 수업입니다. 구글 애널리틱스 같은 디지털 도구의 기초를 익히고, 공연이나 음악 같은 문화 콘텐츠를 사람들에게 효과적으로 알리는 마케팅 기획을 실습합니다.' },
  { id: 'ccbasic',   name: '문화콘텐츠기초', professor: '', track: '공통 기초',
    description: '문화콘텐츠 산업 전반을 이해하고 기획자의 눈을 키우는 입문 수업입니다. K-콘텐츠의 흐름과 성공 사례를 분석하고, 팀 프로젝트를 통해 웹툰의 영상화 기획이나 유행하는 밈 분석 등 흥미로운 주제를 다룹니다.' },
  { id: 'aidesign',  name: 'AI디자인', professor: '', track: '미래융합디자인',
    description: '챗GPT나 미드저니 같은 생성형 AI를 디자인 파트너로 활용하는 법을 배웁니다. AI와 협업하여 시장을 조사하고, 로고나 패키지 디자인 같은 브랜드 이미지를 창의적으로 만드는 브랜딩 디자인을 기말 프로젝트로 진행합니다.' },
  { id: 'storytelling', name: '스토리텔링창작실습', professor: '', track: '문화예술콘텐츠',
    description: '우리 주변의 문화적 소재를 찾아 매력적인 이야기로 만드는 실습 수업입니다. 팀 프로젝트를 통해 기획부터 디자인 제작까지 함께하며, 이야기를 시각적인 결과물로 완성해 전시하는 경험을 합니다.' },
  { id: 'dd3',       name: '디지털디자인3', professor: '', track: '미래융합디자인',
    description: '실제 스마트폰 앱 서비스의 UX를 개선하는 실전형 수업입니다. UX 디자인을 실무 수준에서 정밀하게 배울 수 있으며, 각 조사 단계를 실제로 거치면서 단계부터 논리, 과정을 경험할 수 있습니다.' },
  { id: 'regional',  name: '지역혁신연구방법론', professor: '', track: 'AI디지털인문학',
    description: '빅데이터를 활용해 우리 지역의 문제를 해결하는 방법을 배웁니다. 설문조사와 인터뷰 데이터를 AI 도구로 분석하여, 지역 사회에 도움이 되는 실질적인 해결책을 제안하는 프로젝트를 진행합니다.' },
  { id: 'club',      name: '디인예 전공 동아리', professor: '', track: '동아리',
    description: '' },
  { id: 'free',      name: '자율 프로젝트', professor: '', track: '자율',
    description: '' },
]

// src/data/works.js — 작품 (약 90개, 추후 채움)
// author: 개인이면 본인 이름, 팀이면 팀명 (UI에 라벨 없이 값만 노출)
// members: 개인 작품 → [] / 팀 작품 → [{ name, studentId, major }]
export const works = [
  {
    id: '001',
    title: '작품명',
    author: '팀명 또는 개인 이름',
    subjectId: 'ux',          // subjects.js id 참조
    subjectName: 'UX디자인',
    description: '',
    type: 'png',              // 'png' | 'gif' | 'webp'
    thumbnail: '/works/001/thumbnail.webp',
    full: '/works/001/full.webp',
    award: null,              // null | 'grand' | 'excellence' | 'encouragement'
    members: [],              // 팀 작품: [{ name, studentId, major }] / 개인: []
  },
  // ...
]
```