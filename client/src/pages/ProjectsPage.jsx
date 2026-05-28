import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import ProjectFilter from '../components/project/ProjectFilter'
import SubjectInfoPanel from '../components/project/SubjectInfoPanel'
import ProjectGrid from '../components/project/ProjectGrid'
import { subjects } from '../data/subjects'
import { works } from '../data/works'
import { filterBySubject } from '../utils/workUtils'

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeId = searchParams.get('subject') ?? 'all'

  useEffect(() => {
    document.title = 'Projects — 26-1 DAH EXHIBITION'
  }, [])

  function handleChange(id) {
    setSearchParams(id === 'all' ? {} : { subject: id }, { replace: true })
  }

  const filtered = filterBySubject(works, activeId)
  const activeSubject = subjects.find(s => s.id === activeId)

  return (
    <div className="pt-10 pb-24">
      <PageHeader title="Projects" />

      {/* 모바일 필터 */}
      <div className="lg:hidden mb-6">
        <ProjectFilter subjects={subjects} activeId={activeId} onChange={handleChange} />
      </div>

      <div className="flex gap-10">
        {/* 데스크탑 사이드 필터 */}
        <div className="hidden lg:block">
          <ProjectFilter subjects={subjects} activeId={activeId} onChange={handleChange} />
        </div>

        {/* 콘텐츠 */}
        <div className="flex-1 min-w-0">
          <SubjectInfoPanel subject={activeSubject} />
          <ProjectGrid works={filtered} />
        </div>
      </div>
    </div>
  )
}
