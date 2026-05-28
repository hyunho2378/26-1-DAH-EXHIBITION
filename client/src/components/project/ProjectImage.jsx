import { useState, useRef, useEffect } from 'react'

function thumbOf(src) {
  if (!src || !src.startsWith('/works/')) return src
  return `/works/thumbs/${src.split('/').pop()}`
}

export default function ProjectImage({ src, type, alt, sizes, className = '' }) {
  const [active, setActive] = useState(false)
  const [imgSrc, setImgSrc] = useState(() => thumbOf(src))
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!src) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); obs.disconnect() }
    }, { rootMargin: '300px' })
    if (wrapRef.current) obs.observe(wrapRef.current)
    return () => obs.disconnect()
  }, [src])

  function handleError() {
    if (imgSrc !== src) {
      setImgSrc(src)       // thumb 실패 → 원본 시도
    } else {
      setFailed(true)      // 원본도 실패 → 플레이스홀더
    }
  }

  if (!src) return null

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      {failed ? (
        <div className="absolute inset-0 bg-surface flex items-center justify-center">
          <span className="text-xs text-text-muted font-ui">이미지 준비 중</span>
        </div>
      ) : (
        <>
          {!loaded && <div className="absolute inset-0 bg-surface animate-pulse" />}
          {active && (
            <img
              src={imgSrc}
              alt={alt}
              width="300"
              height="424"
              sizes={sizes}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
              onLoad={() => setLoaded(true)}
              onError={handleError}
            />
          )}
        </>
      )}
    </div>
  )
}
