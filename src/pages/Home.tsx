import { memo, useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { Camera, Video, Zap, ExternalLink } from 'lucide-react'
import { galleryThumbUrl } from '../utils/cloudinary'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

/* ─── Types ─── */
interface GalleryItem {
  id: number
  type: 'image' | 'video'
  src: string
  alt: string
}

interface AlbumWithImages {
  id: number
  title: string
  description: string | null
  images: { id: number; title: string; image_url: string }[]
}

/* ─── Gallery Card ─── */
const GalleryCard = memo<{ item: GalleryItem; delay: number }>(({ item, delay }) => {
  const [loaded, setLoaded] = useState(false)
  const optimizedSrc = item.src.startsWith('http') ? item.src : galleryThumbUrl(item.src)

  return (
    <m.div
      style={{
        position: 'relative',
        width: '100%',
        height: 200,
        background: '#222',
        borderRadius: 8,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255,255,255,0.3)' }}
    >
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg,#1a1a1a 25%,#2a2a2a 50%,#1a1a1a 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
      )}
      <img
        src={optimizedSrc}
        alt={item.alt}
        width={400}
        height={200}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity .4s ease',
          display: 'block',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: 'rgba(255,255,255,0.85)',
          borderRadius: '50%',
          padding: 6,
          color: '#000',
          display: 'flex',
        }}
      >
        {item.type === 'video' ? <Video size={16} /> : <Camera size={16} />}
      </div>
    </m.div>
  )
})

GalleryCard.displayName = 'GalleryCard'

/* ─── Home Page ─── */
const Home: React.FC = () => {
  // Static galleries for existing event photos
  const mediaMorphosis = useMemo<GalleryItem[]>(
    () => [
      { id: 1, type: 'image', src: '/images/events/MediaMorphosis/6.JPG', alt: 'Media Morphosis event photo' },
      { id: 2, type: 'image', src: '/images/events/MediaMorphosis/2.JPG', alt: 'Media Morphosis workshop' },
      { id: 3, type: 'image', src: '/images/events/MediaMorphosis/3.JPG', alt: 'Media Morphosis attendees' },
      { id: 4, type: 'image', src: '/images/events/MediaMorphosis/4.JPG', alt: 'Media Morphosis panel discussion' },
      { id: 5, type: 'image', src: '/images/events/MediaMorphosis/5.JPG', alt: 'Media Morphosis presentation' },
      { id: 6, type: 'image', src: '/images/events/MediaMorphosis/1.JPG', alt: 'Media Morphosis group photo' },
    ],
    []
  )

  const airm2025 = useMemo<GalleryItem[]>(
    () => [
      { id: 1, type: 'image', src: '/images/events/AIRM1/1.jpeg', alt: 'AIRM 2025 event photo' },
      { id: 2, type: 'image', src: '/images/events/AIRM1/2.jpeg', alt: 'AIRM 2025 session' },
      { id: 3, type: 'image', src: '/images/events/AIRM1/3.jpeg', alt: 'AIRM 2025 interaction' },
      { id: 4, type: 'image', src: '/images/events/AIRM1/4.jpeg', alt: 'AIRM 2025 workshop' },
      { id: 5, type: 'image', src: '/images/events/AIRM1/5.jpeg', alt: 'AIRM 2025 Q&A' },
      { id: 6, type: 'image', src: '/images/events/AIRM1/6.jpeg', alt: 'AIRM 2025 closing' },
    ],
    []
  )

  // Dynamic albums from admin panel
  const [dynamicAlbums, setDynamicAlbums] = useState<AlbumWithImages[]>([])

  useEffect(() => {
    // Fetch all albums with their images
    fetch(`${API_BASE}/api/gallery/albums`, { credentials: 'include' })
      .then((r) => r.json())
      .then(async (albums: { id: number; title: string; description: string | null; image_count: number }[]) => {
        // Only fetch albums that have images
        const withImages = albums.filter((a) => a.image_count > 0)
        const detailed = await Promise.all(
          withImages.map((a) =>
            fetch(`${API_BASE}/api/gallery/albums/${a.id}`, { credentials: 'include' })
              .then((r) => r.json())
          )
        )
        setDynamicAlbums(detailed)
      })
      .catch(console.error)
  }, [])

  const openPortfolio = () =>
    window.open('https://www.instagram.com/thematrixclub_vitb/', '_blank', 'noopener,noreferrer')

  return (
    <LazyMotion features={domAnimation}>
      <div>
        {/* Hero */}
        <section className="hero">
          <m.div
            className="hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1>Welcome to The Matrix Club</h1>
            <p className="tagline">Decoding Creativity | Your Reality, Reimagined.</p>
            <Link to="/events" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Zap size={20} />
              Explore Our Events
            </Link>
          </m.div>
        </section>

        {/* About */}
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

        {/* Dynamic Albums from Admin Panel */}
        {dynamicAlbums.map((album) => (
          <m.section
            key={album.id}
            className="section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>{album.title}</h2>
            {album.description && <p>{album.description}</p>}
            <div className="gallery-grid">
              {album.images.map((img, i) => (
                <GalleryCard
                  key={img.id}
                  item={{ id: img.id, type: 'image', src: img.image_url, alt: img.title }}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </m.section>
        ))}

        {/* Static Media Morphosis Gallery */}
        <m.section
          className="section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Glimpses of Media Morphosis</h2>
          <div className="gallery-grid">
            {mediaMorphosis.map((item, i) => (
              <GalleryCard key={item.id} item={item} delay={i * 0.08} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn btn-secondary" onClick={openPortfolio}>
              <ExternalLink size={20} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              View Full Portfolio
            </button>
          </div>

          <br />

          <h2>Glimpses of AIRM 2025</h2>
          <div className="gallery-grid">
            {airm2025.map((item, i) => (
              <GalleryCard key={item.id} item={item} delay={i * 0.08} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn btn-secondary" onClick={openPortfolio}>
              <ExternalLink size={20} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              View Full Portfolio
            </button>
          </div>
        </m.section>
      </div>
    </LazyMotion>
  )
}

export default Home
