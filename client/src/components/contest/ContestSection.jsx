import FadeIn from '../ui/FadeIn'
import Divider from '../ui/Divider'
import { ExternalLink } from 'lucide-react'

export default function ContestSection({ contest }) {
  return (
    <FadeIn>
      <section className="py-10 flex flex-col items-center text-center">
        <h2 className="text-2xl font-semibold text-text-primary font-body mb-2" style={{ wordBreak: 'keep-all' }}>
          {contest.title}
        </h2>
        <Divider className="mb-6 w-full" />
        {contest.link ? (
          <a
            href={contest.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-6 mx-auto"
            style={{ maxWidth: '360px', width: '100%' }}
          >
            <img
              src={`/contest/${contest.id}.webp`}
              alt={contest.title}
              className="block w-full"
              style={{ aspectRatio: '3/4', objectFit: 'cover' }}
              onError={e => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement.querySelector('.link-fallback').style.display = 'inline-flex'
              }}
            />
            <span
              className="link-fallback hidden items-center gap-1 text-sm text-text-muted font-body border border-text-muted px-4 py-2 transition-colors duration-200 hover:text-text-primary hover:border-text-primary"
              style={{ display: 'none' }}
            >
              공모전 보러가기
              <ExternalLink size={13} />
            </span>
          </a>
        ) : (
          <img
            src={`/contest/${contest.id}.webp`}
            alt={contest.title}
            className="block mx-auto mb-6"
            style={{ aspectRatio: '3/4', maxWidth: '360px', width: '100%', objectFit: 'cover' }}
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        )}
        {contest.description && (
          <p className="text-base text-text-muted font-body mb-6 leading-relaxed" style={{ wordBreak: 'keep-all' }}>
            {contest.description}
          </p>
        )}
      </section>
    </FadeIn>
  )
}
