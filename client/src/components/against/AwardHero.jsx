import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { againstInfo } from '../../data/about'
import { conceptLines, conceptAccordions } from '../../data/against'

const reducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const anim = (name, dur, delay) =>
  reducedMotion ? {} : { animation: `${name} ${dur} cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both` }

export default function AwardHero() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section className="py-12 md:py-20">
      <div className="flex flex-col md:flex-row gap-10 md:gap-16">

        {/* 좌측: 포스터 */}
        <div className="shrink-0" style={{ maxWidth: '440px', width: '100%', ...anim('poster-reveal', '1.0s', 100) }}>
          <img
            src="/against/against-the-flow.webp"
            alt="Against the Flow 포스터"
            className="block"
            style={{ aspectRatio: '1 / 1.414', width: '100%', objectFit: 'cover' }}
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </div>

        {/* 우측 텍스트 블록 — 포스터 높이만큼 stretch, 상/하단 그룹 space-between */}
        <div className="flex flex-col flex-1 min-w-0 justify-between">

          {/* 상단 그룹: 제목 / 전시 정보 / 작가 */}
          <div>
            {/* 제목: 전체 기본색, "Against the Flow"만 gold */}
            <h2
              className="text-xl md:text-2xl font-black text-text-primary font-body leading-snug mb-6"
              style={{ wordBreak: 'keep-all', ...anim('hero-fade-up', '0.7s', 200) }}
            >
              제18회 디지털인문예술전공 프로젝트 전시회:{' '}
              <span style={{ color: '#F5C518' }}>Against the Flow</span>
            </h2>

            {/* 전시 정보 */}
            <dl className="flex flex-col" style={{ gap: '20px', ...anim('hero-fade-up', '0.7s', 350) }}>
              {againstInfo.rows.map((row, i) => (
                <div key={i}>
                  <dt className="text-xs font-semibold text-text-muted font-ui tracking-widest uppercase mb-1">
                    {row.label}
                  </dt>
                  <dd className="text-sm text-text-primary font-body leading-relaxed" style={{ wordBreak: 'keep-all' }}>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* 작가 표기 — 한 줄 + 하단 구분선 */}
            <div className="mt-8 pb-6 mb-8" style={{ borderBottom: '1px solid #1f1f1f', ...anim('hero-fade-up', '0.7s', 425) }}>
              <p className="font-body font-bold text-text-primary" style={{ fontSize: '1.05rem' }}>
                주현호{' '}
                <span className="text-text-muted font-normal" style={{ fontSize: '0.8rem' }}>
                  (20222583, 디지털인문예술전공)
                </span>
              </p>
            </div>
          </div>

          {/* 하단 그룹: 작품 설명 + 아코디언 + 버튼 */}
          <div>
            {/* 작품 설명 (conceptLines) — 화이트, 이탤릭 */}
            <div className="flex flex-col gap-3" style={anim('hero-fade-up', '0.7s', 500)}>
              {conceptLines.map((line, i) => (
                <p key={i} className="text-sm font-body leading-relaxed" style={{ color: '#f0f0f0', fontStyle: 'italic', wordBreak: 'keep-all' }}>
                  {line}
                </p>
              ))}
            </div>

            {/* 아코디언 */}
            <div className="mt-8" style={{ borderTop: '1px solid #1f1f1f', ...anim('hero-fade-up', '0.7s', 650) }}>
              {conceptAccordions.map((acc, idx) => (
                <div key={idx} style={{ borderBottom: '1px solid #1f1f1f' }}>
                  <button
                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                    className="w-full flex items-center justify-between py-4 text-left transition-colors duration-200 font-body font-semibold text-sm"
                    style={{ color: '#f0f0f0' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#F5C518' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#f0f0f0' }}
                  >
                    <span>{acc.title}</span>
                    <ChevronDown
                      size={18}
                      className="shrink-0"
                      style={{ transform: openIdx === idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s ease' }}
                    />
                  </button>

                  <div
                    style={{
                      maxHeight: openIdx === idx ? '4000px' : '0',
                      opacity: openIdx === idx ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease',
                    }}
                  >
                    {acc.items && (
                      <div className="pt-8 pb-8 flex flex-col gap-6">
                        {acc.items.map(item => (
                          <div key={item.num}>
                            <p className="text-xs font-semibold text-accent font-ui mb-2 tracking-wider">
                              {item.num}. {item.head}
                            </p>
                            <div className="flex flex-col gap-1.5 pl-4" style={{ borderLeft: '2px solid #2A2A2A' }}>
                              {item.paras.map((para, pi) => (
                                <p key={pi} className="text-sm text-text-primary font-body leading-relaxed" style={{ wordBreak: 'keep-all' }}>
                                  {para}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {acc.credits && (
                      <dl className="pt-8 pb-6 flex flex-col gap-3">
                        {acc.credits.map((c, ci) => (
                          <div key={ci} className="flex flex-col sm:flex-row sm:gap-6">
                            <dt className="text-xs font-semibold text-text-muted font-ui tracking-wider shrink-0 sm:w-48">
                              {c.label}
                            </dt>
                            <dd className="text-sm text-text-primary font-body" style={{ wordBreak: 'keep-all' }}>
                              {c.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}
