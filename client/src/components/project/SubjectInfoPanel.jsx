export default function SubjectInfoPanel({ subject }) {
  if (!subject || subject.id === 'all') return null

  return (
    <div className="mb-8 pb-6" style={{ borderBottom: '1px solid #1f1f1f' }}>
      <h2 className="text-xl font-bold text-text-primary font-body">{subject.name}</h2>
      {subject.id !== 'free' && (
        <p className="text-sm text-text-muted font-body mt-1">지도교수: {subject.professor}</p>
      )}
      {subject.description && (
        <p className="text-sm text-text-muted font-body mt-2 leading-relaxed" style={{ wordBreak: 'keep-all' }}>
          {subject.description}
        </p>
      )}
    </div>
  )
}
