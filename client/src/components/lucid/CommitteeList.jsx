import FadeIn from '../ui/FadeIn'
import SectionLabel from '../ui/SectionLabel'
import Divider from '../ui/Divider'
import { committee } from '../../data/lucid'

const LEADER_ROLES = ['위원장', '부위원장']

function renderLeaderMember(text) {
  const idx = text.indexOf(' (')
  if (idx === -1) return <span style={{ color: '#f0f0f0', fontWeight: 700 }}>{text}</span>
  const name = text.slice(0, idx)
  const info = text.slice(idx)
  return (
    <>
      <span style={{ color: '#f0f0f0', fontWeight: 700 }}>{name}</span>
      <span style={{ color: '#F5C518' }}>{info}</span>
    </>
  )
}

export default function CommitteeList() {
  return (
    <section className="py-12">
      <FadeIn>
        <SectionLabel>Committee</SectionLabel>
        <Divider className="mt-4 mb-8" />
      </FadeIn>
      <dl className="space-y-4 max-w-lg">
        {committee.map((item, i) => {
          const isLeader = LEADER_ROLES.includes(item.role)
          return (
            <FadeIn key={i} delay={i * 80}>
              <div className="flex gap-6">
                <dt
                  className="text-xs font-ui tracking-wide w-24 shrink-0 pt-0.5"
                  style={{
                    color: isLeader ? '#F5C518' : '#BABABA',
                    fontWeight: isLeader ? 700 : 600,
                  }}
                >
                  {item.role}
                </dt>
                <dd className="text-sm text-text-primary font-body">
                  {isLeader
                    ? renderLeaderMember(item.members[0])
                    : item.members.join(', ')
                  }
                </dd>
              </div>
            </FadeIn>
          )
        })}
      </dl>
    </section>
  )
}
