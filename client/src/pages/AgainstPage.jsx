import { useEffect } from 'react'
import AwardHero from '../components/against/AwardHero'
import AgainstConcept from '../components/against/AgainstConcept'
import HistoryAccordion from '../components/against/HistoryAccordion'
import DesignSystemCTA from '../components/against/DesignSystemCTA'
import Divider from '../components/ui/Divider'
import FadeIn from '../components/ui/FadeIn'
import PageTransition from '../components/ui/PageTransition'

export default function AgainstPage() {
  useEffect(() => {
    document.title = 'Against the Flow — 26-1 DAH EXHIBITION'
  }, [])

  return (
    <PageTransition>
      <FadeIn scale><AwardHero /></FadeIn>
      <Divider />
      <FadeIn><AgainstConcept /></FadeIn>
      <Divider />
      <FadeIn><HistoryAccordion /></FadeIn>
      <Divider />
      <FadeIn delay={60}><DesignSystemCTA /></FadeIn>
    </PageTransition>
  )
}
