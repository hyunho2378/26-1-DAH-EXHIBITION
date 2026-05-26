export default function LogoMark({ size = 40, className = '' }) {
  return (
    <img
      src="/logo-color.svg"
      alt="LUCID 로고"
      width={size}
      height={size}
      className={className}
      style={{ display: 'block' }}
    />
  )
}
