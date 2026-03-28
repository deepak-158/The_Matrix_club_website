import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

interface Announcement {
  id: number
  title: string
  message: string
  link?: string | null
  link_text?: string | null
}

const STORAGE_KEY = 'announcementBubbleClosed'

const AnnouncementBubble: React.FC = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)

  useEffect(() => {
    // Fetch active announcement from API
    fetch(`${API_BASE}/api/announcements`, { credentials: 'include' })
      .then((r) => r.json())
      .then((items: Announcement[]) => {
        if (items.length > 0) {
          setAnnouncement(items[0])

          // Check if user already dismissed
          const closedAt = localStorage.getItem(STORAGE_KEY)
          if (closedAt) {
            const hoursSinceClosed = (Date.now() - Number(closedAt)) / 3_600_000
            if (hoursSinceClosed < 24) return
          }

          setTimeout(() => setIsVisible(true), 3000)
        }
      })
      .catch(console.error)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem(STORAGE_KEY, Date.now().toString())
  }

  const handleLinkClick = () => {
    if (!announcement?.link) return
    if (announcement.link.startsWith('http')) {
      window.open(announcement.link, '_blank', 'noopener,noreferrer')
    } else {
      navigate(announcement.link)
    }
  }

  if (!isVisible || !announcement) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          zIndex: 1000,
          maxWidth: isExpanded ? 320 : 60,
          transition: 'max-width 0.3s ease',
        }}
      >
        {!isExpanded ? (
          <motion.button
            onClick={() => setIsExpanded(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Show announcement"
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFFFFF, #CCCCCC)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(255,255,255,0.4)',
              border: 'none',
              position: 'relative',
            }}
          >
            <Bell size={24} color="#000" />
            <motion.span
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#FF4444',
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.button>
        ) : (
          <motion.div
            initial={{ width: 60, height: 60 }}
            animate={{ width: 320, height: 'auto' }}
            style={{
              background: '#1a1a1a',
              border: '2px solid #FFFFFF',
              borderRadius: 15,
              padding: 15,
              boxShadow: '0 8px 30px rgba(255,255,255,0.3)',
              position: 'relative',
            }}
          >
            <button
              onClick={handleClose}
              aria-label="Close announcement"
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'none',
                border: 'none',
                color: '#CCCCCC',
                cursor: 'pointer',
                padding: 2,
              }}
            >
              <X size={16} />
            </button>

            <div style={{ marginBottom: 10 }}>
              <h4
                style={{
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  margin: '0 0 8px',
                  fontFamily: "'Share Tech Mono', monospace",
                }}
              >
                {announcement.title}
              </h4>
              <p style={{ color: '#FFFFFF', fontSize: '0.8rem', margin: '0 0 12px', lineHeight: 1.4 }}>
                {announcement.message}
              </p>
            </div>

            {announcement.link && (
              <button
                onClick={handleLinkClick}
                style={{
                  background: 'linear-gradient(45deg, #FFFFFF, #CCCCCC)',
                  color: '#000',
                  border: 'none',
                  borderRadius: 5,
                  padding: '8px 12px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                {announcement.link_text || 'Learn More'}
                <ExternalLink size={12} />
              </button>
            )}

            <button
              onClick={() => setIsExpanded(false)}
              style={{
                background: 'none',
                border: '1px solid #444',
                color: '#CCCCCC',
                borderRadius: 5,
                padding: 6,
                fontSize: '0.7rem',
                cursor: 'pointer',
                marginTop: 8,
                width: '100%',
              }}
            >
              Minimize
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default AnnouncementBubble