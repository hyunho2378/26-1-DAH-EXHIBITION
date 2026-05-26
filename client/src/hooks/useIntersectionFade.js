import { useEffect, useRef, useState } from 'react'

export function useIntersectionFade(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.1, ...options })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return { ref, visible }
}
