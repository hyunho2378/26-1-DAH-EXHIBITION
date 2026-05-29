import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import ProjectFilter from '../components/project/ProjectFilter'
import SubjectInfoPanel from '../components/project/SubjectInfoPanel'
import ProjectGrid from '../components/project/ProjectGrid'
import { subjects } from '../data/subjects'
import { works } from '../data/works'
import { filterBySubject } from '../utils/workUtils'

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeId = searchParams.get('subject') ?? 'all'

  // 마운트당 1회 셔플 (스크롤/리렌더 시 재셔플 없음)
  const [shuffledAll] = useState(() => shuffle(works))

  useEffect(() => {
    document.title = 'Projects — 26-1 DAH EXHIBITION'
  }, [])

  function handleChange(id) {
    setSearchParams(id === 'all' ? {} : { subject: id }, { replace: true })
  }

  // ALL: 셔플 순서 / 특정 과목: id 순 유지
  const filtered = activeId === 'all' ? shuffledAll : filterBySubject(works, activeId)
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
          <ProjectGrid works={filtered} subject={activeId} />
        </div>
      </div>
    </div>
  )
}
