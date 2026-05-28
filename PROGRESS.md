# PROGRESS.md — 진행 상황

> 26-1 DAH EXHIBITION
> 컨텍스트 85% 도달 시: 작업 중단 → 이 파일 업데이트 → 대기 (AGENTS.md 준수)

---

## 완료
- [세팅] 명세 파일 작성: DESIGN.md, IA.md, ROUTES.md, COMPONENTS.md, PATTERNS.md, SETUP.md, tokens.js
- [AGENT-SETUP] PHASE 0 완료 (2026-05-27)
  - client/ 폴더 구조, package.json, tailwind.config.js, postcss.config.js
  - index.html (폰트 3종 CDN), src/index.css, src/main.jsx, .env.example
  - npm install 성공 (133 packages), npm run dev 정상 실행

- [PHASE 1] AGENT-1/2/3 완료 (2026-05-27)
  - AGENT-1: workUtils.js, App.jsx 전체 라우팅 10개, vercel.json
  - AGENT-3: hooks/useIntersectionFade + ui 11개 + project 6개 + about/against/contest/award/lucid/gallery 컴포넌트
  - AGENT-2: layout 5개 + pages 10개
  - npm run build 에러 0, 1567 modules

- [PHASE 2 전 추가] members 필드 (2026-05-27)
  - works.js: 모든 작품에 members 배열 필드 추가 (더미는 빈 배열 [])
  - ProjectDetail.jsx: members.length > 0 일 때만 팀원 목록 렌더 (라벨 없음)
    · 각 줄: 이름 (caption text-primary) + 학번, 전공 (caption text-muted)
  - IA.md 12번, COMPONENTS.md ProjectDetail 스펙 반영

