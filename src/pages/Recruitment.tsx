import React from 'react'
import { motion } from 'framer-motion'
import { Users, Calendar, ExternalLink, CheckCircle, CheckCircle2, Target, Zap } from 'lucide-react'
import { openExternalLink } from '../utils/helpers'

const Recruitment: React.FC = () => {
  const recruitmentTeams = [
    {
      id: 1,
      name: "TECHNICAL TEAM",
      description: "Join our tech wizards in building innovative solutions and web applications.",
      requirements: [
        "Basic knowledge of programming (Python, JavaScript, Java, etc.)",
        "Interest in web development, AI/ML, or mobile app development",
        "Problem-solving mindset and eagerness to learn",
        "Experience with Git/GitHub is a plus"
      ],
      skills: ["Full Stack Development", "Machine Learning", "DevOps", "Mobile Development"],
      positions:null,
      applicationLink: "https://forms.gle/3qXoyBYXHi2kXnPM6",
      icon: "💻",
      color: "#00FF41"
    },
    {
      id: 2,
      name: "DESIGN TEAM",
      description: "Create stunning visual experiences and bring creative concepts to life.",
      requirements: [
        "Proficiency in design tools (Photoshop, Illustrator, Figma, etc.)",
        "Strong aesthetic sense and attention to detail",
        "Understanding of design principles and color theory",
        "Portfolio showcasing previous design work"
      ],
      skills: ["UI/UX Design", "Graphic Design", "Brand Identity", "Digital Art"],
      positions:null,
      applicationLink: "https://forms.gle/ky9NDYoMi6muutoA8",
      icon: "🎨",
      color: "#FF6B6B"
    },
    {
      id: 3,
      name: "DIGITAL MEDIA & PRODUCTION",
      description: "Master the art of visual storytelling through photography and videography.",
      requirements: [
        "Experience with photography or videography",
        "Knowledge of editing software (Premiere Pro, After Effects, etc.)",
        "Creative eye for visual composition",
        "Own camera equipment preferred but not mandatory"
      ],
      skills: ["Photography", "Video Editing", "Content Creation", "Visual Effects"],
      positions:null,
      applicationLink: "https://forms.gle/EtbNSJhFhZpyLWaM9",
      icon: "📸",
      color: "#4ECDC4"
    },
    {
      id: 4,
      name: "EVENT MANAGEMENT",
      description: "Organize and execute memorable events that bring the community together.",
      requirements: [
        "Strong organizational and leadership skills",
        "Experience in event planning or coordination",
        "Excellent communication and teamwork abilities",
        "Ability to work under pressure and meet deadlines"
      ],
      skills: ["Event Planning", "Project Management", "Vendor Coordination", "Logistics"],
      positions:null,
      applicationLink: "https://forms.gle/rNg6gxkUKSySj1gt9",
      icon: "🎉",
      color: "#FFE66D"
    },
    {
      id: 5,
      name: "PR & OUTREACH",
      description: "Build relationships and expand our community reach through strategic communications.",
      requirements: [
        "Excellent verbal and written communication skills",
        "Experience with social media management",
        "Networking and relationship-building abilities",
        "Knowledge of marketing principles is a plus"
      ],
      skills: ["Public Relations", "Social Media", "Marketing", "Community Building"],
      positions:null,
      applicationLink: "https://forms.gle/3xHFCfxmRu2AhtYQA",
      icon: "📢",
      color: "#A8E6CF"
    },
    {
      id: 6,
      name: "FINANCE TEAM",
      description: "Manage club finances and ensure sustainable growth through strategic planning.",
      requirements: [
        "Basic understanding of accounting and finance",
        "Attention to detail and analytical skills",
        "Experience with spreadsheets and financial tools",
        "Trustworthy and responsible attitude"
      ],
      skills: ["Financial Planning", "Budget Management", "Sponsorship", "Resource Allocation"],
      positions:null,
      applicationLink: "https://forms.gle/UiXizqQsPC8eK4uq7",
      icon: "💰",
      color: "#FFB6C1"
    },
    {
  id: 7,
  name: "CONTENT TEAM",
  description: "Craft compelling narratives and engage our audience through creative writing and storytelling across all our platforms.",
  requirements: [
    "Excellent command of language, grammar, and style",
    "Ability to write engaging copy for social media and scripts",
    "A creative mindset with a knack for storytelling",
    "Experience in writing for blogs, social media, or scripts is a plus"
  ],
  skills: ["Copywriting", "Content Strategy", "Storytelling", "Script Writing"],
  positions:null,
  applicationLink: "https://forms.gle/m3dPd8V2N4ZbYWB58",
  icon: "📝",
  color: "#87CEEB"
}
  ]

  const recruitmentTimeline = [
    {
      phase: "Registration Opens",
      date: "Oct 15 - Oct 25, 2025",
      description: "Recruitment announcement and team - wise form fillup ",
      status: "upcoming"
    },
    {
      phase: "Shortlisting - Round 1",
      date: "Oct 27 - Oct 28, 2025",
      description: "Review of applications",
      status: "upcoming"
    },
    {
      phase: "Interview Round",
      date: "Nov 1 - 6, 2025",
      description: "One-on-one interviews",
      status: "upcoming"
    },
    {
      phase: "Final Selection",
      date: "Nov 7, 2025",
      description: "Results announcement",
      status: "upcoming"
    }
  ]

  return (
    <div style={{ paddingTop: '100px' }}>
      {/* Header Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', paddingBottom: '2rem' }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#00FF41' }}>
          Join The Matrix
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#CCCCCC' }}>
          Ready to be part of something extraordinary? The Matrix Club is looking for passionate 
          individuals to join our creative community. Choose your path and help us push the 
          boundaries of multimedia excellence.
        </p>
      </motion.section>

      {/* Team Recruitment Cards */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Choose Your Team</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '2rem' 
        }}>
          {recruitmentTeams.map((team, index) => (
            <motion.div
              key={team.id}
              style={{
                background: '#222',
                border: '1px solid #333',
                borderRadius: '15px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '600px'
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                borderColor: team.color,
                boxShadow: `0 10px 30px ${team.color}20`
              }}
            >
              {/* Content Container */}
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                {/* Team Header */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '1.5rem' 
                }}>
                  <span style={{ fontSize: '2rem', marginRight: '1rem' }}>{team.icon}</span>
                  <div style={{ flex: '1', minWidth: '0' }}>
                    <h3 style={{ 
                      color: team.color, 
                      margin: '0 0 0.5rem 0',
                      fontSize: '1.3rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textAlign: 'left'
                    }}>
                      {team.name}
                    </h3>
                    <p style={{ 
                      color: '#00FF41', 
                      margin: '0',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      textAlign: 'left'
                    }}>
                      {team.positions} Available
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p style={{ 
                  color: '#CCCCCC', 
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  {team.description}
                </p>

                {/* Skills */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>Key Skills:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {team.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        style={{
                          background: `${team.color}20`,
                          color: team.color,
                          padding: '0.3rem 0.8rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          border: `1px solid ${team.color}50`
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div style={{ marginBottom: '2rem', flex: '1' }}>
                  <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>Requirements:</h4>
                  <ul style={{ 
                    color: '#CCCCCC', 
                    paddingLeft: '1.2rem',
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                  }}>
                    {team.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} style={{ marginBottom: '0.3rem' }}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Apply Button */}
              <motion.button
                style={{
                  width: '100%',
                  background: `linear-gradient(135deg, ${team.color}, ${team.color}CC)`,
                  color: '#111',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '1rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openExternalLink(team.applicationLink)}
              >
                <ExternalLink size={20} />
                Apply for {team.name}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* Why Join Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Why Join The Matrix Club?</h2>
        <div className="card-grid">
          <motion.div 
            className="card"
            whileHover={{ scale: 1.05 }}
            style={{ textAlign: 'center' }}
          >
            <Target size={40} style={{ color: '#00FF41', marginBottom: '1rem' }} />
            <h3>Skill Development</h3>
            <p>Learn from industry experts and develop professional-level skills in your chosen field.</p>
          </motion.div>
          
          <motion.div 
            className="card"
            whileHover={{ scale: 1.05 }}
            style={{ textAlign: 'center' }}
          >
            <Users size={40} style={{ color: '#00FF41', marginBottom: '1rem' }} />
            <h3>Networking</h3>
            <p>Connect with like-minded creatives and build lasting professional relationships.</p>
          </motion.div>
          
          <motion.div 
            className="card"
            whileHover={{ scale: 1.05 }}
            style={{ textAlign: 'center' }}
          >
            <Zap size={40} style={{ color: '#00FF41', marginBottom: '1rem' }} />
            <h3>Real Projects</h3>
            <p>Work on actual projects and build an impressive portfolio that stands out.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Recruitment Timeline */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Recruitment Timeline</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {recruitmentTimeline.map((phase, index) => (
            <motion.div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2rem',
                padding: '1.5rem',
                background: phase.status === 'active' ? 'rgba(0, 255, 65, 0.1)' : 
                           phase.status === 'completed' ? 'rgba(0, 255, 65, 0.05)' : '#222',
                border: phase.status === 'active' ? '2px solid #00FF41' : 
                        phase.status === 'completed' ? '1px solid #00FF41' : '1px solid #333',
                borderRadius: '10px'
              }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div style={{
                minWidth: '40px',
                height: '40px',
                borderRadius: '50%',
                background: phase.status === 'active' ? '#00FF41' : 
                            phase.status === 'completed' ? '#00CC33' : '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1.5rem'
              }}>
                {phase.status === 'active' ? 
                  <CheckCircle size={24} color="#111" /> : 
                  phase.status === 'completed' ?
                  <CheckCircle2 size={24} color="#111" /> :
                  <Calendar size={24} color="#666" />
                }
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  color: phase.status === 'active' ? '#00FF41' : 
                         phase.status === 'completed' ? '#00CC33' : '#FFFFFF',
                  margin: '0 0 0.5rem 0' 
                }}>
                  {phase.phase}
                </h3>
                <p style={{ color: '#00FF41', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                  {phase.date}
                </p>
                <p style={{ color: '#CCCCCC', margin: '0', fontSize: '0.9rem' }}>
                  {phase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div style={{ 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #00FF41, #00CC33)',
          borderRadius: '15px',
          color: '#111',
          padding: '3rem 2rem',
          width: '100%',
          margin: '0'
        }}
        >
        <h2 style={{ color: '#111', marginBottom: '1rem' }}>Questions About Recruitment?</h2>
        <p style={{ 
          color: '#111', 
          fontSize: '1.1rem',
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          Have questions about the recruitment process or want to know more about a specific team? 
          We're here to help!
        </p>
          <motion.button
            className="btn"
            style={{
              background: '#111',
              color: '#00FF41',
              border: '2px solid #111'
            }}
            whileHover={{ 
              background: 'transparent',
              color: '#111',
              borderColor: '#111'
            }}
            onClick={() => window.location.href = '/contact'}
          >
            Contact Us
          </motion.button>
        </div>
      </motion.section>
    </div>
  )
}

export default Recruitment
