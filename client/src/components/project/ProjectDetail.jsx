import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import AwardBadge from '../ui/AwardBadge'
import BackLink from '../ui/BackLink'
import ProjectImage from './ProjectImage'

export default function ProjectDetail({ work, prevWork, nextWork }) {
  const hasMembers = work.members && work.members.length > 0

  return (
    <div>
      <div className="mb-6">
        <BackLink to="/projects">Projects 목록으로</BackLink>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* 이미지 */}
        <div className="lg:w-[60%]">
          <div className="w-full" style={{ maxHeight: '90vh', overflow: 'hidden' }}>
            <ProjectImage
              src={work.full}
              type={work.type}
              alt={`${work.author} - ${work.title}`}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* 정보 */}
        <div className="lg:w-[40%] flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-body leading-snug" style={{ wordBreak: 'keep-all' }}>
            {work.title}
          </h1>
          <p className="text-base text-text-muted font-body">{work.author}</p>
          <p className="text-xs font-semibold font-ui tracking-wider uppercase text-accent">{work.subjectName}</p>

          {work.description && (
            <p className="text-sm text-text-primary font-body leading-relaxed" style={{ wordBreak: 'keep-all' }}>
              {work.description}
            </p>
          )}

          {hasMembers && (
            <ul className="flex flex-col gap-1.5 pt-1">
              {work.members.map((m, i) => (
                <li key={i} className="flex flex-col">
                  <span className="text-xs font-semibold text-text-primary font-ui">{m.name}</span>
                  <span className="text-xs text-text-muted font-ui">{m.studentId}, {m.major}</span>
                </li>
              ))}
            </ul>
          )}

          {work.award && <AwardBadge type={work.award} />}
        </div>
      </div>

      {/* 이전/다음 */}
      <div className="flex justify-between mt-16 pt-6" style={{ borderTop: '1px solid #1f1f1f' }}>
        {prevWork ? (
          <Link
            to={`/projects/${prevWork.id}`}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors font-body"
          >
            <ChevronLeft size={16} />
            <span style={{ wordBreak: 'keep-all' }}>{prevWork.title}</span>
          </Link>
        ) : <div />}
        {nextWork && (
          <Link
            to={`/projects/${nextWork.id}`}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors font-body"
          >
            <span style={{ wordBreak: 'keep-all' }}>{nextWork.title}</span>
            <ChevronRight size={16} />
          </Link>
        )}
      </div>
    </div>
  )
}
