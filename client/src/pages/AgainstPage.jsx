import { useEffect } from 'react'
import AwardHero from '../components/against/AwardHero'
import HistoryAccordion from '../components/against/HistoryAccordion'
import FadeIn from '../components/ui/FadeIn'
import PageTransition from '../components/ui/PageTransition'

export default function AgainstPage() {
  useEffect(() => {
    document.title = 'Against the Flow — 26-1 DAH EXHIBITION'
  }, [])

  return (
    <PageTransition>
      <FadeIn scale><AwardHero /></FadeIn>
      <FadeIn><HistoryAccordion /></FadeIn>
    </PageTransition>
  )
}
