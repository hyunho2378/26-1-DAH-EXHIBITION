import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Carousel({ photos = [] }) {
  const [idx, setIdx] = useState(0)

  if (photos.length === 0) {
    return (
      <div className="relative w-full bg-surface flex items-center justify-center" style={{ maxHeight: '90vh', minHeight: '320px' }}>
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs text-text-muted font-ui uppercase tracking-widest">Coming Soon</span>
          <p className="text-sm text-text-muted font-body text-center max-w-xs" style={{ wordBreak: 'keep-all' }}>
            전시 현장 사진은 행사 이후 업데이트됩니다.
          </p>
        </div>
        <button
          aria-label="이전"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
          disabled
        >
          <ChevronLeft size={32} />
        </button>
        <button
          aria-label="다음"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
          disabled
        >
          <ChevronRight size={32} />
        </button>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <img
        src={photos[idx]}
        alt={`전시 현장 ${idx + 1}`}
        className="w-full object-contain max-h-[90vh]"
        loading="lazy"
      />
      <button
        aria-label="이전"
        onClick={() => setIdx(Math.max(0, idx - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        aria-label="다음"
        onClick={() => setIdx(Math.min(photos.length - 1, idx + 1))}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
      >
        <ChevronRight size={32} />
      </button>
      <p className="text-center text-xs text-text-muted font-ui mt-3">
        {idx + 1} / {photos.length}
      </p>
    </div>
  )
}
