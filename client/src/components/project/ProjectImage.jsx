import { useState } from 'react'

export default function ProjectImage({ src, type, alt, className = '' }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full h-full">
      {!loaded && <div className="absolute inset-0 bg-surface animate-pulse" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={() => setLoaded(true)}
        onError={e => { e.target.style.display = 'none' }}
      />
    </div>
  )
}
