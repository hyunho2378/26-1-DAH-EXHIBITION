import FadeIn from '../ui/FadeIn'
import LogoMark from '../ui/LogoMark'
import { intro } from '../../data/lucid'

export default function LucidIntro() {
  return (
    <section className="py-12 md:py-20">
      <FadeIn>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <LogoMark size={120} className="shrink-0" />
          <p className="text-base md:text-lg text-text-primary font-body leading-relaxed whitespace-pre-line max-w-2xl" style={{ wordBreak: 'keep-all' }}>
            {intro}
          </p>
        </div>
      </FadeIn>
    </section>
  )
}
