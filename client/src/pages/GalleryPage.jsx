import { useEffect } from 'react'
import PageHeader from '../components/ui/PageHeader'
import GalleryCarousel from '../components/gallery/GalleryCarousel'
import FadeIn from '../components/ui/FadeIn'
import PageTransition from '../components/ui/PageTransition'

export default function GalleryPage() {
  useEffect(() => {
    document.title = 'Gallery — 26-1 DAH EXHIBITION'
  }, [])

  return (
    <PageTransition className="pt-10 pb-24">
      <PageHeader title="Gallery" />
      <FadeIn><GalleryCarousel photos={[]} /></FadeIn>
    </PageTransition>
  )
}
