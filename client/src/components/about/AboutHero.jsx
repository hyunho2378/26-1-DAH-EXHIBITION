import { useNavigate } from 'react-router-dom'
import FadeIn from '../ui/FadeIn'
import Button from '../ui/Button'
import { heroTitle, heroSubtitleKo, heroDesc } from '../../data/about'

export default function AboutHero() {
  const navigate = useNavigate()

  const scrollDown = () => {
    document.getElementById('about-intro')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-[80vh] flex flex-col justify-center pt-20 pb-16">
      <FadeIn immediate>
        <h1
          className="font-body font-black leading-none text-text-primary mb-3"
          style={{ fontSize: 'clamp(56px, 11vw, 140px)', letterSpacing: '-0.02em' }}
        >
          {heroTitle}
        </h1>
        <h2
          className="font-body font-bold text-text-primary mb-6"
          style={{ fontSize: 'clamp(22px, 3vw, 44px)', wordBreak: 'keep-all' }}
        >
          {heroSubtitleKo}
        </h2>
        <p className="text-base text-text-muted font-body mb-10 max-w-xl" style={{ wordBreak: 'keep-all' }}>
          {heroDesc}
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" to="/projects">전시 작품 보기</Button>
          <Button variant="ghost" onClick={scrollDown}>전시회 소개</Button>
        </div>
      </FadeIn>
    </section>
  )
}
