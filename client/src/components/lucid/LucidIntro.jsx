import FadeIn from '../ui/FadeIn'
import LogoMark from '../ui/LogoMark'
import Button from '../ui/Button'
import { intro } from '../../data/lucid'

export default function LucidIntro() {
  return (
    <section className="py-12 md:py-20">
      <div className="flex flex-col md:flex-row gap-16 items-start md:items-center">
        <FadeIn delay={0} className="shrink-0">
          <div className="flex flex-col gap-4">
            <LogoMark size={180} />
            <Button variant="ghost" href="https://dah-lucid-site.vercel.app/">
              LUCID 사이트
            </Button>
          </div>
        </FadeIn>
        <FadeIn delay={150} className="flex-1 min-w-0">
          <div>
            {intro.map((sentence, i) => (
              <p
                key={i}
                className="text-base md:text-lg text-text-primary font-body leading-relaxed"
                style={{ wordBreak: 'keep-all', marginBottom: i < intro.length - 1 ? '0.9em' : 0 }}
              >
                {sentence}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
