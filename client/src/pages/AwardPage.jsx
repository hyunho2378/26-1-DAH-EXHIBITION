import { useEffect } from 'react'
import PageHeader from '../components/ui/PageHeader'
import AwardGrandSection from '../components/award/AwardGrandSection'
import AwardRestSection from '../components/award/AwardRestSection'
import FadeIn from '../components/ui/FadeIn'
import PageTransition from '../components/ui/PageTransition'
import { works } from '../data/works'
import { getAwardWorks } from '../utils/workUtils'

export default function AwardPage() {
  useEffect(() => {
    document.title = 'Award — 26-1 DAH EXHIBITION: Against the Flow'
  }, [])

  const { grand, rest } = getAwardWorks(works)

  return (
    <PageTransition className="pt-10 pb-24">
      <PageHeader title="Award" />

      <FadeIn><AwardGrandSection work={grand[0] ?? null} /></FadeIn>

      <div className="mt-20">
        <FadeIn><AwardRestSection works={rest} /></FadeIn>
      </div>
    </PageTransition>
  )
}
