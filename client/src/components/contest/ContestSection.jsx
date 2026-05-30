import { useRef, useEffect, useState } from 'react'
import Divider from '../ui/Divider'
import { ExternalLink } from 'lucide-react'

const DIRS = ['up', 'left', 'right']

export default function ContestSection({ contest, index = 0 }) {
  const imgRef = useRef(null)
  const [entered, setEntered] = useState(false)
  const [hovered, setHovered] = useState(false)

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
  const imgScale = hovered && !reducedMotion ? 'scale(1.03)' : 'scale(1)'

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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          maxWidth: '240px',
          width: '100%',
          aspectRatio: '3/4',
          borderRadius: '4px',
          border: `1px solid ${hovered ? '#F5C518' : '#2a2a2a'}`,
          boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.5)' : 'none',
          transition: 'border-color 0.3s ease, box-shadow 0.4s ease',
        }}
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
                style={{
                  objectFit: 'cover',
                  transform: imgScale,
                  transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                }}
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
              style={{
                objectFit: 'cover',
                transform: imgScale,
                transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
              }}
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

        {/* 호버 힌트 텍스트 */}
        {contest.link && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '8px 12px',
              background: 'rgba(10,10,10,0.7)',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            <span className="text-xs text-text-primary font-ui tracking-wide">공모전 보러가기</span>
          </div>
        )}
      </div>

      {contest.description && (
        <p className="text-base text-text-muted font-body mb-4 leading-relaxed" style={{ wordBreak: 'keep-all' }}>
          {contest.description}
        </p>
      )}
    </section>
  )
}
