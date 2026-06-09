const STYLES = {
  grand: {
    border: '1px solid #F5C518',
    color: '#F5C518',
    background: 'rgba(245,197,24,0.05)',
    label: '최우수상',
  },
  excellence: {
    border: '1px solid #BABABA',
    color: '#f0f0f0',
    background: 'transparent',
    label: '우수상',
  },
  encouragement: {
    border: '1px solid #2a2a2a',
    color: '#BABABA',
    background: 'transparent',
    label: '장려상',
  },
}

export default function AwardBadge({ type }) {
  const s = STYLES[type]
  if (!s) return null
  return (
    <span
      className="inline-block text-xs font-semibold font-ui tracking-wide px-3 py-1"
      style={{ border: s.border, color: s.color, background: s.background, borderRadius: '2px' }}
    >
      {s.label}
    </span>
  )
}
