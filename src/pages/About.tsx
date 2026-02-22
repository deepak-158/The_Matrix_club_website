import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Linkedin, Instagram, Github, Sparkles, Eye, Heart, Target } from 'lucide-react'
import { teamMembers, TEAM_ORDER, obfuscateEmail, type TeamMember } from '../data/teamMembers'
import { teamAvatarUrl, sponsorLogoUrl } from '../utils/cloudinary'
import OptimizedImage from '../components/OptimizedImage'

/* ─── Sponsor Data ─── */
const SPONSORS = [
  { name: 'Unstop', logo: '/images/sponsors/image.png' },
]

/* ─── Values ─── */
const VALUES = [
  { icon: Sparkles, title: 'Innovation', desc: 'Pushing the boundaries of multimedia and technology' },
  { icon: Target, title: 'Mission', desc: 'To empower students with hands-on multimedia skills and foster a creative environment' },
  { icon: Eye, title: 'Vision', desc: 'To be the leading multimedia club that bridges creativity and technology' },
  { icon: Heart, title: 'Community', desc: 'Building a collaborative space for creative minds to thrive' },
]

/* ─── Team Member Card ─── */
function MemberCard({ member }: { member: TeamMember }) {
  const avatarSrc = teamAvatarUrl(member.image)
  const hasSocial = member.linkedin || member.instagram || member.github

  return (
    <motion.div
      style={{
        background: '#222',
        border: '1px solid #333',
        borderRadius: 10,
        padding: '1.5rem',
        textAlign: 'center',
        minWidth: 0,
      }}
      whileHover={{ borderColor: '#FFFFFF', scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="team-avatar">
        <OptimizedImage
          src={avatarSrc}
          alt={member.name}
          width={120}
          height={120}
          borderRadius="50%"
        />
      </div>

      <h4 style={{ color: '#FFF', margin: '0 0 0.3rem', fontSize: '1rem' }}>{member.name}</h4>
      <span
        style={{
          display: 'inline-block',
          color: '#CCC',
          fontSize: '0.8rem',
          margin: '0 0 0.5rem',
          background: 'rgba(255,255,255,0.08)',
          padding: '2px 10px',
          borderRadius: 12,
        }}
      >
        {member.role}
      </span>
      <p style={{ color: '#999', fontSize: '0.85rem', margin: '0.5rem 0', lineHeight: 1.4, fontStyle: 'italic' }}>
        "{member.bio}"
      </p>

      {/* Social Links */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '0.8rem' }}>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="team-social-btn"
            aria-label={`${member.name} LinkedIn`}
          >
            <Linkedin size={18} />
          </a>
        )}
        {member.instagram && (
          <a
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="team-social-btn"
            aria-label={`${member.name} Instagram`}
          >
            <Instagram size={18} />
          </a>
        )}
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="team-social-btn"
            aria-label={`${member.name} GitHub`}
          >
            <Github size={18} />
          </a>
        )}
        {!hasSocial && member.email && (
          <span style={{ color: '#666', fontSize: '0.8rem' }}>
            📧 {obfuscateEmail(member.email).split('@')[0]}
          </span>
        )}
      </div>
    </motion.div>
  )
}

/* ─── About Page ─── */
const About: React.FC = () => {
  const groupedTeams = useMemo(() => {
    const groups: Record<string, TeamMember[]> = {}
    for (const name of TEAM_ORDER) {
      groups[name] = teamMembers.filter((m) => m.team === name)
    }
    return groups
  }, [])

  return (
    <div style={{ paddingTop: 100 }}>
      {/* Header */}
      <motion.section
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', paddingBottom: '2rem' }}
      >
        <h1>About The Matrix Club</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: 600, margin: '0 auto' }}>
          VIT Bhopal's premier multimedia club — where creativity meets technology
        </p>
      </motion.section>

      {/* Values */}
      <motion.section
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="card-grid">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              className="card"
              style={{ minHeight: 'auto' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div style={{ textAlign: 'center' }}>
                <v.icon size={40} color="#FFF" style={{ marginBottom: '1rem' }} />
                <h3 style={{ marginBottom: '0.8rem' }}>{v.title}</h3>
                <p style={{ color: '#CCC', textAlign: 'center' }}>{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team */}
      <motion.section
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Meet Our Team</h2>
        {TEAM_ORDER.map((teamName) => {
          const members = groupedTeams[teamName]
          if (!members || members.length === 0) return null

          return (
            <div key={teamName} style={{ marginBottom: '3rem' }}>
              <h3
                style={{
                  color: '#FFF',
                  fontSize: '1.3rem',
                  fontFamily: "'Share Tech Mono', monospace",
                  borderBottom: '1px solid #333',
                  paddingBottom: '0.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                {teamName}
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {members.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )
        })}
      </motion.section>

      {/* Sponsors */}
      <motion.section
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Our Sponsors</h2>
        <p style={{ textAlign: 'center', marginBottom: '3rem' }}>
          Sponsored the event "Media Morphosis"
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {SPONSORS.map((sponsor) => (
            <motion.div
              key={sponsor.name}
              style={{
                width: 180,
                height: 100,
                background: '#222',
                border: '1px solid #333',
                borderRadius: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
              }}
              whileHover={{ borderColor: '#FFFFFF', scale: 1.05 }}
            >
              <img
                src={sponsorLogoUrl(sponsor.logo)}
                alt={sponsor.name}
                width={120}
                height={60}
                loading="lazy"
                decoding="async"
                style={{ maxWidth: 120, maxHeight: 60, objectFit: 'contain', marginBottom: '0.5rem', borderRadius: 8 }}
              />
              <span style={{ fontSize: '0.8rem', color: '#999' }}>{sponsor.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center' }}
      >
        <h2>Ready to Join The Matrix?</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Become part of our creative community and start your journey into
          the world of multimedia excellence.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/recruitment" className="btn">
            Join Our Club
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Contact Us
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

export default About
