import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { conceptLines, conceptAccordions } from '../../data/against'

export default function AgainstConcept() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section className="py-12 md:py-16">
      {/* 컨셉 문구 */}
      <div className="mb-10 max-w-2xl flex flex-col gap-3">
        {conceptLines.map((line, i) => (
          <p key={i} className="text-sm text-text-primary font-body leading-relaxed" style={{ wordBreak: 'keep-all' }}>
            {line}
          </p>
        ))}
      </div>

      {/* 아코디언 */}
      <div style={{ borderTop: '1px solid #1f1f1f' }}>
        {conceptAccordions.map((acc, idx) => (
          <div key={idx} style={{ borderBottom: '1px solid #1f1f1f' }}>
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex items-center justify-between py-4 text-left transition-colors duration-200 font-body font-semibold"
              style={{ color: '#f0f0f0' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#F5C518' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#f0f0f0' }}
            >
              <span>{acc.title}</span>
              <ChevronDown
                size={18}
                className="shrink-0 transition-transform duration-300"
                style={{ transform: openIdx === idx ? 'rotate(180deg)' : 'none' }}
              />
            </button>

            <div
              style={{
                maxHeight: openIdx === idx ? '4000px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s ease-out',
              }}
            >
              {/* 제작 의도 — 번호 항목 */}
              {acc.items && (
                <div className="pb-8 flex flex-col gap-6">
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

              {/* AI 활용 — 레이블:값 목록 */}
              {acc.credits && (
                <dl className="pb-6 flex flex-col gap-3">
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
    </section>
  )
}
