import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, ExternalLink, Trophy, Archive } from 'lucide-react'
import { openExternalLink } from '../utils/helpers'

const Events: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'ongoing' | 'completed'>('upcoming')

  const completedEvents = [
    {
      id: 1,
      title: "Media Morphosis 2025",
      date: "July 27, 2025",
      description: "Matrix Club in partnership with Unstop hosted Media Morphosis at VIT Bhopal. The event explored how Data Science and Social Media Analytics shape branding and business strategies. Participants enjoyed an insightful learning session followed by a hackathon-style quiz and case study, applying data-driven insights to real-world challenges.",
      attendees: 200,
      galleryUrl: "https://drive.google.com/drive/folders/1U8_BoZ6wY9DTy_Sr3qiVPERbuAx4jL_k?usp=sharing"
    }
  ]

  return (
    <div style={{ paddingTop: '100px' }}>
      {/* Header */}
      <motion.section 
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', paddingBottom: '2rem' }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Events</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Discover workshops, contests, and experiences that will elevate your multimedia skills
        </p>
      </motion.section>

      {/* Navigation Tabs */}
      <motion.div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '3rem',
          borderBottom: '1px solid #333'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {[
          { key: 'upcoming', label: 'Upcoming Events', icon: Calendar },
          { key: 'ongoing', label: 'Ongoing Contests', icon: Trophy },
          { key: 'completed', label: 'Event Archive', icon: Archive }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === key ? '#00FF41' : '#FFFFFF',
              padding: '1rem 2rem',
              cursor: 'pointer',
              borderBottom: activeTab === key ? '2px solid #00FF41' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </motion.div>

      {/* Upcoming Events */}
      {activeTab === 'upcoming' && (
        <motion.section 
          className="section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{
            textAlign: 'center',
            padding: '4rem 0',
            minHeight: '40vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <motion.h2
              style={{
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: '3rem',
                color: '#00FF41',
                textShadow: '0 0 15px #00FF41',
                marginBottom: '1rem'
              }}
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              COMING SOON
            </motion.h2>
            <p style={{ color: '#CCCCCC', fontSize: '1.2rem' }}>
              New events are being planned. Stay tuned for exciting workshops and contests!
            </p>
          </div>
        </motion.section>
      )}

      {/* Ongoing Contests */}
      {activeTab === 'ongoing' && (
        <motion.section 
          className="section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{
            textAlign: 'center',
            padding: '4rem 0',
            minHeight: '40vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <motion.h2
              style={{
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: '3rem',
                color: '#00FF41',
                textShadow: '0 0 15px #00FF41',
                marginBottom: '1rem'
              }}
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              COMING SOON
            </motion.h2>
            <p style={{ color: '#CCCCCC', fontSize: '1.2rem' }}>
              Our contest schedule is being updated. Check back for new challenges!
            </p>
          </div>
        </motion.section>
      )}

      {/* Completed Events */}
      {activeTab === 'completed' && (
        <motion.section 
          className="section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card-grid">
            {completedEvents.map((event, index) => (
              <motion.div 
                key={event.id}
                className="card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Archive size={24} color="#00FF41" />
                  <h3 style={{ margin: 0 }}>{event.title}</h3>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#00FF41' }}>
                  <Calendar size={16} />
                  <span>{event.date}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#CCCCCC' }}>
                  <Users size={16} />
                  <span>{event.attendees} attendees</span>
                </div>
                
                <p style={{ marginBottom: '1.5rem' }}>{event.description}</p>
                
                <button 
                  className="btn btn-secondary"
                  onClick={() => openExternalLink(event.galleryUrl)}
                  style={{ 
                    width: '100%', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <ExternalLink size={16} />
                  View Gallery
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  )
}

export default Events