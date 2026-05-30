import { useNavigate, Link } from 'react-router-dom'
import { heroTitle, heroSubtitleKo, heroDesc } from '../../data/about'

const reducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function AboutHero({ animReady = true }) {
  const navigate = useNavigate()

  function anim(name, dur, delay) {
    if (reducedMotion) return {}
    if (!animReady) return { opacity: 0 }
    return { animation: `${name} ${dur} cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both` }
  }

  const bgAnim = reducedMotion ? {} : animReady ? { animation: 'hero-bg-reveal 1.2s ease-out both' } : { opacity: 0 }

  return (
    <section
      style={{ position: 'relative', width: '100%', minHeight: '100vh' }}
      className="flex flex-col justify-center pt-20 pb-16"
    >
      {/* 배경 이미지 */}
      <img
        src="/against/hero.webp"
        alt=""
        loading="eager"
        decoding="async"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          ...bgAnim,
        }}
        onError={e => { e.currentTarget.style.display = 'none' }}
      />

      {/* 그라디언트 오버레이 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,1) 100%)',
        }}
      />

      {/* 기존 텍스트 콘텐츠 */}
      <div style={{ position: 'relative', zIndex: 1 }}>
      <h1
        className="font-body font-black text-text-primary mb-3"
        style={{
          fontSize: 'clamp(56px, 11vw, 140px)',
          lineHeight: '1.15',
          letterSpacing: '-0.02em',
          paddingBottom: '0.1em',
          ...anim('title-clip-reveal', '1.0s', 0),
        }}
      >
        {heroTitle}
      </h1>

      {/* [2] 서브타이틀: reveal 완료 후 순차 fade-up */}
      <h2
        className="font-body font-bold text-text-primary mb-6"
        style={{
          fontSize: 'clamp(22px, 3vw, 44px)',
          wordBreak: 'keep-all',
          ...anim('hero-fade-up', '0.7s', 500),
        }}
      >
        {heroSubtitleKo}
      </h2>

      <p
        className="text-base text-text-muted font-body mb-10 max-w-xl"
        style={{ wordBreak: 'keep-all', ...anim('hero-fade-up', '0.7s', 700) }}
      >
        {heroDesc}
      </p>

      <div style={anim('hero-fade-up', '0.7s', 900)}>
        <Link
          to="/projects"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold font-ui rounded-lg border border-accent text-accent bg-bg-primary hover:bg-bg-elevated transition-colors duration-200"
        >
          전시 작품 보기
        </Link>
      </div>
      </div>
    </section>
  )
}
