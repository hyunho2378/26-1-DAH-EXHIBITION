import { useRef, useEffect, useState } from 'react'
import Divider from '../ui/Divider'
import { ExternalLink } from 'lucide-react'

const DIRS = ['up', 'left', 'right']

export default function ContestSection({ contest, index = 0 }) {
  const imgRef = useRef(null)
  const [entered, setEntered] = useState(false)

  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const dir = DIRS[index % DIRS.length]
  const delay = index * 150

  useEffect(() => {
    if (reducedMotion) { setEntered(true); return }
    const el = imgRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) { setEntered(true); return }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setEntered(true); obs.disconnect() }
    }, { threshold: 0.01 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const anim = entered && !reducedMotion

  return (
    <section className="py-6 flex flex-col items-center text-center">
      <h2 className="text-2xl font-semibold text-text-primary font-body mb-2" style={{ wordBreak: 'keep-all' }}>
        {contest.title}
      </h2>
      <Divider className="mb-4 w-full" />

      {/* 키컬러 와이프 이미지 컨테이너 */}
      <div
        ref={imgRef}
        className="relative overflow-hidden mx-auto mb-4"
        style={{ maxWidth: '240px', width: '100%', aspectRatio: '3/4' }}
      >
        {/* 이미지 레이어 */}
        <div
          style={{
            position: 'absolute', inset: 0,
            opacity: reducedMotion ? 1 : (anim ? undefined : 0),
            animation: anim ? `wipe-image-reveal 1.35s linear ${delay}ms both` : 'none',
          }}
        >
          {contest.link ? (
            <a href={contest.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
              <img
                src={`/contest/${contest.id}.webp`}
                alt={contest.title}
                className="w-full h-full"
                style={{ objectFit: 'cover' }}
                onError={e => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement.querySelector('.link-fallback').style.display = 'inline-flex'
                }}
              />
              <span
                className="link-fallback items-center gap-1 text-sm text-text-muted font-body border border-text-muted px-4 py-2 transition-colors duration-200 hover:text-text-primary hover:border-text-primary"
                style={{ display: 'none' }}
              >
                공모전 보러가기
                <ExternalLink size={13} />
              </span>
            </a>
          ) : (
            <img
              src={`/contest/${contest.id}.webp`}
              alt={contest.title}
              className="w-full h-full"
              style={{ objectFit: 'cover' }}
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
          )}
        </div>

        {/* 키컬러 와이프 오버레이 */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: '#F5C518',
            zIndex: 1,
            pointerEvents: 'none',
            opacity: anim ? undefined : 0,
            animation: anim ? `wipe-overlay-${dir} 1.35s linear ${delay}ms both` : 'none',
          }}
        />
      </div>

      {contest.description && (
        <p className="text-base text-text-muted font-body mb-4 leading-relaxed" style={{ wordBreak: 'keep-all' }}>
          {contest.description}
        </p>
      )}
    </section>
  )
}
