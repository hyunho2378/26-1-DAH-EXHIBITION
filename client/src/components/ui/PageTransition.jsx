import { useRef, useEffect } from 'react'

export default function PageTransition({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(8px)'
    const id = requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out)'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
      el.addEventListener('transitionend', () => {
        el.style.transition = ''
        el.style.opacity = ''
        el.style.transform = ''
      }, { once: true })
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return <div ref={ref} className={className}>{children}</div>
}
