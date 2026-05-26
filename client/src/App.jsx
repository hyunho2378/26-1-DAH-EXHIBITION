import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy, useState } from 'react'
import Layout from './components/layout/Layout'
import LoadingSplash from './components/ui/LoadingSplash'

const AboutPage         = lazy(() => import('./pages/AboutPage'))
const AgainstPage       = lazy(() => import('./pages/AgainstPage'))
const DesignSystemPage  = lazy(() => import('./pages/DesignSystemPage'))
const ProjectsPage      = lazy(() => import('./pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'))
const ContestPage       = lazy(() => import('./pages/ContestPage'))
const AwardPage         = lazy(() => import('./pages/AwardPage'))
const LucidPage         = lazy(() => import('./pages/LucidPage'))
const GalleryPage       = lazy(() => import('./pages/GalleryPage'))
const NotFoundPage      = lazy(() => import('./pages/NotFoundPage'))

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="text-xs text-text-muted font-ui tracking-widest uppercase">Loading</span>
    </div>
  )
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  return (
    <>
      {!splashDone && <LoadingSplash onDone={() => setSplashDone(true)} />}
      <Layout>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/"                       element={<AboutPage />} />
          <Route path="/against"                element={<AgainstPage />} />
          <Route path="/against/design-system"  element={<DesignSystemPage />} />
          <Route path="/projects"               element={<ProjectsPage />} />
          <Route path="/projects/:id"           element={<ProjectDetailPage />} />
          <Route path="/contest"                element={<ContestPage />} />
          <Route path="/award"                  element={<AwardPage />} />
          <Route path="/lucid"                  element={<LucidPage />} />
          <Route path="/gallery"                element={<GalleryPage />} />
          <Route path="*"                       element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      </Layout>
    </>
  )
}
