import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Instagram, Linkedin, Send, Phone } from 'lucide-react'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('https://formspree.io/f/xvgwrovd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        alert('Thank you for your message! We\'ll get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        alert('There was an error sending your message. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('There was an error sending your message. Please try again.')
    }
  }

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
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Connect With Us</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Ready to join The Matrix Club-  VIT BHOPAL? Have questions? We'd love to hear from you!
        </p>
      </motion.section>

      {/* Contact Content */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Get In Touch</h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                marginBottom: '1.5rem',
                padding: '1rem',
                background: '#222',
                borderRadius: '8px',
                border: '1px solid #333'
              }}>
                <div style={{ 
                  background: '#00FF41', 
                  borderRadius: '50%', 
                  padding: '10px',
                  color: '#111'
                }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ color: '#00FF41', margin: '0 0 0.5rem 0' }}>Email</h4>
                  <p style={{ margin: 0, color: '#CCCCCC' }}>multimedia_club@vitbhopal.ac.in</p>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '1rem', 
                marginBottom: '1.5rem',
                padding: '1rem',
                background: '#222',
                borderRadius: '8px',
                border: '1px solid #333'
              }}>
                <div style={{ 
                  background: '#00FF41', 
                  borderRadius: '50%', 
                  padding: '10px',
                  color: '#111',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <MapPin size={20} />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h4 style={{ color: '#00FF41', margin: '0 0 0.5rem 0', textAlign: 'left' }}>Location</h4>
                  <p style={{ margin: '0 0 0.3rem 0', color: '#CCCCCC', lineHeight: '1.4', textAlign: 'left' }}>The Matrix Club</p>
                  <p style={{ margin: '0 0 0.3rem 0', color: '#CCCCCC', lineHeight: '1.4', textAlign: 'left' }}>VIT Bhopal University</p>
                  <p style={{ margin: '0 0 0.3rem 0', color: '#CCCCCC', lineHeight: '1.4', textAlign: 'left' }}>Kothri Kalan, Sehore</p>
                  <p style={{ margin: '0', color: '#CCCCCC', lineHeight: '1.4', textAlign: 'left' }}>Madhya Pradesh - 466114, India</p>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                marginBottom: '1.5rem',
                padding: '1rem',
                background: '#222',
                borderRadius: '8px',
                border: '1px solid #333'
              }}>
                <div style={{ 
                  background: '#00FF41', 
                  borderRadius: '50%', 
                  padding: '10px',
                  color: '#111'
                }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ color: '#00FF41', margin: '0 0 0.5rem 0' }}>Phone</h4>
                  <p style={{ margin: 0, color: '#CCCCCC' }}>+91 89689 78226</p>
                </div>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#00FF41' }}>Follow Us</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[
                { icon: Instagram, link: 'https://instagram.com/thematrixclub_vitb', label: 'Instagram' },
                { icon: Linkedin, link: 'https://www.linkedin.com/company/matrixclub-vitbhopal/', label: 'LinkedIn' }
              ].map(({ icon: Icon, link, label }) => (
                <motion.button
                  key={label}
                  onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
                  style={{
                    background: '#222',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    padding: '12px',
                    color: '#00FF41',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: '#00FF41',
                    boxShadow: '0 5px 15px rgba(0, 255, 65, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={24} />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div style={{
              background: '#222',
              border: '1px solid #333',
              borderRadius: '10px',
              padding: '2rem'
            }}>
              <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Send Message</h2>
              
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: '#00FF41',
                    fontWeight: '500'
                  }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#111',
                      border: '1px solid #333',
                      borderRadius: '5px',
                      color: '#FFFFFF',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#00FF41'}
                    onBlur={(e) => e.target.style.borderColor = '#333'}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: '#00FF41',
                    fontWeight: '500'
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#111',
                      border: '1px solid #333',
                      borderRadius: '5px',
                      color: '#FFFFFF',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#00FF41'}
                    onBlur={(e) => e.target.style.borderColor = '#333'}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: '#00FF41',
                    fontWeight: '500'
                  }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#111',
                      border: '1px solid #333',
                      borderRadius: '5px',
                      color: '#FFFFFF',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#00FF41'}
                    onBlur={(e) => e.target.style.borderColor = '#333'}
                  />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: '#00FF41',
                    fontWeight: '500'
                  }}>
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#111',
                      border: '1px solid #333',
                      borderRadius: '5px',
                      color: '#FFFFFF',
                      fontSize: '1rem',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#00FF41'}
                    onBlur={(e) => e.target.style.borderColor = '#333'}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '1.1rem',
                    padding: '15px'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={20} />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ marginTop: '4rem' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Frequently Asked Questions</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {[
            {
              question: "How can I join The Matrix Club at VIT Bhopal?",
              answer: "You can join by filling out the registration form released during our recruitment drive or by contacting us through our official social media handles."
            },
            {
              question: "Do I need prior coding experience?",
              answer: "No prior experience is required! We organize beginner-friendly workshops and mentoring sessions."
            },
            {
              question: "What kind of events does the club organize?",
              answer: "We host hackathons, coding challenges, project showcases, and collaborative learning sessions."
            },
            {
              question: "Are there any membership fees?",
              answer: "Membership is completely free! Some events may have small participation fees."
            },
            {
              question: "Can students from any branch join?",
              answer: "Absolutely! The Matrix Club encourages interdisciplinary collaboration across all branches."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              style={{
                background: '#222',
                border: '1px solid #333',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1rem'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 style={{ color: '#00FF41', marginBottom: '1rem' }}>{faq.question}</h4>
              <p style={{ margin: 0, color: '#CCCCCC' }}>{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default Contact