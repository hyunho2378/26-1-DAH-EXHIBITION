import FadeIn from '../ui/FadeIn'
import SectionLabel from '../ui/SectionLabel'
import Divider from '../ui/Divider'
import { committee } from '../../data/lucid'

export default function CommitteeList() {
  return (
    <section className="py-12">
      <FadeIn>
        <SectionLabel>Committee</SectionLabel>
        <Divider className="mt-4 mb-8" />
        <dl className="space-y-4 max-w-lg">
          {committee.map((item, i) => (
            <div key={i} className="flex gap-6">
              <dt className="text-xs font-semibold text-text-muted font-ui tracking-wide w-24 shrink-0 pt-0.5">
                {item.role}
              </dt>
              <dd className="text-sm text-text-primary font-body">
                {item.members.join(', ')}
              </dd>
            </div>
          ))}
        </dl>
      </FadeIn>
    </section>
  )
}
