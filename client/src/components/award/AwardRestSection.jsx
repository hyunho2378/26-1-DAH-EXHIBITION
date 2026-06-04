import { useState, useEffect } from 'react'
import ProjectCard from '../project/ProjectCard'

const FALLBACK_COLOR = '#F5C518'

function keyOf(work) {
  const src = work.pages?.[0]
  if (!src) return ''
  return src.replace('/works/', '').replace('.webp', '')
}

const labelStyle = {
  border: '1px solid #F5C518',
  color: '#F5C518',
  background: 'transparent',
  padding: '8px 16px',
  borderRadius: '8px',
  display: 'inline-block',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  fontFamily: "'SUIT Variable', 'SUIT', sans-serif",
}

export default function AwardRestSection({ works }) {
  const [keycolors, setKeycolors] = useState({})

  useEffect(() => {
    fetch('/works/keycolors.json')
      .then(r => r.json())
      .then(setKeycolors)
      .catch(() => {})
  }, [])

  if (works.length === 0) return null

  return (
    <div>
      <div className="flex justify-center mb-8">
        <span style={labelStyle}>우수상</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
        {works.map((work, i) => (
          <ProjectCard
            key={work.id}
            work={work}
            index={i}
            keycolor={keycolors[keyOf(work)] ?? FALLBACK_COLOR}
          />
        ))}
      </div>
    </div>
  )
}
