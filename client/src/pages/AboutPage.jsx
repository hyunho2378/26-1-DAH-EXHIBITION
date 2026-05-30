import { useEffect } from 'react'
import AboutHero from '../components/about/AboutHero'
import AboutIntro from '../components/about/AboutIntro'
import AboutSchedule from '../components/about/AboutSchedule'
import Divider from '../components/ui/Divider'
import FadeIn from '../components/ui/FadeIn'
import PageTransition from '../components/ui/PageTransition'

export default function AboutPage({ splashDone = true }) {
  useEffect(() => {
    document.title = '26-1 DAH EXHIBITION — 디지털인문예술전공 프로젝트 전시회'
  }, [])

  return (
    <PageTransition>
      <AboutHero animReady={splashDone} />
      <Divider />
      <FadeIn><AboutIntro /></FadeIn>
      <FadeIn delay={80}><AboutSchedule /></FadeIn>
    </PageTransition>
  )
}
