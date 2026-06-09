import Divider from './Divider'

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-10">
      <h1 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-text-primary leading-none">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-sm text-text-muted font-body">{subtitle}</p>
      )}
      <Divider className="mt-6" />
    </div>
  )
}
