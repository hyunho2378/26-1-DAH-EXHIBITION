import { useEffect } from 'react'
import PageHeader from '../components/ui/PageHeader'
import ContestSection from '../components/contest/ContestSection'
import PageTransition from '../components/ui/PageTransition'
import { contests } from '../data/contests'

export default function ContestPage() {
  useEffect(() => {
    document.title = 'Contest — 26-1 DAH EXHIBITION'
  }, [])

  return (
    <PageTransition className="pt-10 pb-24">
      <PageHeader title="Contest" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {contests.map((contest, i) => (
          <ContestSection key={contest.id} contest={contest} index={i} />
        ))}
      </div>
    </PageTransition>
  )
}
