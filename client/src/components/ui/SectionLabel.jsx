export default function SectionLabel({ children, number }) {
  return (
    <span className="inline-flex items-center gap-2 font-ui text-xs font-semibold tracking-[0.15em] uppercase text-text-muted">
      {number && <span>{number}</span>}
      {children}
    </span>
  )
}
