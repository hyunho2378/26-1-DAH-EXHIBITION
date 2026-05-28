import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AwardBadge from '../ui/AwardBadge'
import ProjectImage from './ProjectImage'

// 방향 순환: 8가지 조합으로 카드마다 다른 와이프 방향
const DIRS = ['up', 'left', 'up', 'right', 'down', 'right', 'down', 'left']

export default function ProjectCard({ work, index = 0, keycolor = '#F5C518' }) {
  const cardRef = useRef(null)
  const [entered, setEntered] = useState(false)

  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const dir = DIRS[index % DIRS.length]
  // stagger: 열 100ms + 행 80ms, 최대 500ms
  const delay = Math.min((index % 4) * 100 + Math.floor(index / 4) * 80, 500)

  useEffect(() => {
    if (reducedMotion) {
      setEntered(true)
      return
    }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setEntered(true); obs.disconnect() }
    }, { threshold: 0.05 })
    if (cardRef.current) obs.observe(cardRef.current)
    return () => obs.disconnect()
  }, [])

  // anim=true 이면 CSS animation에 시퀀스를 완전히 위임
  // (React transition 방식은 property+transition 동시 변경으로 발화 안 되는 버그가 있음)
  const anim = entered && !reducedMotion

  return (
    <Link to={`/projects/${work.id}`} className="group block card-cv">
      <div
        ref={cardRef}
        className="relative overflow-hidden"
        style={{ aspectRatio: '1 / 1.414', borderRadius: '4px', background: '#0a0a0a', border: '1px solid #1f1f1f' }}
      >
        {/* 이미지 레이어: 와이프 아웃 시 동기 페이드인 */}
        <div
          style={{
            position: 'absolute', inset: 0,
            opacity: reducedMotion ? 1 : (anim ? undefined : 0),
            animation: anim ? `wipe-image-reveal 1.35s linear ${delay}ms both` : 'none',
          }}
        >
          <ProjectImage
            src={work.pages?.[0]}
            type={work.type}
            alt={`${work.author} - ${work.title}`}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="transition-transform duration-[400ms] group-hover:scale-[1.02]"
          />
          {work.award && (
            <div className="absolute top-3 right-3 z-10">
              <AwardBadge type={work.award} />
            </div>
          )}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]"
            style={{ background: 'rgba(10,10,10,0.55)' }}
          >
            <p className="text-base font-semibold text-text-primary text-center font-body" style={{ wordBreak: 'keep-all' }}>
              {work.title}
            </p>
            <p className="text-xs text-text-muted text-center font-ui">{work.author}</p>
          </div>
        </div>

        {/* 키컬러 와이프 오버레이 */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: keycolor,
            zIndex: 1,
            pointerEvents: 'none',
            opacity: anim ? undefined : 0,
            animation: anim ? `wipe-overlay-${dir} 1.35s linear ${delay}ms both` : 'none',
          }}
        />
      </div>
    </Link>
  )
}
