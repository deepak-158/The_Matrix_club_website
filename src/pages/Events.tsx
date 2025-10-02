import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, ExternalLink, Trophy, Archive } from 'lucide-react'
import { sampleImages, openExternalLink } from '../utils/helpers'

const Events: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'ongoing' | 'completed'>('upcoming')

  const upcomingEvents = [
    {
      id: 1,
      title: "CyberShot Photography Workshop",
      date: "October 15, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Multimedia Lab, Room 303",
      description: "Master the art of digital photography with hands-on training in composition, lighting, and post-processing techniques.",
      image: sampleImages.event(),
      registrationUrl: "https://forms.google.com/cybershot-workshop"
    },
    {
      id: 2,
      title: "VFX for Beginners Workshop",
      date: "October 22, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Computer Lab B, Block C",
      description: "Learn the fundamentals of visual effects using industry-standard software. Create your first VFX sequence!",
      image: sampleImages.event(),
      registrationUrl: "https://forms.google.com/vfx-workshop"
    },
    {
      id: 3,
      title: "Drone Cinematography Masterclass",
      date: "November 5, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "College Grounds & Auditorium",
      description: "Explore aerial cinematography techniques and learn to create stunning drone footage with professional pilots.",
      image: sampleImages.event(),
      registrationUrl: "https://forms.google.com/drone-masterclass"
    },
    {
      id: 4,
      title: "Motion Graphics Intensive",
      date: "November 12, 2025",
      time: "1:00 PM - 6:00 PM",
      location: "Design Studio, Block A",
      description: "Create compelling motion graphics for social media, advertisements, and digital content using After Effects.",
      image: sampleImages.event(),
      registrationUrl: "https://forms.google.com/motion-graphics"
    }
  ]

  const ongoingContests = [
    {
      id: 1,
      title: "Monthly Photo Challenge",
      deadline: "October 31, 2025",
      theme: "Urban Shadows",
      description: "Capture the play of light and shadow in urban environments. Submit your best shot for a chance to win exciting prizes!",
      prize: "₹5,000 + Certificate",
      participants: 45,
      registrationUrl: "https://forms.google.com/photo-challenge"
    },
    {
      id: 2,
      title: "Short Film Contest 2025",
      deadline: "December 15, 2025",
      theme: "Future Visions",
      description: "Create a 3-5 minute short film exploring themes of technology, society, and human connection in the digital age.",
      prize: "₹15,000 + Internship Opportunity",
      participants: 28,
      registrationUrl: "https://forms.google.com/film-contest"
    },
    {
      id: 3,
      title: "Logo Design Competition",
      deadline: "November 20, 2025",
      theme: "Sustainable Tech",
      description: "Design a logo for a fictional sustainable technology company. Show your creativity and design thinking skills.",
      prize: "₹3,000 + Featured Portfolio",
      participants: 32,
      registrationUrl: "https://forms.google.com/logo-design"
    }
  ]

  const completedEvents = [
    {
      id: 1,
      title: "Digital Art Exhibition 2024",
      date: "September 20, 2024",
      description: "A showcase of digital artworks created by club members, featuring photography, digital paintings, and interactive media.",
      attendees: 200,
      galleryUrl: "https://photos.google.com/exhibition-2024"
    },
    {
      id: 2,
      title: "Adobe Creative Suite Workshop",
      date: "August 15, 2024",
      description: "Intensive workshop covering Photoshop, Illustrator, Premiere Pro, and After Effects fundamentals.",
      attendees: 85,
      galleryUrl: "https://photos.google.com/adobe-workshop"
    },
    {
      id: 3,
      title: "Campus Film Festival",
      date: "July 10, 2024",
      description: "Annual film festival featuring student-made short films, documentaries, and experimental videos.",
      attendees: 350,
      galleryUrl: "https://photos.google.com/film-festival"
    },
    {
      id: 4,
      title: "Street Photography Walk",
      date: "June 25, 2024",
      description: "Guided photography walk through the city streets, focusing on candid moments and urban storytelling.",
      attendees: 30,
      galleryUrl: "https://photos.google.com/street-photography"
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
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card-grid">
            {upcomingEvents.map((event, index) => (
              <motion.div 
                key={event.id}
                className="card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src={event.image} 
                  alt={event.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    objectFit: 'cover'
                  }}
                />
                
                <h3>{event.title}</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#00FF41' }}>
                  <Calendar size={16} />
                  <span>{event.date}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#CCCCCC' }}>
                  <Clock size={16} />
                  <span>{event.time}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#CCCCCC' }}>
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
                
                <p style={{ marginBottom: '1.5rem' }}>{event.description}</p>
                
                <button 
                  className="btn"
                  onClick={() => openExternalLink(event.registrationUrl)}
                  style={{ width: '100%' }}
                >
                  Register Now
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Ongoing Contests */}
      {activeTab === 'ongoing' && (
        <motion.section 
          className="section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card-grid">
            {ongoingContests.map((contest, index) => (
              <motion.div 
                key={contest.id}
                className="card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Trophy size={24} color="#00FF41" />
                  <h3 style={{ margin: 0 }}>{contest.title}</h3>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#FF4444' }}>
                    <Clock size={16} />
                    <span>Deadline: {contest.deadline}</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#00FF41' }}>
                    <span>💰 Prize: {contest.prize}</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#CCCCCC' }}>
                    <Users size={16} />
                    <span>{contest.participants} participants</span>
                  </div>
                </div>
                
                <p style={{ marginBottom: '0.5rem', color: '#00FF41', fontWeight: 'bold' }}>
                  Theme: {contest.theme}
                </p>
                <p style={{ marginBottom: '1.5rem' }}>{contest.description}</p>
                
                <button 
                  className="btn"
                  onClick={() => openExternalLink(contest.registrationUrl)}
                  style={{ width: '100%' }}
                >
                  Participate Now
                </button>
              </motion.div>
            ))}
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