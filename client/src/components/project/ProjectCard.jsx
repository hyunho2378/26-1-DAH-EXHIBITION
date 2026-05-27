import { Link } from 'react-router-dom'
import AwardBadge from '../ui/AwardBadge'
import ProjectImage from './ProjectImage'

export default function ProjectCard({ work }) {
  return (
    <Link to={`/projects/${work.id}`} className="group block">
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '1 / 1.414', borderRadius: '4px', background: '#141414', border: '1px solid #1f1f1f' }}
      >
        <ProjectImage
          src={work.pages?.[0]}
          type={work.type}
          alt={`${work.author} - ${work.title}`}
          className="transition-transform duration-[400ms] group-hover:scale-[1.02]"
        />
        {work.award && (
          <div className="absolute top-3 right-3 z-10">
            <AwardBadge type={work.award} />
          </div>
        )}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]"
          style={{ background: 'rgba(10,10,10,0.55)' }}
        >
          <p className="text-base font-semibold text-text-primary text-center font-body" style={{ wordBreak: 'keep-all' }}>
            {work.title}
          </p>
          <p className="text-xs text-text-muted text-center font-ui">{work.author}</p>
        </div>
      </div>
    </Link>
  )
}
