import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

const NotFound: React.FC = () => {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem',
            }}
        >
            <motion.h1
                style={{
                    fontSize: 'clamp(4rem, 12vw, 8rem)',
                    fontFamily: "'Share Tech Mono', monospace",
                    color: '#fff',
                    textShadow: '0 0 30px rgba(255,255,255,0.4)',
                    marginBottom: '0.5rem',
                }}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                404
            </motion.h1>

            <motion.p
                style={{
                    fontSize: '1.3rem',
                    color: '#ccc',
                    marginBottom: '0.5rem',
                    fontFamily: "'Share Tech Mono', monospace",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                "There is no spoon... or page."
            </motion.p>

            <motion.p
                style={{
                    color: '#888',
                    marginBottom: '2rem',
                    maxWidth: '400px',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                The page you're looking for doesn't exist or has been moved.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <Link
                    to="/"
                    className="btn"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Home size={20} />
                    Back to Home
                </Link>
            </motion.div>
        </div>
    )
}

export default NotFound
