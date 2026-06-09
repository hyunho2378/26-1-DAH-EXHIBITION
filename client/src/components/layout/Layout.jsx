import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <ScrollToTop />
      <Header />
      <main className="flex-1 pt-[56px] page-px">
        <div className="max-w-[1280px] mx-auto w-full">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
