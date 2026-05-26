import ProjectCard from '../project/ProjectCard'

export default function AwardRestSection({ works }) {
  if (works.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <p className="text-sm text-text-muted font-body" style={{ wordBreak: 'keep-all' }}>
          수상작은 6월 이후 공개됩니다.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {works.map(work => (
        <ProjectCard key={work.id} work={work} />
      ))}
    </div>
  )
}
