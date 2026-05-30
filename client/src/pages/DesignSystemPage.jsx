import { useEffect, useRef, useState } from 'react'
import BackLink from '../components/ui/BackLink'
import PageHeader from '../components/ui/PageHeader'
import Divider from '../components/ui/Divider'
import SectionLabel from '../components/ui/SectionLabel'
import AwardBadge from '../components/ui/AwardBadge'
import Button from '../components/ui/Button'

const COLOR_TOKENS = [
  { name: 'bg-primary',     hex: '#0a0a0a', label: 'Background Primary' },
  { name: 'bg-elevated',    hex: '#1e1e1e', label: 'Background Elevated' },
  { name: 'surface',        hex: '#141414', label: 'Surface' },
  { name: 'border-subtle',  hex: '#1f1f1f', label: 'Border Subtle' },
  { name: 'border-default', hex: '#2a2a2a', label: 'Border Default' },
  { name: 'border-strong',  hex: '#3a3a3a', label: 'Border Strong' },
  { name: 'text-primary',   hex: '#f0f0f0', label: 'Text Primary' },
  { name: 'text-muted',     hex: '#BABABA', label: 'Text Muted' },
  { name: 'accent',         hex: '#F5C518', label: 'Accent (Gold)' },
  { name: 'accent-dim',     hex: '#D9AD0F', label: 'Accent Dim' },
]

const TYPE_SCALE = [
  { token: 'display-hero',  size: 'clamp(56px,11vw,140px)', weight: 900, font: 'Barlow Condensed', sample: 'AGAINST THE FLOW' },
  { token: 'display-2xl',   size: 'clamp(44px,7vw,96px)',   weight: 800, font: 'Barlow Condensed', sample: 'PROJECTS' },
  { token: 'display-xl',    size: 'clamp(36px,5vw,64px)',   weight: 800, font: 'Barlow Condensed', sample: 'AWARD' },
  { token: 'display-lg',    size: 'clamp(28px,3.5vw,44px)', weight: 700, font: 'Barlow Condensed', sample: 'GALLERY' },
  { token: 'heading-xl',    size: '22px / 30px',             weight: 700, font: 'Pretendard',       sample: '카드 제목, 작품명' },
  { token: 'heading-lg',    size: '18px / 24px',             weight: 600, font: 'Pretendard',       sample: '서브 제목' },
  { token: 'body-md',       size: '15px / 16px',             weight: 400, font: 'Pretendard',       sample: '기본 본문 텍스트' },
  { token: 'caption',       size: '11px / 12px',             weight: 600, font: 'SUIT',             sample: 'CAPTION / META / NAV' },
]

const reducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const EASE = 'cubic-bezier(0.22,1,0.36,1)'

function useSectionReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (reducedMotion) { setVisible(true); return }
    const el = ref.current
    if (!el) return
    if (el.getBoundingClientRect().top < window.innerHeight) { setVisible(true); return }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function stagger(visible, i) {
  const d = i * 50
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(20px)',
    transition: `opacity 0.6s ${EASE} ${d}ms, transform 0.6s ${EASE} ${d}ms`,
  }
}

