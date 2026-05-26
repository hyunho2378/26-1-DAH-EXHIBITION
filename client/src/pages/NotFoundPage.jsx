import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = '404 — 26-1 DAH EXHIBITION'
  }, [])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center">
      <p
        className="font-display font-black text-text-muted leading-none"
        style={{ fontSize: 'clamp(80px, 15vw, 200px)', letterSpacing: '-0.02em' }}
      >
        404
      </p>
      <p className="text-sm text-text-muted font-body">페이지를 찾을 수 없습니다.</p>
      <Button variant="ghost" onClick={() => navigate('/')}>홈으로</Button>
    </div>
  )
}
