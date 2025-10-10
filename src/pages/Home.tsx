import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, Video, Zap, ExternalLink } from 'lucide-react'
import { openExternalLink } from '../utils/helpers'

const Home: React.FC = () => {
  const galleryItems = [
    { id: 1, type: 'image', src: "/images/events/6.JPG", alt: "Photography work 1" },
    { id: 2, type: 'image', src: "/images/events/2.JPG", alt: "Photography work 2" },
    { id: 3, type: 'image', src: "/images/events/3.JPG", alt: "Photography work 3" },
    { id: 4, type: 'image', src: "/images/events/4.JPG", alt: "Photography work 4" },
    { id: 5, type: 'image', src: "/images/events/5.JPG", alt: "Photography work 5" },
    { id: 6, type: 'image', src: "/images/events/1.JPG", alt: "Photography work 6" }
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

      {/* Gallery Preview Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Glimpses of Media Morphosis</h2>
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
            onClick={() => openExternalLink('https://www.instagram.com/thematrixclub_vitb/')}
          >
            <ExternalLink size={20} style={{ marginRight: '8px' }} />
            View Full Portfolio
          </button>
        </div>
      </motion.section>
    </div>
  )
}

export default Home