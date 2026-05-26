import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import Divider from '../ui/Divider'
import { history } from '../../data/lucid'

export default function HistoryList() {
  const [open, setOpen] = useState(false)

  return (
    <section className="py-12">
      <SectionLabel>History</SectionLabel>
      <Divider className="mt-4 mb-6" />
      <div style={{ borderBottom: '1px solid #1f1f1f' }}>
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
              <div key={i} className="flex gap-6">
                <dt className="font-ui text-xs font-semibold text-text-muted tracking-wide w-12 shrink-0 pt-0.5">
                  {item.year}
                </dt>
                <div>
                  <dd className="text-sm font-semibold text-text-primary font-body">{item.name}</dd>
                  <dd className="text-xs text-text-muted font-body mt-0.5">{item.members.join(', ')}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
