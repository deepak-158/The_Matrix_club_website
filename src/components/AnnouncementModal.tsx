import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AnnouncementModalProps {
  onClose: () => void;
}

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate('/recruitment');
    onClose();
  };

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
        
        <h3>🚀 Join The Matrix! Recruitments Are Open!</h3>
        <p>
          The Matrix Club is looking for passionate creators and tech enthusiasts to join our ranks. If you have a flair for photography, videography, design, or web development, we want you. Choose your path and help us redefine creativity.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            className="btn" 
            onClick={handleApplyClick}
          >
            Apply Now
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Maybe Later
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnnouncementModal;