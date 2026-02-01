import React, { memo, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { Camera, Video, Zap, ExternalLink } from 'lucide-react'
import { openExternalLink } from '../utils/helpers'

/* -------------------------------
   Optimized Gallery Card
-------------------------------- */

const GalleryCard = memo(({ item, delay }: any) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <m.div
      style={{
        position: 'relative',
        width: '100%',
        height: '200px',
        background: '#222',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        willChange: 'transform'
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, delay }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 10px 30px rgba(0,255,65,0.3)'
      }}
    >
      {/* Skeleton */}
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg,#222,#333,#222)',
            animation: 'pulse 1.2s infinite'
          }}
        />
      )}

      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity .4s ease'
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0,255,65,0.85)',
          borderRadius: '50%',
          padding: '6px',
          color: '#111'
        }}
      >
        {item.type === 'video' ? <Video size={16} /> : <Camera size={16} />}
      </div>
    </m.div>
  )
})

/* -------------------------------
   Home Page
-------------------------------- */

const Home: React.FC = () => {
  const MediaMorphosis = useMemo(
    () => [
      { id: 1, type: 'image', src: '/images/events/MediaMorphosis/6.JPG', alt: 'Photography work 1' },
      { id: 2, type: 'image', src: '/images/events/MediaMorphosis/2.JPG', alt: 'Photography work 2' },
      { id: 3, type: 'image', src: '/images/events/MediaMorphosis/3.JPG', alt: 'Photography work 3' },
      { id: 4, type: 'image', src: '/images/events/MediaMorphosis/4.JPG', alt: 'Photography work 4' },
      { id: 5, type: 'image', src: '/images/events/MediaMorphosis/5.JPG', alt: 'Photography work 5' },
      { id: 6, type: 'image', src: '/images/events/MediaMorphosis/1.JPG', alt: 'Photography work 6' }
    ],
    []
  )

  const AIRM2025 = useMemo(
    () => [
      { id: 1, type: 'image', src: '/images/events/AIRM1/1.jpeg', alt: 'AIRM work 1' },
      { id: 2, type: 'image', src: '/images/events/AIRM1/2.jpeg', alt: 'AIRM work 2' },
      { id: 3, type: 'image', src: '/images/events/AIRM1/3.jpeg', alt: 'AIRM work 3' },
      { id: 4, type: 'image', src: '/images/events/AIRM1/4.jpeg', alt: 'AIRM work 4' },
      { id: 5, type: 'image', src: '/images/events/AIRM1/5.jpeg', alt: 'AIRM work 5' },
      { id: 6, type: 'image', src: '/images/events/AIRM1/6.jpeg', alt: 'AIRM work 6' }
    ],
    []
  )

  return (
    <LazyMotion features={domAnimation}>
      <div>
        {/* HERO */}
        <section className="hero">
          <m.div
            className="hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1>Welcome to The Matrix Club</h1>
            <p className="tagline">Decoding Creativity | Your Reality, Reimagined.</p>

            <Link to="/events" className="btn">
              <Zap size={20} style={{ marginRight: 8 }} />
              Explore Our Events
            </Link>
          </m.div>
        </section>

        {/* ABOUT */}
        <m.section
          className="section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Enter The Matrix</h2>
          <p>
            We are a community of creators, innovators, and storytellers. From filmmaking and
            graphic design to animation and VFX, we explore every pixel of the digital world.
          </p>
          <p>
            Join us in pushing the boundaries of multimedia art and technology, where your creative
            vision becomes reality.
          </p>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/about" className="btn btn-secondary">
              Learn More About Us
            </Link>
          </div>
        </m.section>

        {/* MEDIA MORPHOSIS */}
        <m.section
          className="section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Glimpses of Media Morphosis</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
              gap: '1rem',
              marginTop: '3rem'
            }}
          >
            {MediaMorphosis.map((item, i) => (
              <GalleryCard key={item.id} item={item} delay={i * 0.08} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              className="btn btn-secondary"
              onClick={() =>
                openExternalLink('https://www.instagram.com/thematrixclub_vitb/')
              }
            >
              <ExternalLink size={20} style={{ marginRight: 8 }} />
              View Full Portfolio
            </button>
          </div>

          <br />

          {/* AIRM */}
          <h2>Glimpses of AIRM 2025</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
              gap: '1rem',
              marginTop: '3rem'
            }}
          >
            {AIRM2025.map((item, i) => (
              <GalleryCard key={item.id} item={item} delay={i * 0.08} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              className="btn btn-secondary"
              onClick={() =>
                openExternalLink('https://www.instagram.com/thematrixclub_vitb/')
              }
            >
              <ExternalLink size={20} style={{ marginRight: 8 }} />
              View Full Portfolio
            </button>
          </div>
        </m.section>
      </div>
    </LazyMotion>
  )
}

export default Home
