import { Link } from 'react-router-dom'

const SIZES = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const VARIANTS = {
  primary: 'bg-accent text-text-inverse font-semibold hover:bg-accent-dim',
  ghost:   'border border-border-default text-text-primary hover:border-border-strong',
  text:    'text-text-muted hover:text-text-primary',
}

export default function Button({ variant = 'primary', size = 'md', onClick, href, to, children, disabled, className = '' }) {
  const base = `inline-flex items-center justify-center font-ui transition-colors duration-200 ${SIZES[size]} ${VARIANTS[variant]} ${className}`

  if (to) return <Link to={to} className={base}>{children}</Link>
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={base}>{children}</a>
  return (
    <button onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  )
}
