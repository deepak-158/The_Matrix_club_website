import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { authApi } from './api'

interface LoginProps {
    onLogin: () => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!password.trim()) return setError('Password is required')
        setError('')
        setLoading(true)
        try {
            await authApi.login(password)
            onLogin()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-login-page">
            <motion.div
                className="admin-login-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="admin-login-icon">
                    <Lock size={32} />
                </div>
                <h1>Admin Panel</h1>
                <p>The Matrix Club — Content Management</p>

                <form onSubmit={handleSubmit}>
                    <div className="admin-form-group">
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                className="admin-input"
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 4 }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {error && <div className="admin-error">{error}</div>}

                    <button type="submit" className="admin-btn-primary" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

export default Login
