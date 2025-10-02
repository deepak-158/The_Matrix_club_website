import React from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Instagram, Github, Target, Eye, Heart } from 'lucide-react'
import { sampleImages, openExternalLink } from '../utils/helpers'

const About: React.FC = () => {
  const teamMembers = [
    {
      id: "0",
      name: "Yuva Bharti",
      team: "LEADERSHIP",
      role: "President",
      bio: "Leading The Matrix Club towards excellence and innovation.",
      email: "yuva.bharti@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: null,
      instagram: null,
      github: null
    },
    {
      id: "00",
      name: "Yash Goyal",
      team: "LEADERSHIP",
      role: "Operation Manager",
      bio: "Managing operations and ensuring smooth functioning of all club activities.",
      email: "yash.goyal@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: null,
      instagram: null,
      github: null
    },
    {
      id: "1",
      name: "Eipshita Basuli",
      team: "DIGITAL MEDIA AND PRODUCTION TEAM",
      role: "Core Member",
      bio: "We don't just post, we produce.",
      email: "eipshita.24bac10038@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: null,
      instagram: "https://www.instagram.com/eipshitabasuli/",
      github: null
    },
    {
      id: "2",
      name: "AYUSH UPADHYAY",
      team: "EVENT MANAGEMENT",
      role: "Core Member",
      bio: "A great event leaves hearts full, not just calendars marked",
      email: "ayush.24mei10091@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: null,
      instagram: "https://www.instagram.com/royal7_ayush/",
      github: null
    },
    {
      id: "3",
      name: "Piyush Kumar Singh",
      team: "FINANCE",
      role: "Lead",
      bio: "Data Scientist || My models predict the future. You just pay the invoice.",
      email: "piyush.24bai10094@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: "https://www.linkedin.com/in/piyush-kumar-singh-b53749313/",
      instagram: "https://www.instagram.com/signature.piyush_/"
    },
    {
      id: "4",
      name: "Arav Acharya",
      team: "TECHNICAL",
      role: "Core Member",
      bio: "Turning caffeine into code | Full Stack Developer | Generative AI",
      email: "arav.23bce11788@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: "https://www.linkedin.com/in/arav-achari-115715281/",
      instagram: "https://www.instagram.com/_arav_acharya_?igsh=bnh1eXhieTZ6Zmdz"
    },
    {
      id: "5",
      name: "Mohammad Kaif",
      team: "PR AND OUTREACH",
      role: "Co-Lead",
      bio: "Still Figuring Out What PR Means || Outreach Ninja, Meme Enthusiast",
      email: "mohammad.23bai10510@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: null,
      instagram: "https://www.instagram.com/zkaifsyed46/"
    },
    {
      id: "6",
      name: "Ashmit Mudgal",
      team: "DIGITAL MEDIA AND PRODUCTION TEAM",
      role: "Co-Lead",
      bio: "Creating impact together",
      email: "ashmit.24bcy10376@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: null,
      instagram: "https://www.instagram.com/ashmit.mudgal/"
    },
    {
      id: "7",
      name: "KAUSHAL KANT",
      team: "DIGITAL MEDIA AND PRODUCTION TEAM",
      role: "Core Member",
      bio: "Driven by creativity, powered by media.",
      email: "kaushal.24bcy10062@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: "https://www.linkedin.com/in/kaushal-kant-718959323",
      instagram: "https://www.instagram.com/kaushal_3589/"
    },
    {
      id: "8",
      name: "Anushka",
      team: "PR AND OUTREACH",
      role: "Core Member",
      bio: "Turning connections into collaborations.",
      email: "anushka.24bai10805@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: "https://www.linkedin.com/in/anushka-09a694357/",
      instagram: null,
      github: null
    },
    {
      id: "9",
      name: "Shivang saini",
      team: "EVENT MANAGEMENT",
      role: "Co-Lead",
      bio: "No matter how many fish in the sea It would be so empty without me",
      email: "shivang.24bsa10306@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: "http://www.linkedin.com/inshivang-saini-455681328",
      instagram: "https://www.instagram.com/shivangsaini17/"
    },
    {
      id: "10",
      name: "Nikhil Mohammed",
      team: "DESIGN",
      role: "Lead",
      bio: "Design Team || Your idea, our canvas",
      email: "nikhil.23bai10718@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: "http://linkedin.com/in/nikhil-mohammed",
      instagram: "https://www.instagram.com/nikhil.mohammed"
    },
    {
      id: "11",
      name: "Anupriya",
      team: "DIGITAL MEDIA AND PRODUCTION TEAM",
      role: "Core Member",
      bio: "Capturing moments, Creating impact",
      email: "anupriya.24bce11110@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: "https://www.linkedin.com/in/anupriya-859445322",
      instagram: "https://www.instagram.com/anupriya36993"
    },
    {
      id: "12",
      name: "RUPANKITA BARUAH",
      team: "DESIGN",
      role: "Core Member",
      bio: "and so it goes",
      email: "rupankita.24bai10975@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: "https://www.linkedin.com/in/rupankita-baruah-b59678324/",
      instagram: null,
      github: null
    },
    {
      id: "13",
      name: "Sarthak Jalan",
      team: "TECHNICAL",
      role: "Core Member",
      bio: "Cloud & Backend || Deploying dreams, not just servers",
      email: "sarthak.23bsa10058@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: "https://www.linkedin.com/in/sarthak-jalan-7685a7285/",
      instagram: "https://www.instagram.com/frenzy_sarthak/",
      github: null
    },
    {
      id: "14",
      name: "Abhishek Mishra",
      team: "EVENT MANAGEMENT",
      role: "Core Member",
      bio: "Relentless in preparation. Undefeated in execution.",
      email: "abhishek.24bai10673@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: "https://www.linkedin.com/in/abhishek-mishra-74745a324",
      instagram: null,
      github: null
    },
    {
      id: "15",
      name: "Yash Saxena",
      team: "FINANCE",
      role: "Core Member",
      bio: "Finance Core Member || Making every rupee count",
      email: "yash.23bce10699@vitbhopal.ac.in",
      image: sampleImages.team(),
      linkedin: "https://www.linkedin.com/in/yash-saxena-5a6974279/",
      instagram: null,
      github: null
    },
    {
      id: "16",
      name: "Deepak Shukla",
      team: "TECHNICAL",
      role: "Co-Lead",
      bio: "Web & ML || Crafting full-stack experiences and teaching machines to read.",
      email: "deepak.23bce11422@vitbhopal.ac.in",
      image: "/images/team/DeepakShukla.jpg",
      linkedin: "https://www.linkedin.com/in/deepak-shukla-27a60628a/",
      instagram: "https://www.instagram.com/dipakshukla1508/",
      github: "https://github.com/deepak-158"
    }
  ]

  const sponsors = [
    { name: "College IT Department", logo: sampleImages.sponsor() },
    { name: "Student Affairs", logo: sampleImages.sponsor() },
    { name: "Adobe Creative", logo: sampleImages.sponsor() },
    { name: "Local Photography Studio", logo: sampleImages.sponsor() }
  ]

  return (
    <div style={{ paddingTop: '100px' }}>
      {/* Mission & Vision Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Our Core Code</h2>
        <div className="card-grid">
          <motion.div 
            className="card"
            whileHover={{ scale: 1.05 }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              justifyContent: 'flex-start',
              minHeight: '400px'
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <Target size={40} style={{ color: '#00FF41', marginBottom: '1rem' }} />
              <h3 style={{ margin: '0' }}>Mission</h3>
            </div>
            <p style={{ textAlign: 'center', flex: '1', margin: '0' }}>
              To create a vibrant community of multimedia enthusiasts who push the 
              boundaries of digital creativity. We aim to provide hands-on learning 
              experiences in photography, videography, graphic design, and emerging 
              technologies like VFX and animation.
            </p>
          </motion.div>
          
          <motion.div 
            className="card"
            whileHover={{ scale: 1.05 }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              justifyContent: 'flex-start',
              minHeight: '400px'
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <Eye size={40} style={{ color: '#00FF41', marginBottom: '1rem' }} />
              <h3 style={{ margin: '0' }}>Vision</h3>
            </div>
            <p style={{ textAlign: 'center', flex: '1', margin: '0' }}>
              To be the leading multimedia club that bridges the gap between 
              traditional art and digital innovation. We envision our members 
              becoming industry leaders who redefine creative expression in 
              the digital age.
            </p>
          </motion.div>
          
          <motion.div 
            className="card"
            whileHover={{ scale: 1.05 }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              justifyContent: 'flex-start',
              minHeight: '400px'
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <Heart size={40} style={{ color: '#00FF41', marginBottom: '1rem' }} />
              <h3 style={{ margin: '0' }}>Values</h3>
            </div>
            <p style={{ textAlign: 'center', flex: '1', margin: '0' }}>
              Innovation, collaboration, and continuous learning drive everything 
              we do. We believe in creating an inclusive environment where every 
              creative idea is valued and every member can grow their skills 
              through practical experience.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* About Club Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>About The Matrix Club</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Based at VIT Bhopal, The Matrix Club has grown from a small group of 
            creative enthusiasts to one of the most dynamic multimedia communities 
            on campus. Our club serves as a hub for students passionate about 
            visual storytelling, digital art, and cutting-edge technology.
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            We organize workshops, competitions, and collaborative projects that 
            help members develop professional-level skills in various multimedia 
            disciplines. From basic photography techniques to advanced VFX 
            workflows, our events cater to all skill levels and academic backgrounds.
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            Our team consists of talented students from various departments including 
            Computer Science, Artificial Intelligence, Design, and more. We believe 
            in the power of interdisciplinary collaboration to create innovative 
            multimedia experiences that push creative boundaries.
          </p>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>The Architects</h2>
        <p style={{ textAlign: 'center', marginBottom: '3rem', color: '#CCCCCC' }}>
          Meet the creative minds behind The Matrix Club
        </p>
        
        {/* Group team members by team */}
        {['LEADERSHIP', 'TECHNICAL', 'DESIGN', 'DIGITAL MEDIA AND PRODUCTION TEAM', 'EVENT MANAGEMENT', 'PR AND OUTREACH', 'FINANCE'].map((teamName, teamIndex) => {
          const teamMembersFiltered = teamMembers
            .filter(member => member.team === teamName)
            .sort((a, b) => {
              // Define hierarchy order
              const roleOrder = { 'President': 1, 'Operation Manager': 2, 'Lead': 3, 'Co-Lead': 4, 'Core Member': 5 }
              return (roleOrder[a.role as keyof typeof roleOrder] || 6) - (roleOrder[b.role as keyof typeof roleOrder] || 6)
            })
          if (teamMembersFiltered.length === 0) return null
          
          return (
            <div key={teamName} style={{ marginBottom: '4rem' }}>
              <motion.h3 
                style={{ 
                  color: '#00FF41', 
                  textAlign: 'center', 
                  marginBottom: '2rem',
                  fontSize: '1.5rem',
                  fontFamily: 'Share Tech Mono, monospace'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: teamIndex * 0.1 }}
                viewport={{ once: true }}
              >
                {teamName}
              </motion.h3>
              
              <div className="card-grid">
                {teamMembersFiltered.map((member, index) => (
                  <motion.div 
                    key={member.id}
                    className="card"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (teamIndex * 0.1) + (index * 0.1) }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    style={{ 
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <img 
                        src={member.image} 
                        alt={member.name}
                        style={{
                          width: '120px',
                          height: '120px',
                          borderRadius: '50%',
                          margin: '0 auto 1rem',
                          border: '3px solid #00FF41',
                          objectFit: 'cover'
                        }}
                      />
                      <h3 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>{member.name}</h3>
                      <p style={{ color: '#CCCCCC', marginBottom: '0.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
                        {member.role}
                      </p>
                      <p style={{ color: '#FFFFFF', marginBottom: '1rem', fontSize: '0.85rem', fontStyle: 'italic', minHeight: '50px', lineHeight: '1.4', textAlign: 'center' }}>
                        "{member.bio}"
                      </p>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                      {member.linkedin && (
                        <button 
                          onClick={() => openExternalLink(member.linkedin!)} 
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: '#00FF41', 
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '50%',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 255, 65, 0.1)'
                            e.currentTarget.style.transform = 'scale(1.2)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                            e.currentTarget.style.transform = 'scale(1)'
                          }}
                        >
                          <Linkedin size={20} />
                        </button>
                      )}
                      {member.instagram && (
                        <button 
                          onClick={() => openExternalLink(member.instagram!)} 
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: '#00FF41', 
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '50%',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 255, 65, 0.1)'
                            e.currentTarget.style.transform = 'scale(1.2)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                            e.currentTarget.style.transform = 'scale(1)'
                          }}
                        >
                          <Instagram size={20} />
                        </button>
                      )}
                      {member.github && (
                        <button 
                          onClick={() => openExternalLink(member.github!)} 
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: '#00FF41', 
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '50%',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 255, 65, 0.1)'
                            e.currentTarget.style.transform = 'scale(1.2)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                            e.currentTarget.style.transform = 'scale(1)'
                          }}
                        >
                          <Github size={20} />
                        </button>
                      )}
                      {!member.linkedin && !member.instagram && !member.github && (
                        <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>
                          📧 {member.email.split('@')[0]}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </motion.section>

      {/* Sponsors Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Our Sponsors</h2>
        <p style={{ textAlign: 'center', marginBottom: '3rem' }}>
          We're grateful for the support of our sponsors and partners who make 
          our events and activities possible.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
          justifyItems: 'center'
        }}>
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              style={{
                width: '180px',
                height: '100px',
                background: '#222',
                border: '1px solid #333',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '0.9rem',
                textAlign: 'center',
                padding: '1rem',
                overflow: 'hidden'
              }}
              whileHover={{ 
                borderColor: '#00FF41',
                scale: 1.05
              }}
            >
              <img 
                src={sponsor.logo}
                alt={sponsor.name}
                style={{
                  maxWidth: '120px',
                  maxHeight: '60px',
                  objectFit: 'contain',
                  marginBottom: '0.5rem'
                }}
              />
              <span style={{ fontSize: '0.8rem', color: '#999' }}>
                {sponsor.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
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
          <button 
            className="btn"
            onClick={() => window.location.href = '/recruitment'}
          >
            Join Our Club
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Us
          </button>
        </div>
      </motion.section>
    </div>
  )
}

export default About
