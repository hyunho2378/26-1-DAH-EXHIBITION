import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import MobileMenu from './MobileMenu'

const NAV_LINKS = [
  { to: '/',        label: 'About' },
  { to: '/against', label: 'Against the Flow' },
  { to: '/projects',label: 'Projects' },
  { to: '/contest', label: 'Contest' },
  { to: '/award',   label: 'Award' },
  { to: '/lucid',   label: 'LUCID' },
  { to: '/gallery', label: 'Gallery' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-200"
      style={{
        height: '56px',
        background: scrolled ? 'rgba(10,10,10,0.85)' : '#0a0a0a',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid #F5C518',
      }}
    >
      <div className="flex items-center justify-between h-full page-px max-w-[1440px] mx-auto">
        {/* 로고 */}
        <NavLink
          to="/"
          className="font-ui text-sm text-text-primary tracking-widest uppercase"
          style={{ fontWeight: 500 }}
        >
          26-1 DAH EXHIBITION
        </NavLink>

        {/* 데스크탑 네비 */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `font-ui text-xs uppercase transition-colors duration-200 ${
                  isActive ? 'text-accent font-extrabold' : 'text-text-muted font-bold hover:text-text-primary'
                }`
              }
              style={{ letterSpacing: '0.08em' }}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* 모바일 햄버거 */}
        <button
          className="lg:hidden text-text-muted hover:text-text-primary transition-colors"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="메뉴"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