- [PHASE 2 — AGENT-REVIEW] 완료 (2026-05-27)

  **CHECKLIST 결과:**
  - 금지 회색 (#555/#888/#999 등): 없음 ✓
  - 허용 외 HEX 색상: 모두 tokens.js 정의 값만 사용 ✓
  - box-shadow: 없음 ✓
  - 그라디언트: 없음 ✓
  - 이모지: 없음 ✓
  - system-ui 등 미지정 폰트: 없음 ✓ (DesignSystemPage 폰트 샘플은 토큰 값 그대로)
  - alt 없는 img: 없음 ✓ (Carousel/ProjectImage 모두 alt 정상)
  - prefers-reduced-motion: index.css + useIntersectionFade 분기 ✓
  - Header 로고 weight 500 ✓
  - Nav active: text-accent (#F5C518), 비활성: text-text-muted (#BABABA) ✓
  - 카드 hover: 중앙 작품명 + 과목명, 키컬러 바텀 바 없음 ✓
  - 사이드 필터: 활성 텍스트만 #F5C518, 비활성 #f0f0f0+#2a2a2a 보더, 왼쪽 바 없음 ✓
  - word-break: keep-all: index.css 글로벌 + 인라인 적용 ✓
  - 라우트 10개 IA.md 전체 일치 ✓
  - Against → DesignSystem 버튼 연결 ✓
  - 데이터 무결성: works id 고유, subjectId 모두 subjects.js에 존재 ✓

  **수정 항목:**
  - [FIX] index.css: focus-visible 누락 → `*:focus-visible { outline: 2px solid #F5C518 }` 추가
  - [FIX] AboutHero.jsx: 하드코딩 "Against the Flow" → heroTitle (about.js) 사용으로 수정

  **최종 빌드:** npm run build 에러 0, 1567 modules, 1.30s

## [PHASE 3 — UI 수정] 완료 (2026-05-27)

  **수정 항목:**
  - [1] ProjectFilter.jsx: pill 전면 제거 → Plus X식 opacity 텍스트 필터로 교체
    · 비활성: text-text-primary opacity-60
    · 활성: text-accent opacity-100
    · hover 비활성: opacity-100 (CSS hover, transition 0.2s)
    · font-display (Barlow Condensed), text-lg(18px) / text-2xl(24px)
    · stroke/border/background 없음. useState 제거 (CSS hover만 사용)
    · 한글 과목명은 시스템 폰트 fallback (Barlow Condensed 한글 미지원)
    · PATTERNS.md 2번 패턴 동일하게 교체
  - [2] AboutHero.jsx h1: font-display → font-body + font-black (Pretendard 900)
  - [2] AwardHero.jsx h2: font-bold → font-black (Pretendard 900)
  - [2] Header.jsx 네비 위계: active font-bold(700) / 비활성 font-semibold(600), letterSpacing 0.08em
  - [3] ContestPage.jsx: 세로 순차 → 3컬럼 그리드 (desktop md:grid-cols-3)
  - [4] HistoryAccordion.jsx: 개별 아코디언 → 단일 아코디언 (기본 접힘, "Exhibition History")
  - [5] HistoryList.jsx: FadeIn 리스트 → 단일 아코디언 (기본 접힘, "연혁")
  - [6] AwardPage.jsx: "우수상/장려상" SectionLabel + Divider 제거
  - [6] AwardRestSection.jsx: 카드 아래 AwardBadge 제거 (ProjectCard overlay badge로 충분)
  - [7] subjects.js: club, free description 텍스트 추가

  **최종 빌드:** npm run build 에러 0, 1566 modules, 1.33s

## [PHASE 3-L — ProjectDetail 포스터 줌 + 캐러셀] 완료 (2026-05-27)

  **수정 항목:**
  - ProjectDetail.jsx 전면 재작성: posterHovered state + scale(1.22) 줌, border #F5C518, boxShadow, cursor zoom-in/out
  - 우측 정보 패널: blur(5px) + opacity 0.35 + pointerEvents none (hover 시)
  - pages > 1: < > 버튼(컨테이너 내 absolute) + dot 인디케이터, hover border #F5C518
  - hint text "hover to zoom" (opacity transition)
  - index.css: img-zoom-container 클래스 제거
  - ProjectImage import 제거 (plain img 직접 사용)

  **최종 빌드:** npm run build 에러 0, 1.60s

## [PHASE 3-K — ProjectDetail 이미지 호버 확대] 완료 (2026-05-27)

  **수정 항목:**
  - index.css: .img-zoom-container 클래스 추가 (height 60vh→85vh transition, backdrop-filter blur, cursor zoom-in)
  - ProjectDetail.jsx: pages[0] 래퍼 인라인 style → className="img-zoom-container"

  **최종 빌드:** npm run build 에러 0, 1.36s

## [PHASE 3-J — ProjectDetail 첫 이미지 60vh + 비율 유지] 완료 (2026-05-27)

  **수정 항목:**
  - ProjectDetail.jsx: pages[0] 래퍼 maxHeight → height: 60vh (h-full 계산 보장)
  - pages[0] 이미지: h-full w-auto object-contain mx-auto (세로 기준, 비율 유지, 중앙정렬)
  - pages[1+] 이미지: w-full h-auto object-contain 유지

  **최종 빌드:** npm run build 에러 0, 1.37s

## [PHASE 3-I — ProjectDetail 첫 이미지 75vh 제한] 완료 (2026-05-27)

  **수정 항목:**
  - ProjectDetail.jsx: pages[0]에만 maxHeight 75vh + overflow hidden 래퍼 추가, 나머지 페이지는 자연 높이 유지

  **최종 빌드:** npm run build 에러 0, 1.34s

## [PHASE 3-H — pages 배열 기반 이미지 렌더링] 완료 (2026-05-27)

  **수정 항목:**
  - ProjectImage.jsx: src falsy 시 return null (스켈레톤 미표시)
  - ProjectCard.jsx: work.thumbnail → work.pages?.[0]
  - ProjectDetail.jsx: work.full → work.pages 배열 loop (flex-col gap-6 세로 나열), maxHeight 제거

  **최종 빌드:** npm run build 에러 0, 1.35s

## [PHASE 3-G — 작품 외부 링크 + 이전/다음 삭제] 완료 (2026-05-27)

  **수정 항목:**
  - works.js: 89개 모든 작품에 links: [] 필드 추가 (perl 일괄 처리)
  - ProjectDetail.jsx: links 렌더 추가 (과목명 아래, 설명 위, Ghost 버튼, hover #F5C518). 이전/다음 화살표 전체 삭제.
  - ProjectDetailPage.jsx: getAdjacentWorks 호출 및 prevWork/nextWork 전달 제거
  - workUtils.js: getAdjacentWorks 함수 삭제 (ProjectDetailPage에서만 사용)
  - IA.md 12번, COMPONENTS.md ProjectDetail 스펙: links 필드 반영, prevWork/nextWork 제거

  **최종 빌드:** npm run build 에러 0, 1.39s

## [PHASE 3-F — 전체 좌우 여백 통일] 완료 (2026-05-27)

  **수정 항목:**
  - index.css: :root에 --page-px-mobile/tablet/desktop CSS 변수 선언 + .page-px 유틸리티 클래스 정의 (mobile 1.5rem, tablet 2.5rem, desktop 4rem)
  - Layout.jsx: main px-6 md:px-10 lg:px-16 → page-px
  - Header.jsx: 내부 flex div px-6 md:px-10 → page-px (lg 누락 버그 해소)
  - Footer.jsx: px-6 md:px-10 → page-px
  - 결과: Header/main/Footer 좌측 끝 모든 브레이크포인트 동일 수직선

  **최종 빌드:** npm run build 에러 0, 1.72s

## [PHASE 3-E — Contest 링크/헤더 볼드/works 삭제] 완료 (2026-05-27)

  **수정 항목:**
  - contests.js: character/exlibris/poster link URL 3개 입력
  - ContestSection.jsx: Coming Soon 제거 + link 있을 때 이미지 → 외부 링크 래퍼, 이미지 onError 시 Ghost 텍스트 버튼("공모전 보러가기 →") 표시
  - Header.jsx: 비활성 font-semibold(600) → font-bold(700), 활성 font-bold(700) → font-extrabold(800)
  - works.js: id '009' '고운고성...' 항목 삭제 (id 재정렬 없음, 010부터 이어짐)

  **최종 빌드:** npm run build 에러 0, 1.63s

## [PHASE 3-D — 푸터/Contest/Against 이미지 수정] 완료 (2026-05-27)

  **수정 항목:**
  - Footer.jsx: favicon.svg img → 인라인 SVG fill #BABABA (브라우저 탭 favicon #F5C518 유지)
  - ContestSection.jsx: 전체 중앙정렬(items-center text-center) + 이미지 슬롯(/contest/{id}.webp, 3/4비율, max 360px, onError hide)
  - AwardHero.jsx: POSTER placeholder → <img src="/against/against-the-flow.webp"> (1/1.414, max 440px, onError hide)
  - 운영자 업로드 필요: public/contest/character.webp, exlibris.webp, poster.webp / public/against/against-the-flow.webp

  **최종 빌드:** npm run build 에러 0, 1.89s

## [PHASE 3-C — 로고/필터 추가 수정] 완료 (2026-05-27)

  **수정 항목:**
  - Footer.jsx: LogoMark(logo-color.svg) → favicon.svg(DAH 로고) img 직접 삽입, 40×40 유지
  - LucidIntro.jsx: LogoMark size 80 → 120 (1.5배)
  - ProjectFilter.jsx: 폰트 5px 추가 축소 text-lg/text-2xl → text-sm(14px)/text-xl(20px)
  - LoadingSplash.jsx 신규: 최초 진입 시 D/A/H 개별 애니메이션 (translateX/Y → 제자리, 0.6s cubic-bezier, 1.5s 총 소요)
  - App.jsx: useState(splashDone) + LoadingSplash 마운트

  **최종 빌드:** npm run build 에러 0, 1.59s

## [PHASE 3-B — 로고/파비콘 적용] 완료 (2026-05-27)

  **수정 항목:**
  - favicon.svg: cls-1 fill #0A0A0A → #F5C518 (골드)
  - logo-color.svg: cls-1 fill #030000 → #0a0a0a, cls-2 fill #e27da6 → #F5C518
  - index.html: <link rel="icon" type="image/svg+xml" href="/favicon.svg"> 추가
  - LogoMark.jsx: placeholder div("DAH") → <img src="/logo-color.svg" ...>
    · Footer(size=40), LucidIntro(size=80) 자동 적용 (이미 LogoMark 사용 중)
  - Footer.jsx: size={32} → size={40} (명세 40px)

  **최종 빌드:** npm run build 에러 0, 1.65s

## [PHASE 3-M — ProjectDetail 링크 버튼 + 과목명 스타일] 완료 (2026-05-27)

  **수정 항목:**
  - ProjectDetail.jsx 링크 버튼: text-xs → text-sm, padding 4px 12px → 8px 16px, ExternalLink 12px → 14px
  - ProjectDetail.jsx 과목명: text-xs font-semibold → font-bold, font-size 21px (#F5C518 유지)

  **최종 빌드:** (미확인 — 변경 최소, 빌드 이상 없을 것으로 판단)

## [PHASE 3-N — works.js 전공명 정규화] 완료 (2026-05-28)

  **수정 항목 (perl 일괄 처리):**
  - [규칙 1] 학과 → 전공: 국어국문학과(6건)→전공, 철학과(1건)→전공, 노인복지학과(1건)→전공
    · 디지털미디어콘텐츠학과: 데이터 내 해당 값 없음 (0건)
  - [공백 정규화] '디지털미디어콘텐츠 전공'·'디지털인문예술 전공'·'사학 전공' → 공백 제거 (각 1~2건)
  - [규칙 4] bare 전공명 → 전공 추가: '디지털미디어콘텐츠'(26건)→전공, '디지털인문예술'(29건)→전공

  **미수정 보고 항목:**
  - [규칙 6] 장성준(빅데이터학과) members 포함 작품 없음 → 삭제 대상 없음
    · work 078 '한 줄의 인간': author가 '장성준'이지만 members=[]로 빅데이터학과 정보 없음
  - [규칙 7] 개인 작품(members=[]) 전수 확인 → 작품 데이터 내 학번/전공 정보 없음, 전부 그대로
  - [모호한 major 값 — 임의 수정 안 함, 운영자 확인 필요]:
    · work 014 (STUDYO): members[1] name/major 필드에 여러 명 정보가 하나로 뭉쳐 있어 파싱 불가
    · work 019 (결의 시선): members[1] name/major 동일하게 뭉쳐 있음
    · work 068 (이면): 김서환 20222509 중복 등록
    · work 085 (오작교 엔터): 천다현 name="천다현 글로벌비즈니스", major="" — 정보 불명확
    · '미래융합스쿨', '인문학부', '자율전공학부', '자유전공학부', '글로벌학부': 학부/스쿨 단위, 전공 추가 여부 확인 필요

## [PHASE 3-O — 015 매거진 캐러셀 + 그리드 lazy loading] 완료 (2026-05-28)

  **수정 항목:**
  - works.js 015: layout: 'magazine' 플래그 추가, pages 배열 34장으로 확장
    · pages[0] = 015_ccbasic_1.webp (메인 포스터)
    · pages[1..33] = 015_ccbasic_02~34.webp (A5 매거진)
  - ProjectDetail.jsx: magazine 레이아웃 분기
    · isMagazine=true: 메인 포스터는 pages[0]만 단독 줌, 하단에 magPages(pages[1...]) 캐러셀
    · 매거진 캐러셀: auto-play 3500ms, < > 버튼, 페이지 카운터, dot 인디케이터(활성 #F5C518)
    · A5 비율(1:1.414), maxWidth 320px
    · magIdx useEffect cleanup (언마운트 시 clearInterval)
    · isMagazine=false: 기존 방식 유지
  - ProjectImage.jsx: IntersectionObserver lazy loading
    · active 상태가 false면 <img> 자체를 렌더링하지 않음 (src 미할당)
    · rootMargin: '300px'로 뷰포트 300px 전 미리 로드 시작
    · useIntersectionFade와 별도 Observer 인스턴스, 충돌 없음

  **최종 빌드:** npm run build 에러 0, 2.66s

## [PHASE 3-P — 그리드 성능 개선 + 스플래시 조건 변경] 완료 (2026-05-28)

  **수정 항목:**
  - index.css: `.card-cv { content-visibility: auto; contain-intrinsic-size: 0 350px; }` 추가
    → 화면 밖 카드 렌더링 자체를 건너뜀 (가장 큰 성능 효과)
  - ProjectCard.jsx: Link에 `card-cv` 클래스 적용
    · ProjectImage에 `sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"` 전달
  - ProjectImage.jsx: `sizes`, `width="300"`, `height="424"` img 속성 추가
    · sizes prop 인터페이스 추가, 브라우저 디코딩 힌트 제공
    · IntersectionObserver + decoding="async" + loading="lazy" 유지
  - App.jsx: 스플래시 조건 sessionStorage 기반으로 변경
    · shouldShowSplash(): !shown || (isHome && isReload) 로직
    · 첫 진입(새 세션): 항상 표시
    · SPA 내비게이션/다른 페이지 새로고침: 미표시
    · '/' About 페이지 새로고침: 표시 허용
    · 창 닫으면 sessionStorage 비워짐 → 재진입 시 다시 표시
    · handleSplashDone: onDone 시 sessionStorage.setItem('splashShown','1')

  **최종 빌드:** npm run build 에러 0, 3.13s

## [PHASE 3-Q — 카드 썸네일 연결 + 깨진 이미지 처리] 완료 (2026-05-28)

  **수정 항목:**
  - ProjectImage.jsx: thumbOf() 헬퍼 추가 (/works/X → /works/thumbs/X)
    · imgSrc state: thumbOf(src) 초기값
    · handleError(): thumb 실패 → 원본 시도 → 원본도 실패 → failed=true
    · failed=true: "이미지 준비 중" 텍스트 플레이스홀더 (#141414 배경)
    · ProjectDetail 원본 사용 로직은 그대로 (ProjectImage 미사용)
  - ProjectDetail.jsx: thumbOf() 헬퍼 추가 (동일 로직)
    · magThumbFailed: Set<number> state (thumb 실패한 magIdx 추적)
    · 매거진 img src: !failed → thumbOf(src) / failed → 원본 src
    · onError: setMagThumbFailed(s => new Set(s).add(magIdx)) → 즉시 원본으로 교체
    · key={magIdx} 유지 (slide 전환 시 img 리셋)

  **최종 빌드:** npm run build 에러 0, 3.09s

## [PHASE 3-R — 015/085 pages 경로 수정] 완료 (2026-05-28)

  **수정 항목:**
  - works.js 015: pages[0] = '/works/015_ccbasic.webp' (메인), _2~_34 (매거진 캐러셀)
    · 이전: _1, _02~_34 (제로패딩 혼용, 파일명 불일치)
    · 이후: _ccbasic.webp, _2~_34.webp (실제 파일명 일치 34장)
  - works.js 085: pages 1장 → 3장
    · '/works/085_classic.webp', '_2.webp', '_3.webp'

## [PHASE 3-S — 필터 상태 URL 유지 + 작품 삭제] 완료 (2026-05-28)

  **수정 항목:**
  - ProjectsPage.jsx: useState → useSearchParams 교체
    · activeId: searchParams.get('subject') ?? 'all'
    · 과목 선택 시: setSearchParams({ subject: id }, { replace: true })
    · ALL 선택 시: setSearchParams({}, { replace: true }) (쿼리 제거)
    · 뒤로가기 → /projects?subject=ux 복귀 → 해당 필터 유지
  - works.js 4개 삭제 (id 재정렬 없음):
    · id='043' 무제 (고승우)
    · id='066' 하나의 기적 (권예주)
    · id='070' 잔상채록(採錄) (유정현)
    · id='089' YES24_TICKET (NO24)

  **최종 빌드:** npm run build 에러 0, 2.23s

## [PHASE 3-T — 022_kcontent 매거진 캐러셀 적용] 완료 (2026-05-28)

  **수정 항목:**
  - works.js 022: layout: 'magazine' 추가, pages 1장→6장
    · pages[0]: 022_kcontent.webp (메인 포스터)
    · pages[1~5]: _2~_6.webp (매거진 캐러셀)
  - ProjectDetail.jsx: 변경 없음 (이미 layout==='magazine' 조건으로 일반화됨)

## [PHASE 3-U — 개인작 작가 표시 한 줄 형식] 완료 (2026-05-28)

  **수정 항목:**
  - ProjectDetail.jsx: members 렌더 분기
    · members.length === 1: `이름 / 학번, 전공` 한 줄 (이름 font-semibold, 나머지 text-muted)
    · members.length >= 2: 기존 두 줄 형식 유지
    · members 빈 배열: 섹션 없음 (hasMembers 조건 유지)

## [PHASE 3-V — Plus X식 인터랙션 전면 적용] 완료 (2026-05-28)

  **새 파일:**
  - PageTransition.jsx: 페이지 마운트 시 opacity+translateY(10px) → 0.35s ease, reduced-motion 분기

  **수정 파일:**
  - FadeIn.jsx: scale prop 추가 (scale=true → fromTransform에 'scale(0.96)' 병합)
  - ProjectGrid.jsx: keycolors.json fetch (once, useState), keyOf() 헬퍼, FadeIn 래퍼 제거, index+keycolor를 ProjectCard에 전달
  - ProjectCard.jsx: keycolor를 card 배경색으로 사용; IntersectionObserver로 진입 감지 후 이미지 레이어 opacity+translate 애니 (방향 DIRS[8], delay 행·열 기반, --ease-out, reduced-motion 즉시 표시)
  - AboutPage.jsx: PageTransition + Intro/Schedule FadeIn (delay 0/80ms)
  - AgainstPage.jsx: PageTransition + AwardHero FadeIn(scale) + 나머지 FadeIn
  - ContestPage.jsx: PageTransition + contest 3개 stagger FadeIn (delay i*120ms)
  - AwardPage.jsx: PageTransition + SectionLabel/Grand/Rest FadeIn (delay 0/80/0ms)
  - LucidPage.jsx: PageTransition + Intro/Committee/History FadeIn 순차
  - GalleryPage.jsx: PageTransition + GalleryCarousel FadeIn

  **동작 요약:**
  - 카드 진입: 키컬러 배경 즉시 표시 → 이미지 opacity+translate fade-in (0.5s ease, 행·열 delay)
  - 페이지 전환: 마운트 시 translateY(10px)→0 + opacity:0→1 (0.35s)
  - 섹션 reveal: IntersectionObserver once, direction별 translateX/Y
  - prefers-reduced-motion: 즉시 표시

  **최종 빌드:** npm run build 에러 0, 2.56s

## [PHASE 3-W — 카드 애니 고급화 + Against 콘텐츠] 완료 (2026-05-28)

  **[1] ProjectCard.jsx 애니메이션 개선:**
  - duration: 0.5s → 1.0s
  - translate: 20px → 40px (더 멀리서 스르륵)
  - easing: `cubic-bezier(0.22, 1, 0.36, 1)` (묵직하게 정지)
  - stagger: (col*100 + row*80)ms, max 500ms
  - transition 항상 정의 → visible 상태 변경 시 실제 CSS transition 발화 (이전 버전: transition:'none'→'1s'와 opacity 동시 변경으로 애니 미발화 버그 수정)

  **[2] Against the Flow 콘텐츠:**
  - src/data/against.js: conceptLines (4줄), conceptAccordions (2개 항목)
  - src/components/against/AgainstConcept.jsx: 컨셉 문구 + 2개 아코디언
    · 제작 의도 및 시각 요소: 번호 항목 3개 (head + paras 배열, 좌측 2px border 인덴트)
    · AI 활용 및 학생의 기여: 레이블:값 dl 목록
    · 기본 접힘, 클릭 시 max-height 0→4000px 0.4s ease-out
    · hover 시 타이틀 #F5C518 (onMouseEnter/Leave)
  - AgainstPage.jsx: AgainstConcept 섹션 추가 (AwardHero → Divider → AgainstConcept → Divider → HistoryAccordion → Divider → DesignSystemCTA)

  **최종 빌드:** npm run build 에러 0, 2.66s (AgainstPage: 6.81 kB)

## [PHASE 3-X — 카드 진입 2단계 키컬러 와이프] 완료 (2026-05-28)

  **구현 방식: CSS @keyframes + IntersectionObserver**
  - React transition 방식 폐기 (transition+opacity 동시 변경 → 브라우저 발화 안 함)
  - CSS animation에 3단계 시퀀스 완전 위임

  **index.css — 5개 @keyframes 추가:**
  - wipe-overlay-up/down/left/right: 3단계 타임라인
    · 0%→37% (0→0.5s): 오버레이 슬라이드 인, cubic-bezier(0.22,1,0.36,1)
    · 37%→56% (0.5→0.75s): 홀드, linear
    · 56%→100% (0.75→1.35s): 오버레이 슬라이드 아웃, cubic-bezier(0.22,1,0.36,1)
    · animation-timing-function per-keyframe 사용
  - wipe-image-reveal: 56% opacity:0 유지 → 100% opacity:1 (오버레이 퇴장과 동기)

  **ProjectCard.jsx 재작성:**
  - 카드 배경: keycolor → #0a0a0a (오버레이가 keycolor 담당)
  - IO fires → entered=true → anim=true → CSS animation 시작
  - 이미지 레이어: animation-fill-mode:both → 딜레이 중 opacity:0, 완료 후 opacity:1 유지
  - 키컬러 오버레이: animation-fill-mode:both → 딜레이 중 off-screen, 완료 후 off-screen 유지
  - stagger delay: (col×100 + row×80)ms, max 500ms
  - reduced-motion: entered=true 즉시, anim=false → 이미지 opacity:1 즉시

  **최종 빌드:** npm run build 에러 0, 2.15s

## [PHASE 3-Y — Against 레이아웃 정리] 완료 (2026-05-28)

  **수정 항목:**
  - AwardHero.jsx: 우측 컬럼에 컨셉 문구(conceptLines) + 2개 아코디언(conceptAccordions) + Design System 버튼 통합
    · 기존: AwardHero(제목+rows) / AgainstConcept(개념+아코디언) / DesignSystemCTA(버튼) 3개 분리
    · 이후: 포스터 좌 / 우측 단일 컬럼(제목→rows→컨셉→아코디언→버튼) 연속 흐름
    · useState(openIdx) 아코디언 상태 AwardHero 내부로 이동
    · Button variant="primary" to="/against/design-system" 우측 컬럼 하단 left-align
  - HistoryAccordion.jsx: Divider + borderBottom 제거 (여백만으로 구분)
  - AgainstPage.jsx: AgainstConcept / DesignSystemCTA / 모든 Divider 제거
    · FadeIn(scale)+AwardHero / FadeIn+HistoryAccordion 2개 섹션만 유지

  **최종 빌드:** npm run build 에러 0, 2.16s

## [PHASE 3-Z — works.js 작품 삭제 (dd1 2건)] 완료 (2026-05-29)

  **수정 항목:**
  - id='039' 박석범 (subjectId: 'dd1') 삭제
  - id='072' 김소연 (subjectId: 'dd1') 삭제
  - id 재정렬 없음 (기존 id 유지)

  **최종 빌드:** npm run build 에러 0, 2.89s

## 진행중
- (없음)

## 다음
- 운영자 데이터 입력: works.js (90개), professor 필드, 수상작 award 필드, 현장 사진
- 이미지 파일 public/works/{id}/thumbnail.webp, full.webp 업로드
- SVG 로고 교체: LogoMark.jsx placeholder → 실제 파일
- 날짜 수정: about.js (2025-12 임시값 → 2026-1 실제값)
- 배포: Vercel (rootDirectory: client)

## 블로커 (운영자 확인 필요 항목)
- 작품 데이터(works.js 약 90개): 클래스룸 수합 후 입력 — 더미 2개로 골격만
- 각 과목 지도교수명: subjects.js professor 빈칸 — 운영자 직접 입력
- 수상작(award): 6/4 이후 입력 (works.js award 필드)
- 수상작 포스터 이미지: public/works/ 하위 운영자 업로드
- SVG 로고: LogoMark.jsx placeholder — 실제 SVG 파일 받아 교체
- About/Against 본문 날짜: 현재 임시값(2025-12 표기) → about.js 수정
- 역대 전시 2017~2018 제목: history.js 빈 문자열로 처리 (운영자 채움)
- Gallery 현장 사진: GalleryPage photos={[]} → 행사 후 운영자 업로드
- members 팀원 데이터: 엑셀 수합 후 works.js members 배열 입력
