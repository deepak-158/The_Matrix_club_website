import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, ExternalLink, Trophy, Archive, Ticket, Clock } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

interface EventData {
  id: number
  title: string
  date: string
  description: string
  attendees: string | null
  status: string
  image_url: string | null
  gallery_url: string | null
  registration_url: string | null
  registration_open: number
}

/* ─── Event Card ─── */
function EventCard({ event, index }: { event: EventData; index: number }) {
  const isPast = event.status === 'completed'
  const isUpcoming = event.status === 'upcoming'
  const hasRegistration = event.registration_url && event.registration_open

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    } catch { return dateStr }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      style={{
        background: '#141414',
        border: '1px solid #262626',
        borderRadius: 16,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
      whileHover={{ borderColor: isUpcoming ? '#6366f1' : '#444', y: -4 }}
    >
      {/* Image */}
      {event.image_url ? (
        <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
          <img
            src={event.image_url}
            alt={event.title}
            width={600}
            height={220}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.8))' }} />

          {/* Status Badge */}
          <div style={{
            position: 'absolute', top: 14, left: 14,
            padding: '5px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.5px',
            background: isUpcoming ? '#6366f1' : isPast ? '#333' : '#22c55e',
            color: '#fff',
          }}>
            {event.status}
          </div>

          {/* Registration Tag */}
          {hasRegistration && (
            <div style={{
              position: 'absolute', top: 14, right: 14,
              padding: '5px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600,
              background: 'rgba(34,197,94,0.9)', color: '#fff',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <Ticket size={12} /> Registration Open
            </div>
          )}
        </div>
      ) : (
        <div style={{
          height: 140, background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
        }}>
          <span style={{ fontSize: '3rem', opacity: 0.3 }}>🎯</span>
          <div style={{
            position: 'absolute', top: 14, left: 14,
            padding: '5px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.5px',
            background: isUpcoming ? '#6366f1' : isPast ? '#333' : '#22c55e',
            color: '#fff',
          }}>
            {event.status}
          </div>
          {hasRegistration && (
            <div style={{
              position: 'absolute', top: 14, right: 14,
              padding: '5px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600,
              background: 'rgba(34,197,94,0.9)', color: '#fff',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <Ticket size={12} /> Registration Open
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{
          color: '#fff', fontSize: '1.3rem', margin: '0 0 0.8rem',
          fontFamily: "'Share Tech Mono', monospace",
        }}>
          {event.title}
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#999', fontSize: '0.85rem' }}>
            <Calendar size={14} color="#6366f1" />
            {formatDate(event.date)}
          </div>
          {event.attendees && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#999', fontSize: '0.85rem' }}>
              <Users size={14} color="#ec4899" />
              {event.attendees} attendees
            </div>
          )}
          {isUpcoming && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#999', fontSize: '0.85rem' }}>
              <Clock size={14} color="#f59e0b" />
              Upcoming
            </div>
          )}
        </div>

        <p style={{
          color: '#aaa', fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 1.5rem',
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {event.description}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          {hasRegistration && (
            <a
              href={event.registration_url!}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: 10,
                fontWeight: 600,
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
                minWidth: 'fit-content',
              }}
            >
              <Ticket size={18} />
              Register Now
            </a>
          )}

          {event.gallery_url && (
            <a
              href={event.gallery_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: hasRegistration ? 0 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 20px',
                background: 'transparent',
                color: '#aaa',
                textDecoration: 'none',
                borderRadius: 10,
                border: '1px solid #333',
                fontWeight: 500,
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
                minWidth: 'fit-content',
              }}
            >
              <ExternalLink size={16} />
              Gallery
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Tabs ─── */
type TabKey = 'upcoming' | 'ongoing' | 'completed'

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: 'upcoming', label: 'Upcoming', icon: Calendar },
  { key: 'ongoing', label: 'Ongoing', icon: Trophy },
  { key: 'completed', label: 'Archive', icon: Archive },
]

/* ─── Events Page ─── */
const Events: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('upcoming')
  const [events, setEvents] = useState<EventData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/api/events`, { credentials: 'include' })
      .then((r) => r.json())
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = events.filter((e) => e.status === activeTab)

  return (
    <div style={{ paddingTop: 100 }}>
      {/* Header */}
      <motion.section
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', paddingBottom: '1rem' }}
      >
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.5rem' }}>
          Our Events
        </h1>
        <p style={{ fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', color: '#999' }}>
          Workshops, contests, and creative experiences — find what's next
        </p>
      </motion.section>

      {/* Tabs */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <motion.div
          style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'center',
            marginBottom: '2.5rem',
            background: '#141414',
            borderRadius: 12,
            padding: '0.4rem',
            maxWidth: 500,
            margin: '0 auto 2.5rem',
            border: '1px solid #222',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '0.7rem 1rem',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                background: activeTab === key ? '#6366f1' : 'transparent',
                color: activeTab === key ? '#fff' : '#888',
              }}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <section className="section" style={{ paddingTop: 0 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ color: '#888' }}>Loading events...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: '1.5rem',
            maxWidth: 900,
            margin: '0 auto',
          }}>
            {filtered.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
          </div>
        ) : (
          <motion.div
            style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              minHeight: '40vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div style={{
              width: 80, height: 80, borderRadius: 20,
              background: '#6366f120', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.5rem',
            }}>
              <Calendar size={36} color="#6366f1" />
            </div>

            <motion.h2
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '2rem',
                color: '#fff',
                marginBottom: '0.8rem',
              }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {activeTab === 'upcoming' ? 'STAY TUNED' : activeTab === 'ongoing' ? 'COMING SOON' : 'NO ARCHIVED EVENTS'}
            </motion.h2>

            <p style={{ color: '#666', fontSize: '1rem', maxWidth: 400 }}>
              {activeTab === 'upcoming'
                ? 'New events are being planned. Follow us on Instagram for the latest updates!'
                : activeTab === 'ongoing'
                  ? 'No active contests right now. Check back soon for new challenges!'
                  : 'Event archives will appear here as events are completed.'}
            </p>
          </motion.div>
        )}
      </section>
    </div>
  )
}

export default Events
