import { useEffect } from 'react'
import AboutHero from '../components/about/AboutHero'
import AboutIntro from '../components/about/AboutIntro'
import AboutSchedule from '../components/about/AboutSchedule'
import Divider from '../components/ui/Divider'

export default function AboutPage() {
  useEffect(() => {
    document.title = '26-1 DAH EXHIBITION — 디지털인문예술전공 프로젝트 전시회'
  }, [])

  return (
    <>
      <AboutHero />
      <Divider />
      <AboutIntro />
      <Divider />
      <AboutSchedule />
    </>
  )
}
