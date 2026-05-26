import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function BackLink({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
    >
      <ArrowLeft size={16} />
      {children}
    </Link>
  )
}
