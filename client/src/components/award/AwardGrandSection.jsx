import { useState, useEffect } from 'react'
import ProjectCard from '../project/ProjectCard'

const FALLBACK_COLOR = '#F5C518'

function detailOf(src) {
  if (!src || !src.startsWith('/works/')) return src
  return `/works/detail/${src.split('/').pop()}`
}

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

export default function AwardGrandSection({ work }) {
  const [keycolors, setKeycolors] = useState({})

  useEffect(() => {
    fetch('/works/keycolors.json')
      .then(r => r.json())
      .then(setKeycolors)
      .catch(() => {})
  }, [])

  if (!work) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <span style={labelStyle}>최우수상</span>
      </div>
    )
  }

  const keycolor = keycolors[keyOf(work)] ?? FALLBACK_COLOR
  const detailWork = {
    ...work,
    pages: [detailOf(work.pages?.[0]), ...(work.pages?.slice(1) ?? [])],
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <span style={labelStyle}>최우수상</span>
      <div className="w-1/2 md:w-1/3 lg:w-1/5">
        <ProjectCard work={detailWork} index={0} keycolor={keycolor} />
      </div>
    </div>
  )
}
