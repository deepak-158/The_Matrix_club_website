import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Instagram, Linkedin, Send, Phone, ChevronDown } from 'lucide-react'

const FAQ_DATA = [
  {
    question: 'How can I join The Matrix Club at VIT Bhopal?',
    answer: 'You can join by filling out the registration form released during our recruitment drive or by contacting us through our official social media handles.',
  },
  {
    question: 'Do I need prior coding experience?',
    answer: "No prior experience is required! We organize beginner-friendly workshops and mentoring sessions.",
  },
  {
    question: 'What kind of events does the club organize?',
    answer: 'We host hackathons, coding challenges, project showcases, and collaborative learning sessions.',
  },
  {
    question: 'Are there any membership fees?',
    answer: 'Membership is completely free! Some events may have small participation fees.',
  },
  {
    question: 'Can students from any branch join?',
    answer: 'Absolutely! The Matrix Club encourages interdisciplinary collaboration across all branches.',
  },
]

const SOCIAL_LINKS = [
  { icon: Instagram, link: 'https://instagram.com/thematrixclub_vitb', label: 'Follow us on Instagram' },
  { icon: Linkedin, link: 'https://www.linkedin.com/company/matrixclub-vitbhopal/', label: 'Follow us on LinkedIn' },
]

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', _honeypot: '' })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check — bots fill this hidden field
    if (formData._honeypot) return

    // Basic validation
    const email = formData.email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      return
    }
    if (formData.name.trim().length < 2 || formData.message.trim().length < 10) {
      setStatus('error')
      return
    }

    setStatus('sending')

    try {
      const { _honeypot, ...payload } = formData
      const res = await fetch('https://formspree.io/f/xvgwrovd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '', _honeypot: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

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
        <h1>Connect With Us</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: 600, margin: '0 auto' }}>
          Ready to join The Matrix Club — VIT Bhopal? Have questions? We'd love to hear from you!
        </p>
      </motion.section>

      {/* Contact Content */}
      <motion.section
        className="section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="contact-grid">
          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Get In Touch</h2>

            <div className="contact-card">
              <div className="contact-card-icon"><Mail size={20} /></div>
              <div>
                <h4 style={{ color: '#FFF', margin: '0 0 0.3rem' }}>Email</h4>
                <p style={{ margin: 0, color: '#CCC', textAlign: 'left' }}>multimedia_club@vitbhopal.ac.in</p>
              </div>
            </div>

            <div className="contact-card" style={{ alignItems: 'flex-start' }}>
              <div className="contact-card-icon" style={{ marginTop: 2 }}><MapPin size={20} /></div>
              <div>
                <h4 style={{ color: '#FFF', margin: '0 0 0.3rem' }}>Location</h4>
                <p style={{ margin: 0, color: '#CCC', lineHeight: 1.5, textAlign: 'left' }}>
                  The Matrix Club<br />
                  VIT Bhopal University<br />
                  Kothri Kalan, Sehore<br />
                  Madhya Pradesh — 466114, India
                </p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon"><Phone size={20} /></div>
              <div>
                <h4 style={{ color: '#FFF', margin: '0 0 0.3rem' }}>Phone</h4>
                <p style={{ margin: 0, color: '#CCC', textAlign: 'left' }}>+91 89689 78226</p>
              </div>
            </div>

            <h3 style={{ margin: '1.5rem 0 1rem', color: '#FFF' }}>Follow Us</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {SOCIAL_LINKS.map(({ icon: Icon, link, label }) => (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label={label}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="form-container">
              <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Send Message</h2>

              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot — hidden from humans */}
                <div className="form-hp" aria-hidden="true">
                  <label htmlFor="hp-field">Leave empty</label>
                  <input
                    id="hp-field"
                    type="text"
                    name="_honeypot"
                    value={formData._honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name *</label>
                  <input
                    id="name"
                    className="form-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email *</label>
                  <input
                    id="email"
                    className="form-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    placeholder="Your email"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject *</label>
                  <input
                    id="subject"
                    className="form-input"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    placeholder="Subject"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    className="form-textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={5000}
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn"
                  disabled={status === 'sending'}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '1.1rem',
                    padding: 15,
                    opacity: status === 'sending' ? 0.7 : 1,
                  }}
                  whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
                  whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                >
                  <Send size={20} />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </motion.button>

                {status === 'success' && (
                  <div className="form-status success">
                    ✓ Thank you! Your message has been sent successfully.
                  </div>
                )}
                {status === 'error' && (
                  <div className="form-status error">
                    ✕ Something went wrong. Please check your inputs and try again.
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Accordion */}
      <motion.section
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ marginTop: '2rem' }}
      >
        <h2>Frequently Asked Questions</h2>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {FAQ_DATA.map((faq, i) => (
            <motion.div
              key={i}
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                {faq.question}
                <ChevronDown size={20} className={`faq-chevron ${openFaq === i ? 'open' : ''}`} />
              </button>
              <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default Contact
