import { NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/',        label: 'About' },
  { to: '/against', label: 'Against the Flow' },
  { to: '/projects',label: 'Projects' },
  { to: '/contest', label: 'Contest' },
  { to: '/award',   label: 'Award' },
  { to: '/lucid',   label: 'LUCID' },
  { to: '/gallery', label: 'Gallery' },
]

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <div
      className="lg:hidden overflow-hidden transition-all duration-300"
      style={{
        maxHeight: isOpen ? '400px' : '0',
        background: '#0a0a0a',
        borderBottom: isOpen ? '1px solid #1f1f1f' : 'none',
      }}
    >
      <nav className="flex flex-col px-6 py-4 gap-1">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              `py-3 text-sm font-semibold font-ui tracking-widest transition-colors duration-200 ${
                isActive ? 'text-accent' : 'text-text-muted hover:text-text-primary'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
