import { useEffect } from 'react'
import PageHeader from '../components/ui/PageHeader'
import AwardGrandSection from '../components/award/AwardGrandSection'
import AwardRestSection from '../components/award/AwardRestSection'
import SectionLabel from '../components/ui/SectionLabel'
import Divider from '../components/ui/Divider'
import FadeIn from '../components/ui/FadeIn'
import PageTransition from '../components/ui/PageTransition'
import { works } from '../data/works'
import { getAwardWorks } from '../utils/workUtils'

export default function AwardPage() {
  useEffect(() => {
    document.title = 'Award — 26-1 DAH EXHIBITION'
  }, [])

  const { grand, rest } = getAwardWorks(works)

  return (
    <PageTransition className="pt-10 pb-24">
      <PageHeader title="Award" />

      <section className="mb-16">
        <FadeIn><SectionLabel>최우수상</SectionLabel></FadeIn>
        <Divider className="mt-4 mb-10" />
        <FadeIn delay={80}><AwardGrandSection work={grand[0] ?? null} /></FadeIn>
      </section>

      <section>
        <FadeIn><AwardRestSection works={rest} /></FadeIn>
      </section>
    </PageTransition>
  )
}
