import { useIntersectionFade } from '../../hooks/useIntersectionFade'

const TRANSFORMS = {
  up:    'translateY(12px)',
  down:  'translateY(-12px)',
  left:  'translateX(12px)',
  right: 'translateX(-12px)',
}

export default function FadeIn({ children, immediate = false, delay = 0, direction = 'up', scale = false, className = '' }) {
  const { ref, visible } = useIntersectionFade()
  const show = immediate || visible
  const fromTransform = (TRANSFORMS[direction] ?? TRANSFORMS.up) + (scale ? ' scale(0.96)' : '')

  return (
    <div
      ref={immediate ? undefined : ref}
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'none' : fromTransform,
        transition: `opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
