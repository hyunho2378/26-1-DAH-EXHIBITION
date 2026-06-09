import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import { history } from '../../data/history'

export default function HistoryAccordion() {
  const [open, setOpen] = useState(false)

  return (
    <section className="py-12 md:py-16">
      <SectionLabel>역대 전시</SectionLabel>
      <div className="mt-4">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between py-4 text-left transition-colors duration-200 font-body font-semibold"
          style={{ color: '#f0f0f0' }}
        >
          <span>Exhibition History</span>
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
          <ul className="pb-6 space-y-2">
            {history.map((it, i) => (
              <li
                key={i}
                className="text-sm font-body"
                style={{
                  color: it.highlight ? '#F5C518' : '#f0f0f0',
                  fontWeight: it.highlight ? 700 : 400,
                  wordBreak: 'keep-all',
                }}
              >
                {it.year}년 {it.term}&nbsp;&nbsp;{it.title || '(제목 미정)'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
