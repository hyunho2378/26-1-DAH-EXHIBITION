import AwardBadge from '../ui/AwardBadge'
import ProjectCard from '../project/ProjectCard'

export default function AwardGrandSection({ work }) {
  if (!work) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <AwardBadge type="grand" />
        <p className="text-sm text-text-muted font-body mt-4" style={{ wordBreak: 'keep-all' }}>
          최우수상 수상작은 6월 이후 공개됩니다.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto">
      <ProjectCard work={work} />
      <div className="mt-4 flex justify-center">
        <AwardBadge type="grand" />
      </div>
    </div>
  )
}
