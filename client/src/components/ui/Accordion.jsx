import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Accordion({ items }) {
  const [open, setOpen] = useState(null)

  return (
    <div>
      {items.map((it, idx) => (
        <div key={idx} style={{ borderBottom: '1px solid #1f1f1f' }}>
          <button
            onClick={() => setOpen(open === idx ? null : idx)}
            className="w-full flex items-center justify-between py-4 text-left transition-colors duration-200 font-body"
            style={{
              color: it.highlight ? '#F5C518' : '#f0f0f0',
              fontWeight: it.highlight ? 700 : 400,
            }}
          >
            <span>{it.year}년 {it.term}&nbsp;&nbsp;{it.title || '(제목 미정)'}</span>
            <ChevronDown
              size={18}
              className="shrink-0 transition-transform duration-300"
              style={{ transform: open === idx ? 'rotate(180deg)' : 'none' }}
            />
          </button>
          <div
            style={{
              maxHeight: open === idx ? '200px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease-out',
            }}
          >
            <p className="pb-4 text-sm text-text-muted font-body" style={{ wordBreak: 'keep-all' }}>
              {it.body || ''}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
