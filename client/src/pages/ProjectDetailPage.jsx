import { useEffect } from 'react'
import { useParams, useLocation, Navigate } from 'react-router-dom'
import ProjectDetail from '../components/project/ProjectDetail'
import { works } from '../data/works'
import { getWorkById } from '../utils/workUtils'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const { state } = useLocation()
  const work = getWorkById(works, id)

  useEffect(() => {
    if (work) document.title = `${work.title} — 26-1 DAH EXHIBITION`
  }, [work])

  if (!work) return <Navigate to="/404" replace />

  return (
    <div className="pt-10 pb-24">
      <ProjectDetail work={work} fromSubject={state?.subject ?? 'all'} />
    </div>
  )
}
