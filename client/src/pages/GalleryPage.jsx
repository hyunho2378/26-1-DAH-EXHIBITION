import { useEffect } from 'react'
import PageHeader from '../components/ui/PageHeader'
import GalleryCarousel from '../components/gallery/GalleryCarousel'

export default function GalleryPage() {
  useEffect(() => {
    document.title = 'Gallery — 26-1 DAH EXHIBITION'
  }, [])

  return (
    <div className="pt-10 pb-24">
      <PageHeader title="Gallery" />
      <GalleryCarousel photos={[]} />
    </div>
  )
}