export default function DesignSystemPage() {
  const [mounted, setMounted] = useState(false)
  const colorS   = useSectionReveal()
  const typS     = useSectionReveal()
  const compS    = useSectionReveal()
  const spacingS = useSectionReveal()
  const [hoveredChip, setHoveredChip] = useState(null)

  useEffect(() => {
    document.title = 'Design System — 26-1 DAH EXHIBITION'
    if (!reducedMotion) setMounted(true)
  }, [])

  const headerStyle = reducedMotion ? {} : {
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'none' : 'translateY(16px)',
    transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
  }

  return (
    <div className="pt-10 pb-24">
      {/* [1] 헤더 마운트 진입 */}
      <div style={headerStyle}>
        <BackLink to="/against">Against the Flow</BackLink>
        <div className="mt-8">
          <PageHeader title="Design System" />
        </div>
      </div>

      {/* Color Tokens */}
      <section className="mb-16" ref={colorS.ref}>
        <SectionLabel number="01">Color Tokens</SectionLabel>
        <Divider className="mt-4 mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {COLOR_TOKENS.map((t, i) => (
            <div
              key={t.name}
              style={stagger(colorS.visible, i)}
              onMouseEnter={() => setHoveredChip(t.name)}
              onMouseLeave={() => setHoveredChip(null)}
            >
              <div
                className="w-full h-16 mb-2"
                style={{
                  background: t.hex,
                  border: '1px solid #2a2a2a',
                  borderRadius: '4px',
                  transform: hoveredChip === t.name ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.25s ease',
                }}
              />
              <p className="text-xs font-semibold text-text-primary font-ui">{t.label}</p>
              <p
                className="text-xs font-ui mt-0.5"
                style={{
                  color: hoveredChip === t.name ? '#f0f0f0' : '#BABABA',
                  transition: 'color 0.25s ease',
                }}
              >
                {t.hex}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="mb-16" ref={typS.ref}>
        <SectionLabel number="02">Typography</SectionLabel>
        <Divider className="mt-4 mb-8" />
        <div className="space-y-6">
          {TYPE_SCALE.map((t, i) => (
            <div
              key={t.token}
              style={{ ...stagger(typS.visible, i), borderBottom: '1px solid #1f1f1f', paddingBottom: '20px' }}
            >
              <p className="text-xs text-text-muted font-ui mb-2 tracking-widest">{t.token} — {t.font} / {t.size} / {t.weight}</p>
              <p
                className="text-text-primary leading-tight"
                style={{
                  fontFamily: t.font.includes('Barlow') ? 'Barlow Condensed, sans-serif' : t.font.includes('SUIT') ? 'SUIT Variable, sans-serif' : 'Pretendard Variable, sans-serif',
                  fontSize: typeof t.size === 'string' && t.size.includes('clamp') ? t.size : t.size.split('/')[0].trim(),
                  fontWeight: t.weight,
                }}
              >
                {t.sample}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Components */}
      <section className="mb-16" ref={compS.ref}>
        <SectionLabel number="03">Components</SectionLabel>
        <Divider className="mt-4 mb-8" />
        <div className="space-y-8">
          <div style={stagger(compS.visible, 0)}>
            <p className="text-xs text-text-muted font-ui tracking-widest mb-4">BUTTONS</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="text">Text Button</Button>
            </div>
          </div>
          <div style={stagger(compS.visible, 1)}>
            <p className="text-xs text-text-muted font-ui tracking-widest mb-4">AWARD BADGES</p>
            <div className="flex flex-wrap gap-4">
              <AwardBadge type="grand" />
              <AwardBadge type="excellence" />
              <AwardBadge type="encouragement" />
            </div>
          </div>
          <div style={stagger(compS.visible, 2)}>
            <p className="text-xs text-text-muted font-ui tracking-widest mb-4">FILTER CHIP (Plus X)</p>
            <div className="flex flex-wrap gap-2">
              {['ALL', '디지털디자인1', 'UX디자인'].map((label, i) => (
                <button
                  key={label}
                  className="rounded-full px-4 py-2 text-sm font-body border transition-colors duration-200"
                  style={{
                    color:       i === 0 ? '#F5C518' : '#f0f0f0',
                    borderColor: i === 0 ? '#F5C518' : '#2a2a2a',
                    background:  'transparent',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section ref={spacingS.ref}>
        <SectionLabel number="04">Spacing / Radius</SectionLabel>
        <Divider className="mt-4 mb-8" />
        <div className="flex flex-wrap gap-4 items-end">
          {[4, 8, 12, 16, 24, 32, 48, 64, 80].map((px, i) => (
            <div key={px} style={stagger(spacingS.visible, i)} className="flex flex-col items-center gap-1">
              <div className="bg-accent" style={{ width: px, height: px }} />
              <span className="text-xs text-text-muted font-ui">{px}px</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
