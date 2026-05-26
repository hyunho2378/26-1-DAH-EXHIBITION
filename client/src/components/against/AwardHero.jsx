import { againstInfo } from '../../data/about'

export default function AwardHero() {
  return (
    <section className="py-12 md:py-20">
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
        <img
          src="/against/against-the-flow.webp"
          alt="Against the Flow 포스터"
          className="shrink-0 block"
          style={{ aspectRatio: '1 / 1.414', maxWidth: '440px', width: '100%', objectFit: 'cover' }}
          onError={e => { e.currentTarget.style.display = 'none' }}
        />

        {/* 텍스트 */}
        <div className="flex flex-col gap-4 justify-center">
          <h2 className="text-xl md:text-2xl font-black text-text-primary font-body leading-snug" style={{ wordBreak: 'keep-all' }}>
            {againstInfo.title}
          </h2>
          <dl className="space-y-3 mt-2">
            {againstInfo.rows.map((row, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="text-xs font-semibold text-text-muted font-ui tracking-widest uppercase shrink-0 w-16">
                  {row.label}
                </dt>
                <dd className="text-sm text-text-primary font-body" style={{ wordBreak: 'keep-all' }}>
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
