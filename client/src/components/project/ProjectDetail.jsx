import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import AwardBadge from '../ui/AwardBadge'
import BackLink from '../ui/BackLink'

function thumbOf(src) {
  if (!src || !src.startsWith('/works/')) return src
  return `/works/thumbs/${src.split('/').pop()}`
}

export default function ProjectDetail({ work, fromSubject = 'all' }) {
  const [posterHovered, setPosterHovered] = useState(false)
  const [pageIdx, setPageIdx] = useState(0)
  const [magIdx, setMagIdx] = useState(0)
  const [magThumbFailed, setMagThumbFailed] = useState(() => new Set())
  const hasLinks = work.links && work.links.length > 0
  const isMagazine = work.layout === 'magazine'
  const pages = work.pages ?? []
  const mainSrc = isMagazine ? pages[0] : pages[pageIdx]
  const magPages = isMagazine ? pages.slice(1) : []

  const backTo = fromSubject && fromSubject !== 'all'
    ? `/projects?subject=${fromSubject}`
    : '/projects'

  useEffect(() => {
    if (!magPages.length) return
    const t = setInterval(() => setMagIdx(i => (i + 1) % magPages.length), 3500)
    return () => clearInterval(t)
  }, [magPages.length])

  const navBtnStyle = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    background: 'rgba(10,10,10,0.6)', border: '1px solid #2A2A2A',
    color: '#f0f0f0', borderRadius: '4px', padding: '6px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', transition: 'border-color 150ms ease, color 150ms ease',
  }

  // members 렌더 분기 (명시적 length 조건)
  const membersLen = work.members?.length ?? 0
  const renderMembers = () => {
    if (membersLen === 0) return null
    if (membersLen === 1) {
      const m = work.members[0]
      return (
        <p className="text-xs text-text-primary font-ui pt-1">
          <span className="font-semibold">{m.name}</span>
          {' / '}
          <span className="text-text-muted">{m.studentId}, {m.major}</span>
        </p>
      )
    }
    // membersLen >= 2
    return (
      <ul className="flex flex-col gap-1.5 pt-1">
        {work.members.map((m, i) => (
          <li key={i} className="flex flex-col">
            <span className="text-xs font-semibold text-text-primary font-ui">{m.name}</span>
            <span className="text-xs text-text-muted font-ui">{m.studentId}, {m.major}</span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <BackLink to={backTo}>Projects 목록으로</BackLink>
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
            {mainSrc && (
              <img
                src={mainSrc}
                alt={`${work.author} - ${work.title}`}
                loading="lazy"
                decoding="async"
                style={{ height: '100%', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            )}

            {/* 일반 레이아웃 캐러셀 내비 */}
            {!isMagazine && pages.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); setPageIdx(i => (i - 1 + pages.length) % pages.length) }}
                style={{ ...navBtnStyle, left: 10 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#F5C518'; e.currentTarget.style.color = '#F5C518' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#f0f0f0' }}
                aria-label="이전 페이지"
              >
                <ChevronLeft size={16} />
              </button>
            )}
            {!isMagazine && pages.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); setPageIdx(i => (i + 1) % pages.length) }}
                style={{ ...navBtnStyle, right: 10 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#F5C518'; e.currentTarget.style.color = '#F5C518' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#f0f0f0' }}
                aria-label="다음 페이지"
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>

          {!isMagazine && pages.length > 1 && (
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

          {renderMembers()}

          {work.award && <AwardBadge type={work.award} />}
        </div>
      </div>

      {/* 매거진 캐러셀 (layout === 'magazine' && pages > 1) */}
      {isMagazine && magPages.length > 0 && (
        <div style={{ marginTop: '48px' }}>
          <div style={{
            width: '1px', background: '#2A2A2A', height: '1px',
            background: 'linear-gradient(to right, transparent, #2A2A2A, transparent)',
            marginBottom: '32px',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            {/* 캐러셀 뷰어 */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              {/* 이전 버튼 */}
              <button
                onClick={() => setMagIdx(i => (i - 1 + magPages.length) % magPages.length)}
                style={{
                  ...navBtnStyle,
                  position: 'relative', top: 'auto', transform: 'none',
                  flexShrink: 0, marginRight: '12px',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#F5C518'; e.currentTarget.style.color = '#F5C518' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#f0f0f0' }}
                aria-label="이전 매거진 페이지"
              >
                <ChevronLeft size={16} />
              </button>

              {/* 이미지 */}
              <div style={{
                aspectRatio: '1 / 1.414',
                maxWidth: '320px',
                width: '100%',
                background: '#111111',
                border: '1px solid #2A2A2A',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {magPages[magIdx] && (
                  <img
                    key={magIdx}
                    src={magThumbFailed.has(magIdx) ? magPages[magIdx] : thumbOf(magPages[magIdx])}
                    alt={`${work.title} 매거진 ${magIdx + 1}페이지`}
                    loading="lazy"
                    decoding="async"
                    onError={() => setMagThumbFailed(s => new Set(s).add(magIdx))}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  />
                )}
              </div>

              {/* 다음 버튼 */}
              <button
                onClick={() => setMagIdx(i => (i + 1) % magPages.length)}
                style={{
                  ...navBtnStyle,
                  position: 'relative', top: 'auto', transform: 'none',
                  flexShrink: 0, marginLeft: '12px',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#F5C518'; e.currentTarget.style.color = '#F5C518' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#f0f0f0' }}
                aria-label="다음 매거진 페이지"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* 페이지 카운터 + 도트 */}
            <p style={{ fontSize: '11px', color: '#BABABA', letterSpacing: '0.1em', userSelect: 'none' }}>
              {magIdx + 1} / {magPages.length}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '5px', maxWidth: '320px' }}>
              {magPages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMagIdx(i)}
                  style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    padding: 0, border: 'none',
                    background: i === magIdx ? '#F5C518' : '#2A2A2A',
                    cursor: 'pointer',
                    transition: 'background 200ms ease',
                  }}
                  aria-label={`매거진 ${i + 1}페이지`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
