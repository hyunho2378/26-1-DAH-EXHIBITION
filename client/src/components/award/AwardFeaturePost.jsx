import { Link } from 'react-router-dom'

const supportingPhotos = [
  {
    src: '/awards/2026-gangneung-award-handover-1.jpg',
    alt: '강릉페이 UX 개선 프로젝트 우수상 수여 장면',
  },
  {
    src: '/awards/2026-gangneung-award-handover-2.jpg',
    alt: '강릉페이 UX 개선 프로젝트 우수상 수여 후 인사 장면',
  },
  {
    src: '/awards/2026-gangneung-award-scene.jpg',
    alt: '강릉페이 UX 개선 프로젝트 수상 현장 사진',
  },
]

const recognitions = [
  '2026 제18회 디지털인문예술전공 프로젝트 전시회 ‘강릉페이 UX 개선 프로젝트’ 우수상',
  '2026-1 지역사회 문제해결 PBL 경진대회 ‘강릉 시민을 위한 로컬 결제 경험 개선 프로젝트’ 우수상(총장상)',
]

export default function AwardFeaturePost() {
  return (
    <article className="mb-20 border-y border-border-subtle py-8 md:py-10" aria-labelledby="gangneung-award-title">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)] lg:gap-10">
        <div className="min-w-0">
          <img
            src="/awards/2026-gangneung-excellence-front.jpg"
            alt="강릉페이 UX 개선 프로젝트 우수상 수상 사진"
            className="aspect-[4/3] w-full border border-border-default object-cover"
            fetchPriority="high"
          />
          <div className="mt-3 grid grid-cols-3 gap-3">
            {supportingPhotos.map(photo => (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full border border-border-default object-cover"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5">
          <div>
            <p className="mb-3 font-ui text-xs font-semibold uppercase tracking-[0.15em] text-accent">2026 / Award record</p>
            <h2 id="gangneung-award-title" className="font-body text-2xl font-bold leading-snug text-text-primary md:text-3xl" style={{ wordBreak: 'keep-all' }}>
              강릉페이 UX 개선 프로젝트
            </h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-text-muted" style={{ wordBreak: 'keep-all' }}>
              전공 프로젝트 전시회와 지역사회 문제해결 PBL 경진대회에서 받은 두 수상 기록을 한 게시물로 정리했습니다.
            </p>
          </div>

          <ol className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
            {recognitions.map((recognition, index) => (
              <li key={recognition} className="flex gap-4 py-4">
                <span className="shrink-0 font-ui text-xs font-semibold tabular-nums text-accent">0{index + 1}</span>
                <p className="font-body text-sm leading-relaxed text-text-primary" style={{ wordBreak: 'keep-all' }}>{recognition}</p>
              </li>
            ))}
          </ol>

          <Link
            to="/projects/003"
            className="inline-flex min-h-11 w-fit items-center border border-border-default px-4 py-2 font-body text-sm font-semibold text-text-primary transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            포트폴리오에서 프로젝트 보기 <span aria-hidden="true" className="ml-2">↗</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
