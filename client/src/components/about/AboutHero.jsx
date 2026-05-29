import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { heroTitle, heroSubtitleKo, heroDesc } from '../../data/about'

const reducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const anim = (name, dur, delay) =>
  reducedMotion ? {} : { animation: `${name} ${dur} cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both` }

export default function AboutHero() {
  const navigate = useNavigate()

  const scrollDown = () => {
    document.getElementById('about-intro')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-[80vh] flex flex-col justify-center pt-20 pb-16">
      <h1
        className="font-body font-black leading-none text-text-primary mb-3"
        style={{
          fontSize: 'clamp(56px, 11vw, 140px)',
          letterSpacing: '-0.02em',
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
          ...anim('hero-fade-up', '0.7s', 1600),
        }}
      >
        {heroSubtitleKo}
      </h2>

      <p
        className="text-base text-text-muted font-body mb-10 max-w-xl"
        style={{ wordBreak: 'keep-all', ...anim('hero-fade-up', '0.7s', 1800) }}
      >
        {heroDesc}
      </p>

      <div className="flex flex-wrap gap-4" style={anim('hero-fade-up', '0.7s', 2000)}>
        <Button variant="primary" to="/projects">전시 작품 보기</Button>
        <Button variant="ghost" onClick={scrollDown}>전시회 소개</Button>
      </div>
    </section>
  )
}
