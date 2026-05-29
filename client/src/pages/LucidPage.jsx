import { useEffect } from 'react'
import PageHeader from '../components/ui/PageHeader'
import LucidIntro from '../components/lucid/LucidIntro'
import CommitteeList from '../components/lucid/CommitteeList'
import HistoryList from '../components/lucid/HistoryList'
import Divider from '../components/ui/Divider'
import FadeIn from '../components/ui/FadeIn'
import PageTransition from '../components/ui/PageTransition'

export default function LucidPage() {
  useEffect(() => {
    document.title = 'LUCID — 26-1 DAH EXHIBITION'
  }, [])

  return (
    <PageTransition className="pt-10 pb-24">
      <PageHeader title="LUCID" subtitle="한림대학교 디지털인문예술전공 운영위원회" />
      <LucidIntro />
      <Divider />
      <CommitteeList />
      <FadeIn><HistoryList /></FadeIn>
    </PageTransition>
  )
}
