import FadeIn from '../ui/FadeIn'
import SectionLabel from '../ui/SectionLabel'
import Divider from '../ui/Divider'
import { schedule } from '../../data/about'

export default function AboutSchedule() {
  const items = [schedule.exhibition, schedule.awards]

  return (
    <section className="py-16 md:py-24">
      <FadeIn>
        <SectionLabel number="02">주요 행사 일정</SectionLabel>
        <Divider className="mt-4 mb-8" />
        <dl className="space-y-8 max-w-2xl">
          {items.map((item, i) => (
            <div key={i}>
              <dt className="text-sm font-semibold text-accent font-ui tracking-wide mb-2">{item.label}</dt>
              <dd className="text-base text-text-primary font-body" style={{ wordBreak: 'keep-all' }}>
                {item.date}
              </dd>
              <dd className="text-sm text-text-muted font-body mt-1" style={{ wordBreak: 'keep-all' }}>
                {item.venue}
              </dd>
              {i < items.length - 1 && <Divider className="mt-6" />}
            </div>
          ))}
        </dl>
      </FadeIn>
    </section>
  )
}
