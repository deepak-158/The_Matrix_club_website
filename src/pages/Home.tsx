import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, Video, Palette, Zap, ExternalLink } from 'lucide-react'
import { sampleImages, openExternalLink } from '../utils/helpers'

const Home: React.FC = () => {
  const featuredEvents = [
    {
      id: 1,
      title: "CyberShot Workshop",
      date: "Oct 15, 2025",
      image: sampleImages.event(),
      description: "Master digital photography techniques",
      registrationUrl: "https://forms.google.com/cybershot-workshop"
    },
    {
      id: 2,
      title: "VFX Masterclass",
      date: "Oct 22, 2025",
      image: sampleImages.event(),
      description: "Learn professional visual effects",
      registrationUrl: "https://forms.google.com/vfx-masterclass"
    },
    {
      id: 3,
      title: "Short Film Contest",
      date: "Nov 5, 2025",
      image: sampleImages.event(),
      description: "Showcase your storytelling skills",
      registrationUrl: "https://forms.google.com/film-contest"
    }
  ]

  const galleryItems = [
    { id: 1, type: 'image', src: sampleImages.gallery(), alt: "Photography work 1" },
    { id: 2, type: 'video', src: sampleImages.gallery(), alt: "Video project 1" },
    { id: 3, type: 'image', src: sampleImages.gallery(), alt: "Design work 1" },
    { id: 4, type: 'image', src: sampleImages.gallery(), alt: "Photography work 2" },
    { id: 5, type: 'video', src: sampleImages.gallery(), alt: "Video project 2" },
    { id: 6, type: 'image', src: sampleImages.gallery(), alt: "Design work 2" },
    { id: 7, type: 'image', src: sampleImages.gallery(), alt: "Photography work 3" },
    { id: 8, type: 'video', src: sampleImages.gallery(), alt: "Video project 3" }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Welcome to The Matrix Club</h1>
          <p className="tagline">Decoding Creativity | Your Reality, Reimagined.</p>
          <Link to="/events" className="btn">
            <Zap size={20} style={{ marginRight: '8px' }} />
            Explore Our Events
          </Link>
        </motion.div>
      </section>

      {/* Who We Are Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Enter The Matrix</h2>
        <p>
          We are a community of creators, innovators, and storytellers. From filmmaking 
          and graphic design to animation and VFX, we explore every pixel of the digital world.
        </p>
        <p>
          Join us in pushing the boundaries of multimedia art and technology, where your 
          creative vision becomes reality.
        </p>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/about" className="btn btn-secondary">
            Learn More About Us
          </Link>
        </div>
      </motion.section>

      {/* Featured Events Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Featured Events</h2>
        <div className="card-grid">
          {featuredEvents.map((event, index) => (
            <motion.div 
              key={event.id}
              className="card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
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
              <p style={{ color: '#00FF41', marginBottom: '0.5rem' }}>{event.date}</p>
              <p>{event.description}</p>
              <button 
                className="btn"
                onClick={() => openExternalLink(event.registrationUrl)}
              >
                Register Now
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Gallery Preview Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Glimpses of Our Universe</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginTop: '3rem'
        }}>
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              style={{
                position: 'relative',
                width: '100%',
                height: '200px',
                background: '#333',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(0, 255, 65, 0.3)'
              }}
            >
              <img 
                src={item.src}
                alt={item.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0, 255, 65, 0.8)',
                borderRadius: '50%',
                padding: '5px',
                color: '#111'
              }}>
                {item.type === 'video' ? <Video size={16} /> : <Camera size={16} />}
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button 
            className="btn btn-secondary"
            onClick={() => openExternalLink('https://instagram.com/thematrixclub')}
          >
            <ExternalLink size={20} style={{ marginRight: '8px' }} />
            View Full Portfolio
          </button>
        </div>
      </motion.section>

      {/* Skills/Services Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>What We Create</h2>
        <div className="card-grid">
          <motion.div 
            className="card"
            whileHover={{ scale: 1.05 }}
          >
            <Camera size={40} style={{ color: '#00FF41', marginBottom: '1rem' }} />
            <h3>Photography</h3>
            <p>Capturing moments through digital artistry and advanced techniques.</p>
          </motion.div>
          
          <motion.div 
            className="card"
            whileHover={{ scale: 1.05 }}
          >
            <Video size={40} style={{ color: '#00FF41', marginBottom: '1rem' }} />
            <h3>Videography</h3>
            <p>Storytelling through motion pictures and cinematic experiences.</p>
          </motion.div>
          
          <motion.div 
            className="card"
            whileHover={{ scale: 1.05 }}
          >
            <Palette size={40} style={{ color: '#00FF41', marginBottom: '1rem' }} />
            <h3>Graphic Design</h3>
            <p>Visual communication through innovative design and digital art.</p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home