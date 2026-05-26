import { useEffect } from 'react'
import AwardHero from '../components/against/AwardHero'
import HistoryAccordion from '../components/against/HistoryAccordion'
import DesignSystemCTA from '../components/against/DesignSystemCTA'
import Divider from '../components/ui/Divider'

export default function AgainstPage() {
  useEffect(() => {
    document.title = 'Against the Flow — 26-1 DAH EXHIBITION'
  }, [])

  return (
    <>
      <AwardHero />
      <Divider />
      <HistoryAccordion />
      <Divider />
      <DesignSystemCTA />
    </>
  )
}
