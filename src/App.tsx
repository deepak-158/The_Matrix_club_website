import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'

// Components
import Header from './components/Header.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Events from './pages/Events.tsx'
import Contact from './pages/Contact.tsx'
import Recruitment from './pages/Recruitment.tsx'
import MatrixRain from './components/MatrixRain.tsx'
import AnnouncementModal from './components/AnnouncementModal.tsx'
import AnnouncementBubble from './components/AnnouncementBubble.tsx'

function App() {
  const [showAnnouncement, setShowAnnouncement] = useState(true)

  useEffect(() => {
    // Check if user has seen the announcement in this session
    const hasSeenAnnouncement = sessionStorage.getItem('hasSeenAnnouncement')
    if (hasSeenAnnouncement) {
      setShowAnnouncement(false)
    }

    // Secret developer message
    const matrixStyle = `
      color: #00FF41;
      font-family: 'Courier New', monospace;
      font-size: 16px;
      font-weight: bold;
      text-shadow: 0 0 10px #00FF41;
    `

    console.log('%c╔════════════════════════════════════════════════════════════════════════════════╗', matrixStyle)
    console.log('%c║                                                                                ║', matrixStyle)
    console.log('%c║  ████████╗██╗  ██╗███████╗    ███╗   ███╗ █████╗ ████████╗██████╗ ██╗██╗  ██╗  ║', matrixStyle)
    console.log('%c║  ╚══██╔══╝██║  ██║██╔════╝    ████╗ ████║██╔══██╗╚══██╔══╝██╔══██╗██║╚██╗██╔╝  ║', matrixStyle)
    console.log('%c║     ██║   ███████║█████╗      ██╔████╔██║███████║   ██║   ██████╔╝██║ ╚███╔╝   ║', matrixStyle)
    console.log('%c║     ██║   ██╔══██║██╔══╝      ██║╚██╔╝██║██╔══██║   ██║   ██╔══██╗██║ ██╔██╗   ║', matrixStyle)
    console.log('%c║     ██║   ██║  ██║███████╗    ██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║██║██╔╝ ██╗  ║', matrixStyle)
    console.log('%c║     ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝  ║', matrixStyle)
    console.log('%c║                                                                                ║', matrixStyle)
    console.log('%c║                        🔥 CLUB WEBSITE 🔥                                     ║', matrixStyle)
    console.log('%c║                                                                                ║', matrixStyle)
    console.log('%c║    💻 Developed by: Deepak Shukla                                              ║', matrixStyle)
    console.log('%c║    ❤️ Made with Love for The Matrix Club                                       ║', matrixStyle)
    console.log('%c║    🌐 GitHub: https://github.com/deepak-158                                    ║', matrixStyle)
    console.log('%c║    📧 Contact: deepak.23bce11422@vitbhopal.ac.in                               ║', matrixStyle)
    console.log('%c║                                                                                ║', matrixStyle)
    console.log('%c║    🚀 "Welcome to The Matrix. Red pill or blue pill?"                          ║', matrixStyle)
    console.log('%c║                                                                                ║', matrixStyle)
    console.log('%c╚════════════════════════════════════════════════════════════════════════════════╝', matrixStyle)
    
    console.log('%c\n💡 Pro tip: If you\'re seeing this, you might be the perfect candidate for our Technical Team!', 'color: #FFD700; font-size: 14px; font-style: italic;')
    console.log('%c🔍 Check out our recruitment page: /recruitment', 'color: #00BFFF; font-size: 12px;')

    // Add a secret function to the window object
    ;(window as any).matrixClub = {
      developer: 'Deepak Shukla',
      team: 'The Matrix Club',
      message: 'Thanks for exploring! 🚀',
      joinUs: () => {
        console.log('%c🎯 Ready to join The Matrix Club?', 'color: #00FF41; font-size: 18px; font-weight: bold;')
        console.log('%c🌟 Visit our recruitment page and choose your destiny!', 'color: #FFD700; font-size: 14px;')
        window.location.href = '/recruitment'
      },
      easteregg: () => {
        console.log('%c🎊 You found the easter egg! 🎊', 'color: #FF69B4; font-size: 20px; font-weight: bold;')
        console.log('%c🔮 "There is no spoon" - Neo', 'color: #00FF41; font-size: 16px; font-style: italic;')
        console.log('%c⚡ The Matrix has you... but in a good way! ⚡', 'color: #FFD700; font-size: 14px;')
      }
    }

    console.log('%c\n🎮 Try these commands:', 'color: #FF6B6B; font-size: 14px; font-weight: bold;')
    console.log('%c   matrixClub.joinUs() - Quick access to recruitment', 'color: #FFA500; font-size: 12px;')
    console.log('%c   matrixClub.easteregg() - Discover the easter egg', 'color: #FFA500; font-size: 12px;')
  }, [])

  const closeAnnouncement = () => {
    setShowAnnouncement(false)
    sessionStorage.setItem('hasSeenAnnouncement', 'true')
  }

  return (
    <Router>
      <div className="App">
        <MatrixRain />
        <Header />
        
        <AnimatePresence>
          {showAnnouncement && (
            <AnnouncementModal onClose={closeAnnouncement} />
          )}
        </AnimatePresence>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <AnnouncementBubble />
      </div>
    </Router>
  )
}

export default App
