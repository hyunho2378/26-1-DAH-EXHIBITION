import FadeIn from '../ui/FadeIn'
import ProjectCard from './ProjectCard'

const DIRS = ['up', 'left', 'right', 'down']

export default function ProjectGrid({ works }) {
  if (works.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <span className="text-xs text-text-muted font-ui uppercase tracking-widest">출품작 없음</span>
        <p className="text-sm text-text-muted font-body text-center max-w-xs" style={{ wordBreak: 'keep-all' }}>
          해당 과목의 출품작이 아직 등록되지 않았습니다.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
      {works.map((work, i) => (
        <FadeIn key={work.id} direction={DIRS[i % 4]} delay={Math.min(i * 30, 400)}>
          <ProjectCard work={work} />
        </FadeIn>
      ))}
    </div>
  )
}
