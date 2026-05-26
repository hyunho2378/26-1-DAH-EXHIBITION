import FadeIn from '../ui/FadeIn'
import SectionLabel from '../ui/SectionLabel'
import Divider from '../ui/Divider'
import { introBody } from '../../data/about'

export default function AboutIntro() {
  return (
    <section id="about-intro" className="py-16 md:py-24">
      <FadeIn>
        <SectionLabel number="01">전시회 소개</SectionLabel>
        <Divider className="mt-4 mb-8" />
        <p className="text-base text-text-primary font-body leading-relaxed max-w-3xl whitespace-pre-line" style={{ wordBreak: 'keep-all' }}>
          {introBody}
        </p>
      </FadeIn>
    </section>
  )
}
