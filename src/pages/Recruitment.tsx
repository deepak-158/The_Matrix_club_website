import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Lock, Clock, Users, Star, ChevronRight, CheckCircle, User, FileText, MessageSquare, Award } from 'lucide-react'

interface TeamInfo {
  id: string
  name: string
  icon: React.ElementType
  description: string
  skills: string[]
  positions: number | null
}

const TEAMS: TeamInfo[] = [
  {
    id: 'tech',
    name: 'Technical Team',
    icon: Star,
    description: 'Build and maintain web platforms, develop AI/ML projects, and push the boundaries of technology.',
    skills: ['React', 'TypeScript', 'Python', 'HTML/CSS', 'Node.js'],
    positions: null,
  },
  {
    id: 'design',
    name: 'Design Team',
    icon: Star,
    description: 'Create stunning visual content, design event assets, and build the club\'s visual brand identity.',
    skills: ['Figma', 'Photoshop', 'Illustrator', 'Canva', 'UI/UX'],
    positions: null,
  },
  {
    id: 'digital-media',
    name: 'Digital Media & Production',
    icon: Star,
    description: 'Produce video content, manage social media, and create media strategies for events.',
    skills: ['Premiere Pro', 'After Effects', 'Photography', 'Social Media', 'Content Creation'],
    positions: null,
  },
  {
    id: 'event',
    name: 'Event Management',
    icon: Star,
    description: 'Plan, organize, and execute club events, workshops, and competitions.',
    skills: ['Event Planning', 'Budget Management', 'Vendor Coordination', 'Team Leadership'],
    positions: null,
  },
  {
    id: 'pr',
    name: 'PR & Outreach',
    icon: Star,
    description: 'Build partnerships, manage club communications, and grow our network across campuses.',
    skills: ['Communication', 'Partnership Building', 'Public Speaking', 'Marketing'],
    positions: null,
  },
  {
    id: 'content',
    name: 'Content Team',
    icon: Star,
    description: 'Craft compelling written content for blogs, social media, and event materials.',
    skills: ['Creative Writing', 'Copywriting', 'Research', 'Storytelling'],
    positions: null,
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: Star,
    description: 'Handle club finances, budgeting for events, and managing sponsorship funds.',
    skills: ['Budgeting', 'Accounting', 'Excel', 'Financial Planning'],
    positions: null,
  },
]

const TIMELINE = [
  { icon: FileText, label: 'Applications Open', description: 'Submit your application with your portfolio', done: true },
  { icon: User, label: 'Portfolio Review', description: 'Our team reviews all submitted portfolios', done: true },
  { icon: MessageSquare, label: 'Interview Round', description: 'Selected candidates will be interviewed', done: true },
  { icon: Award, label: 'Final Selection', description: 'Results announced and teams finalized', done: true },
]

const Recruitment: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)

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
        <h1>Join The Matrix</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: 600, margin: '0 auto' }}>
          Become part of VIT Bhopal's premier multimedia club
        </p>
      </motion.section>

      {/* Status Banner */}
      <motion.section
        className="section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
      >
        <div
          style={{
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: 10,
            padding: '1.5rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            textAlign: 'center',
          }}
        >
          <Lock size={24} color="#999" />
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#FFF' }}>Recruitment is Currently Closed</h3>
            <p style={{ margin: '0.3rem 0 0', fontSize: '0.9rem', color: '#999' }}>
              Follow our social media for updates on the next recruitment cycle
            </p>
          </div>
        </div>
      </motion.section>

      {/* Teams */}
      <motion.section
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Our Teams</h2>

        <div className="recruitment-grid">
          {TEAMS.map((team, i) => (
            <motion.div
              key={team.id}
              className="recruitment-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <team.icon size={24} color="#FFF" />
                  <h3 style={{ margin: 0, color: '#FFF' }}>{team.name}</h3>
                </div>

                {team.positions != null && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: '#333',
                      borderRadius: 15,
                      padding: '0.3rem 0.8rem',
                      fontSize: '0.8rem',
                      color: '#CCC',
                      marginBottom: '0.8rem',
                    }}
                  >
                    <Users size={14} />
                    {team.positions} positions available
                  </div>
                )}

                <p style={{ color: '#CCC', marginBottom: '1rem', lineHeight: 1.6, textAlign: 'left' }}>
                  {team.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  {team.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag"
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        color: '#FFF',
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="closed-badge">
                <Lock size={16} />
                Applications Closed
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Timeline */}
      <motion.section
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Recruitment Timeline</h2>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          {TIMELINE.map((step, i) => (
            <motion.div
              key={i}
              style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: i < TIMELINE.length - 1 ? '0.5rem' : 0,
                position: 'relative',
              }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              {/* Connector line */}
              {i < TIMELINE.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 19,
                    top: 40,
                    width: 2,
                    height: 'calc(100% - 10px)',
                    background: step.done ? '#666' : '#333',
                  }}
                />
              )}

              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: step.done ? '#333' : '#222',
                  border: `2px solid ${step.done ? '#FFF' : '#444'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {step.done ? <CheckCircle size={18} color="#FFF" /> : <Clock size={18} color="#666" />}
              </div>

              <div style={{ paddingBottom: '1.5rem' }}>
                <h4 style={{ color: '#FFF', margin: '0 0 0.3rem', fontWeight: 600 }}>{step.label}</h4>
                <p style={{ color: '#999', margin: 0, fontSize: '0.9rem', textAlign: 'left' }}>{step.description}</p>
              </div>
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
        <h2>Questions?</h2>
        <p style={{ marginBottom: '2rem' }}>
          Feel free to reach out to us for any queries about joining The Matrix Club.
        </p>
        <Link to="/contact" className="btn">
          <ChevronRight size={20} style={{ marginRight: 8, verticalAlign: 'middle' }} />
          Contact Us
        </Link>
      </motion.section>
    </div>
  )
}

export default Recruitment
