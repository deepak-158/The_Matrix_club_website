import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Image, Bell, Activity } from 'lucide-react'
import { statsApi } from './api'

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({ events: 0, gallery: 0, announcements: 0 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        statsApi.get().then(setStats).catch(console.error).finally(() => setLoading(false))
    }, [])

    const cards = [
        { label: 'Events', value: stats.events, icon: Calendar, color: '#6366f1' },
        { label: 'Gallery Items', value: stats.gallery, icon: Image, color: '#ec4899' },
        { label: 'Active Announcements', value: stats.announcements, icon: Bell, color: '#f59e0b' },
    ]

    return (
        <div>
            <div className="admin-page-header">
                <h1>Dashboard</h1>
                <p>Welcome to The Matrix Club Admin Panel</p>
            </div>

            <div className="admin-stats-grid">
                {cards.map((card, i) => (
                    <motion.div
                        key={card.label}
                        className="admin-stat-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="admin-stat-icon" style={{ background: card.color + '20', color: card.color }}>
                            <card.icon size={24} />
                        </div>
                        <div>
                            <div className="admin-stat-value">{loading ? '—' : card.value}</div>
                            <div className="admin-stat-label">{card.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="admin-card" style={{ marginTop: '2rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Activity size={20} /> Quick Actions</h3>
                <p style={{ color: '#999', marginTop: 8 }}>
                    Use the sidebar to manage events, upload gallery images, or update announcements.
                </p>
            </div>
        </div>
    )
}

export default Dashboard
