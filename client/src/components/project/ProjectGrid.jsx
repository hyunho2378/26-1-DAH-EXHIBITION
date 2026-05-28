import { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'

const FALLBACK_COLOR = '#F5C518'

function keyOf(work) {
  const src = work.pages?.[0]
  if (!src) return ''
  return src.replace('/works/', '').replace('.webp', '')
}

export default function ProjectGrid({ works }) {
  const [keycolors, setKeycolors] = useState({})

  useEffect(() => {
    fetch('/works/keycolors.json')
      .then(r => r.json())
      .then(setKeycolors)
      .catch(() => {})
  }, [])

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
        <ProjectCard
          key={work.id}
          work={work}
          index={i}
          keycolor={keycolors[keyOf(work)] ?? FALLBACK_COLOR}
        />
      ))}
    </div>
  )
}
