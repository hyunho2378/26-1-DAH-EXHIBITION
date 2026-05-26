import { useEffect } from 'react'
import PageHeader from '../components/ui/PageHeader'
import AwardGrandSection from '../components/award/AwardGrandSection'
import AwardRestSection from '../components/award/AwardRestSection'
import SectionLabel from '../components/ui/SectionLabel'
import Divider from '../components/ui/Divider'
import { works } from '../data/works'
import { getAwardWorks } from '../utils/workUtils'

export default function AwardPage() {
  useEffect(() => {
    document.title = 'Award — 26-1 DAH EXHIBITION'
  }, [])

  const { grand, rest } = getAwardWorks(works)

  return (
    <div className="pt-10 pb-24">
      <PageHeader title="Award" />

      <section className="mb-16">
        <SectionLabel>최우수상</SectionLabel>
        <Divider className="mt-4 mb-10" />
        <AwardGrandSection work={grand[0] ?? null} />
      </section>

      <section>
        <AwardRestSection works={rest} />
      </section>
    </div>
  )
}
