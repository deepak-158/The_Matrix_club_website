import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Header: React.FC = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/events', label: 'Events' },
    { path: '/recruitment', label: 'Join Us' },
    { path: '/contact', label: 'Contact' }
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="nav">
        <Link to="/" className="logo">
        <div style={{display: "flex",alignItems: "center",gap: "0.6rem",borderRadius: "9999px",}}>
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              border: "2px solid #FFFFFF",
              boxShadow: "0 0 12px rgba(0,255,65,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "black",
            }}
          >
            <img
              src="/favicon.ico"
              alt="The Matrix Club Logo"
              style={{width: "28px",
                height: "28px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>

          <span
            style={{
              color: "#FFFFFF",
              fontWeight: 600,
              letterSpacing: "1px",
              fontFamily: "Share Tech Mono, monospace",
            }}
          >
            THE MATRIX CLUB
          </span>
        </div>

        </Link>
        
        {/* Desktop Navigation */}
        <ul className="nav-links desktop-nav">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none'
          }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(17, 17, 17, 0.98)',
              backdropFilter: 'blur(10px)',
              borderTop: '1px solid #FFFFFF',
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 99,
              overflow: 'hidden'
            }}
          >
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: '1rem 0',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link 
                    to={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                    style={{
                      display: 'block',
                      padding: '1rem 2rem',
                      borderBottom: '1px solid #333',
                      textDecoration: 'none',
                      color: location.pathname === item.path ? '#FFFFFF' : '#FFFFFF',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (location.pathname !== item.path) {
                        e.currentTarget.style.color = '#FFFFFF'
                        e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.1)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (location.pathname !== item.path) {
                        e.currentTarget.style.color = '#FFFFFF'
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
