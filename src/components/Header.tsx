import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/events', label: 'Events' },
  { path: '/recruitment', label: 'Join Us' },
  { path: '/contact', label: 'Contact' },
]

const Header: React.FC = () => {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.header
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <Link to="/" className="logo" aria-label="The Matrix Club Home">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: '50%',
                border: '2px solid #FFFFFF',
                boxShadow: '0 0 12px rgba(0,255,65,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'black',
              }}
            >
              <img
                src="/favicon.ico"
                alt=""
                width={28}
                height={28}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
            <span
              style={{
                color: '#FFFFFF',
                fontWeight: 600,
                letterSpacing: '1px',
                fontFamily: "'Share Tech Mono', monospace",
              }}
            >
              THE MATRIX CLUB
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="nav-links desktop-nav">
          {NAV_ITEMS.map((item) => (
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

        {/* Mobile Toggle */}
        <button
          className="mobile-menu-button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(17, 17, 17, 0.98)',
              backdropFilter: 'blur(10px)',
              borderTop: '1px solid #333',
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 99,
              overflow: 'hidden',
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: '1rem 0' }}>
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                >
                  <Link
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block',
                      padding: '1rem 2rem',
                      borderBottom: '1px solid #333',
                      textDecoration: 'none',
                      color: '#FFFFFF',
                      fontSize: '1.1rem',
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
