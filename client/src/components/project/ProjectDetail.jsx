import { useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import AwardBadge from '../ui/AwardBadge'
import BackLink from '../ui/BackLink'

export default function ProjectDetail({ work }) {
  const [posterHovered, setPosterHovered] = useState(false)
  const [pageIdx, setPageIdx] = useState(0)
  const hasMembers = work.members && work.members.length > 0
  const hasLinks = work.links && work.links.length > 0
  const pages = work.pages ?? []
  const currentSrc = pages[pageIdx]

  const navBtnStyle = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    background: 'rgba(10,10,10,0.6)', border: '1px solid #2A2A2A',
    color: '#f0f0f0', borderRadius: '4px', padding: '6px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', transition: 'border-color 150ms ease, color 150ms ease',
  }

  return (
    <div>
      <div className="mb-6">
        <BackLink to="/projects">Projects 목록으로</BackLink>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* 이미지 */}
        <div className="lg:w-[60%]">
          <div
            onMouseEnter={() => setPosterHovered(true)}
            onMouseLeave={() => setPosterHovered(false)}
            style={{
              position: 'relative',
              height: 'clamp(300px, calc(100vh - 220px), 700px)',
              background: '#111111',
              border: `1px solid ${posterHovered ? '#F5C518' : '#2A2A2A'}`,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: posterHovered ? 'scale(1.22)' : 'scale(1)',
              boxShadow: posterHovered
                ? '0 40px 100px rgba(0,0,0,0.85)'
                : '0 0 0 rgba(0,0,0,0)',
              transition: posterHovered
                ? 'transform 280ms cubic-bezier(0.22,1,0.36,1), box-shadow 280ms ease, border-color 180ms ease'
                : 'transform 480ms cubic-bezier(0.22,1,0.36,1), box-shadow 480ms ease, border-color 350ms ease',
              cursor: posterHovered ? 'zoom-out' : 'zoom-in',
            }}
          >
            {currentSrc && (
              <img
                src={currentSrc}
                alt={`${work.author} - ${work.title}`}
                loading="lazy"
                decoding="async"
                style={{ height: '100%', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            )}

            {pages.length > 1 && pageIdx > 0 && (
              <button
                onClick={e => { e.stopPropagation(); setPageIdx(i => i - 1) }}
                style={{ ...navBtnStyle, left: 10 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#F5C518'; e.currentTarget.style.color = '#F5C518' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#f0f0f0' }}
                aria-label="이전 페이지"
              >
                <ChevronLeft size={16} />
              </button>
            )}
            {pages.length > 1 && pageIdx < pages.length - 1 && (
              <button
                onClick={e => { e.stopPropagation(); setPageIdx(i => i + 1) }}
                style={{ ...navBtnStyle, right: 10 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#F5C518'; e.currentTarget.style.color = '#F5C518' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#f0f0f0' }}
                aria-label="다음 페이지"
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>

          {pages.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '12px' }}>
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPageIdx(i)}
                  style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    padding: 0, border: 'none',
                    background: i === pageIdx ? '#F5C518' : '#2A2A2A',
                    cursor: 'pointer',
                    transition: 'background 200ms ease',
                  }}
                  aria-label={`${i + 1}번 페이지`}
                />
              ))}
            </div>
          )}

          <p style={{
            fontSize: '10px',
            color: '#BABABA',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginTop: '10px',
            textAlign: 'center',
            userSelect: 'none',
            opacity: posterHovered ? 0 : 0.7,
            transition: 'opacity 200ms ease',
          }}>
            hover to zoom
          </p>
        </div>

        {/* 정보 */}
        <div
          className="lg:w-[40%] flex flex-col gap-4"
          style={{
            filter: posterHovered ? 'blur(5px)' : 'blur(0px)',
            opacity: posterHovered ? 0.35 : 1,
            pointerEvents: posterHovered ? 'none' : 'auto',
            transition: posterHovered
              ? 'filter 280ms ease, opacity 280ms ease'
              : 'filter 480ms ease, opacity 480ms ease',
          }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-body leading-snug" style={{ wordBreak: 'keep-all' }}>
            {work.title}
          </h1>
          <p className="text-base text-text-muted font-body">{work.author}</p>
          <p className="font-bold font-ui tracking-wider uppercase text-accent" style={{ fontSize: '21px' }}>{work.subjectName}</p>

          {hasLinks && (
            <div className="flex flex-row flex-wrap gap-2">
              {work.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-body transition-colors duration-200"
                  style={{ border: '1px solid #2a2a2a', color: '#f0f0f0', borderRadius: '8px', padding: '8px 16px' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#F5C518'; e.currentTarget.style.color = '#F5C518' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#f0f0f0' }}
                >
                  {link.label}
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          )}

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
    </div>
  )
}
