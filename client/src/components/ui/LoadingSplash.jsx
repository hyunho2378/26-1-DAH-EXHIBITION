import { useState, useEffect } from 'react'

export default function LoadingSplash({ onDone }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1200)
    const t2 = setTimeout(() => onDone(), 1600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0a0a0a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.4s ease',
      }}
    >
      <style>{`
        @keyframes dah-left {
          from { transform: translateX(-80px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes dah-up {
          from { transform: translateY(60px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes dah-right {
          from { transform: translateX(80px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .splash-d { animation: dah-left  0.6s cubic-bezier(0.16,1,0.3,1) 0s   both; }
        .splash-a { animation: dah-up    0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .splash-h { animation: dah-right 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
      `}</style>
      <svg
        viewBox="0 0 395.47 169.67"
        style={{ width: 'min(240px, 60vw)', fill: '#F5C518' }}
        aria-hidden="true"
      >
        <g className="splash-d">
          <path d="M5.58,165.84c-.78,0-1.31,0-1.6,0l-3.97-.04L1.58,0l4.08.15c7.4.27,181.37,7.44,180.62,86.92-.73,76.48-161.58,78.77-180.7,78.77ZM9.45,8.3l-1.43,149.56c25.94-.36,169.68-5.32,170.31-70.87C178.96,21.43,35.66,9.86,9.45,8.3Z"/>
        </g>
        <g className="splash-a">
          <path d="M277.02,169.67l-185.99-1.77L156.73,3.12l61.92.59,58.37,165.96ZM102.71,160.06l163.05,1.55L213,11.61l-50.9-.49-59.39,148.94Z"/>
        </g>
        <g className="splash-h">
          <polygon points="393.97 165.68 386.02 165.6 386.82 81.55 241.36 81.55 241.36 164.07 233.41 164.18 229.01 6.44 236.96 6.21 238.83 73.6 383.37 73.6 387.54 7.54 395.47 7.83 393.97 165.68"/>
        </g>
      </svg>
    </div>
  )
}
