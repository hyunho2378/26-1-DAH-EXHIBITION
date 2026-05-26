import { ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      className="mt-auto page-px py-8 md:py-10"
      style={{ borderTop: '1px solid #1f1f1f', background: '#0a0a0a' }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* 좌측 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 395.47 169.67" width={40} height={40} fill="#BABABA" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
              <path d="M5.58,165.84c-.78,0-1.31,0-1.6,0l-3.97-.04L1.58,0l4.08.15c7.4.27,181.37,7.44,180.62,86.92-.73,76.48-161.58,78.77-180.7,78.77ZM9.45,8.3l-1.43,149.56c25.94-.36,169.68-5.32,170.31-70.87C178.96,21.43,35.66,9.86,9.45,8.3Z"/>
              <path d="M277.02,169.67l-185.99-1.77L156.73,3.12l61.92.59,58.37,165.96ZM102.71,160.06l163.05,1.55L213,11.61l-50.9-.49-59.39,148.94Z"/>
              <polygon points="393.97 165.68 386.02 165.6 386.82 81.55 241.36 81.55 241.36 164.07 233.41 164.18 229.01 6.44 236.96 6.21 238.83 73.6 383.37 73.6 387.54 7.54 395.47 7.83 393.97 165.68"/>
            </svg>
            <span className="text-xs text-text-muted font-body">한림대학교 디지털인문예술전공</span>
          </div>
          <a
            href="https://sites.google.com/glab.hallym.ac.kr/dah-hallym/about?authuser=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-primary transition-colors font-body"
          >
            Hallym University DAH
            <ExternalLink size={10} />
          </a>
          <p className="text-xs text-text-muted font-body">
            &copy; 2026 디지털인문예술전공. All rights reserved.
          </p>
        </div>

        {/* 우측 */}
        <div className="flex flex-col gap-1 md:text-right">
          <p className="text-xs text-text-muted font-body">한림대학교 디지털인문예술전공 운영위원회 LUCID</p>
          <p className="text-xs text-text-muted font-body">강원특별자치도 춘천시 한림대학길 1 Campus Life Center 1F</p>
          <p className="text-xs text-text-muted font-body">
            웹사이트 제작/수정 문의 주현호
            <a href="mailto:h20222538@glab.hallym.ac.kr" className="ml-1 hover:text-text-primary transition-colors">
              (h20222538@glab.hallym.ac.kr)
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
