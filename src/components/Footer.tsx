import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Heart } from 'lucide-react'

const SOCIAL_LINKS = [
    {
        icon: Instagram,
        href: 'https://instagram.com/thematrixclub_vitb',
        label: 'Instagram',
    },
    {
        icon: Linkedin,
        href: 'https://www.linkedin.com/company/matrixclub-vitbhopal/',
        label: 'LinkedIn',
    },
]

const NAV_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/events', label: 'Events' },
    { to: '/recruitment', label: 'Join Us' },
    { to: '/contact', label: 'Contact' },
]

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer-inner">
                {/* Brand */}
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        THE MATRIX CLUB
                    </Link>
                    <p className="footer-tagline">Decoding Creativity | VIT Bhopal University</p>
                </div>

                {/* Quick Links */}
                <div className="footer-links">
                    <h4 className="footer-heading">Quick Links</h4>
                    <nav>
                        {NAV_LINKS.map((link) => (
                            <Link key={link.to} to={link.to} className="footer-nav-link">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Social */}
                <div className="footer-social">
                    <h4 className="footer-heading">Follow Us</h4>
                    <div className="footer-social-icons">
                        {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-link"
                                aria-label={`Follow us on ${label}`}
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <p>
                    © {currentYear} The Matrix Club — VIT Bhopal. All rights reserved.
                </p>
                <p className="footer-credit">
                    Made with <Heart size={14} className="footer-heart" /> by The Matrix Technical Team
                </p>
            </div>
        </footer>
    )
}

export default Footer
