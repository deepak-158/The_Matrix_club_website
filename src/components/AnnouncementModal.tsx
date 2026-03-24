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
        
        <h3>🎉 Registrations are Open!</h3>
        <p>
          The Matrix Club Recruitment 2026 is now live! Registration is open from <strong>March 25 – March 30, 2026</strong>. Shortlisting results will be announced by March 31. Interview & Final Selection dates to be announced soon.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            className="btn" 
            onClick={handleApplyClick}
          >
            Apply Now
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnnouncementModal;