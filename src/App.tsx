import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'

import Header from './components/Header'
import MatrixRain from './components/MatrixRain'
import AnnouncementModal from './components/AnnouncementModal'
import AnnouncementBubble from './components/AnnouncementBubble'
import ErrorBoundary from './components/ErrorBoundary'
import Footer from './components/Footer'

/* Lazy-loaded pages for code splitting */
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Events = lazy(() => import('./pages/Events'))
const Contact = lazy(() => import('./pages/Contact'))
const Recruitment = lazy(() => import('./pages/Recruitment'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminLayout = lazy(() => import('./admin/AdminLayout'))

/** Simple full-screen loading spinner */
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Share Tech Mono', monospace",
        color: '#666',
        fontSize: '1.2rem',
      }}
    >
      Loading...
    </div>
  )
}

/** Wraps public site layout — hides header/footer on admin routes */
function PublicLayout() {
  const [showAnnouncement, setShowAnnouncement] = useState(false)

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('hasSeenAnnouncement')
    if (!hasSeen) setShowAnnouncement(true)
  }, [])

  const closeAnnouncement = () => {
    setShowAnnouncement(false)
    sessionStorage.setItem('hasSeenAnnouncement', 'true')
  }

  return (
    <>
      <MatrixRain />
      <Header />

      <AnimatePresence>
        {showAnnouncement && (
          <AnnouncementModal onClose={closeAnnouncement} />
        )}
      </AnimatePresence>

      <main className="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <AnnouncementBubble />
      <Footer />
    </>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  if (isAdmin) {
    return (
      <Suspense fallback={<PageLoader />}>
        <AdminLayout />
      </Suspense>
    )
  }

  return <PublicLayout />
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
