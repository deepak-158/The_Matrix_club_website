import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell, ExternalLink } from 'lucide-react'

interface AnnouncementBubbleProps {
  announcement?: {
    title: string
    message: string
    link?: string
    linkText?: string
  }
}

const AnnouncementBubble: React.FC<AnnouncementBubbleProps> = ({ 
  announcement = {
    title: "🚀 Join The Matrix! Recruitments Are Open!",
    message: "The Matrix Club is looking for passionate creators and tech enthusiasts to join our ranks. If you have a flair for photography, videography, design, or web development, we want you. Choose your path and help us redefine creativity.",
    link: "/recruitment",
    linkText: "Apply Now"
  }
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Show bubble after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('announcementBubbleClosed', Date.now().toString())
  }

  const handleClick = () => {
    if (announcement.link) {
      if (announcement.link.startsWith('http')) {
        window.open(announcement.link, '_blank', 'noopener,noreferrer')
      } else {
        window.location.href = announcement.link
      }
    }
    setIsExpanded(!isExpanded)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0, x: -20, y: 20 }}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 1000,
          maxWidth: isExpanded ? '320px' : '60px',
          transition: 'max-width 0.3s ease'
        }}
      >
        {!isExpanded ? (
          // Collapsed bubble (bell icon)
          <motion.div
            onClick={() => setIsExpanded(true)}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00FF41, #00CC33)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0, 255, 65, 0.4)',
              position: 'relative'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell size={24} color="#111" />
            {/* Notification dot */}
            <motion.div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#FF4444'
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>
        ) : (
          // Expanded bubble (full announcement)
          <motion.div
            initial={{ width: '60px', height: '60px' }}
            animate={{ width: '320px', height: 'auto' }}
            style={{
              background: '#222222',
              border: '2px solid #00FF41',
              borderRadius: '15px',
              padding: '15px',
              boxShadow: '0 8px 30px rgba(0, 255, 65, 0.3)',
              position: 'relative'
            }}
          >
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                color: '#CCCCCC',
                cursor: 'pointer',
                padding: '2px'
              }}
            >
              <X size={16} />
            </button>

            <div style={{ marginBottom: '10px' }}>
              <h4 style={{ 
                color: '#00FF41', 
                fontSize: '0.9rem', 
                margin: '0 0 8px 0',
                fontFamily: 'Share Tech Mono, monospace'
              }}>
                {announcement.title}
              </h4>
              <p style={{ 
                color: '#FFFFFF', 
                fontSize: '0.8rem', 
                margin: '0 0 12px 0',
                lineHeight: '1.4'
              }}>
                {announcement.message}
              </p>
            </div>

            {announcement.link && (
              <button
                onClick={handleClick}
                style={{
                  background: 'linear-gradient(45deg, #00FF41, #00CC33)',
                  color: '#111',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '8px 12px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  width: '100%',
                  justifyContent: 'center'
                }}
              >
                {announcement.linkText || 'Learn More'}
                <ExternalLink size={12} />
              </button>
            )}

            <button
              onClick={() => setIsExpanded(false)}
              style={{
                background: 'none',
                border: '1px solid #444',
                color: '#CCCCCC',
                borderRadius: '5px',
                padding: '6px',
                fontSize: '0.7rem',
                cursor: 'pointer',
                marginTop: '8px',
                width: '100%'
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