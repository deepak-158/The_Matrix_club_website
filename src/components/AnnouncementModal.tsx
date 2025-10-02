import React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface AnnouncementModalProps {
  onClose: () => void
}

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({ onClose }) => {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <h3>🚀 Latest Update!</h3>
        <p>
          Registrations for our 'CyberShot' photography workshop are now open! 
          Limited seats available. Join us for an immersive experience in digital 
          photography and post-processing techniques.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            className="btn" 
            onClick={() => {
              window.open('https://forms.google.com/cybershot-workshop', '_blank', 'noopener,noreferrer')
              onClose()
            }}
          >
            Register Now
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Maybe Later
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AnnouncementModal