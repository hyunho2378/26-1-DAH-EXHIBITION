import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import FadeIn from '../ui/FadeIn'
import SectionLabel from '../ui/SectionLabel'
import { history } from '../../data/lucid'

// '제N대 학생회 NAME' 에서 N과 NAME을 #F5C518 강조. 임시 학생회는 그대로.
function renderName(name) {
  const m = name.match(/^(제)(\d+)(대 학생회 )(.+)$/)
  if (!m) return <span>{name}</span>
  const [, pre, num, mid, council] = m
  return (
    <>
      {pre}
      <span style={{ color: '#F5C518' }}>{num}</span>
      {mid}
      <span style={{ color: '#F5C518' }}>{council}</span>
    </>
  )
}

export default function HistoryList() {
  const [open, setOpen] = useState(false)

  return (
    <section className="py-12">
      <SectionLabel>History</SectionLabel>
      <div className="mt-6">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between py-4 text-left transition-colors duration-200 font-body font-semibold"
          style={{ color: '#f0f0f0' }}
        >
          <span>연혁</span>
          <ChevronDown
            size={18}
            className="shrink-0 transition-transform duration-300"
            style={{ transform: open ? 'rotate(180deg)' : 'none' }}
          />
        </button>
        <div
          style={{
            maxHeight: open ? '2000px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease-out',
          }}
        >
          <dl className="pb-6 space-y-4 max-w-lg">
            {history.map((item, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="flex gap-6">
                  <dt className="font-ui text-xs font-semibold text-text-muted tracking-wide w-12 shrink-0 pt-0.5">
                    {item.year}
                  </dt>
                  <div>
                    <dd className="text-sm font-semibold text-text-primary font-body">
                      {renderName(item.name)}
                    </dd>
                    <dd className="text-xs text-text-muted font-body mt-0.5">{item.members.join(', ')}</dd>
                  </div>
                </div>
              </FadeIn>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
