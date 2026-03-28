import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './admin.css'
import { LayoutDashboard, Calendar, Image, Bell, LogOut, Menu, X, ChevronLeft } from 'lucide-react'
import { authApi } from './api'
import Login from './Login'
import Dashboard from './Dashboard'
import EventsManager from './EventsManager'
import GalleryManager from './GalleryManager'
import AnnouncementManager from './AnnouncementManager'

type Page = 'dashboard' | 'events' | 'gallery' | 'announcements'

const NAV_ITEMS: { id: Page; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'announcements', label: 'Announcements', icon: Bell },
]

const AdminLayout: React.FC = () => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null)
    const [page, setPage] = useState<Page>('dashboard')
    const [sidebarOpen, setSidebarOpen] = useState(true)

    useEffect(() => {
        authApi.check()
            .then((r) => setAuthenticated(r.authenticated))
            .catch(() => setAuthenticated(false))
    }, [])

    const handleLogout = async () => {
        await authApi.logout().catch(console.error)
        setAuthenticated(false)
    }

    if (authenticated === null) {
        return <div className="admin-loading">Loading...</div>
    }

    if (!authenticated) {
        return <Login onLogin={() => setAuthenticated(true)} />
    }

    const renderPage = () => {
        switch (page) {
            case 'dashboard': return <Dashboard />
            case 'events': return <EventsManager />
            case 'gallery': return <GalleryManager />
            case 'announcements': return <AnnouncementManager />
        }
    }

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <motion.aside
                className={`admin-sidebar ${sidebarOpen ? '' : 'collapsed'}`}
                animate={{ width: sidebarOpen ? 260 : 72 }}
                transition={{ duration: 0.2 }}
            >
                <div className="admin-sidebar-header">
                    {sidebarOpen && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ overflow: 'hidden' }}>
                            <h2 style={{ fontSize: '1rem', margin: 0, whiteSpace: 'nowrap' }}>Matrix Admin</h2>
                            <span style={{ fontSize: '0.75rem', color: '#666' }}>Content Manager</span>
                        </motion.div>
                    )}
                    <button className="admin-icon-btn" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ marginLeft: sidebarOpen ? 'auto' : 0 }}>
                        {sidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                <nav className="admin-sidebar-nav">
                    {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            className={`admin-nav-item ${page === id ? 'active' : ''}`}
                            onClick={() => setPage(id)}
                            title={label}
                        >
                            <Icon size={20} />
                            {sidebarOpen && <span>{label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="admin-sidebar-footer">
                    <a href="/" className="admin-nav-item" title="Back to site">
                        <X size={20} />
                        {sidebarOpen && <span>Back to Site</span>}
                    </a>
                    <button className="admin-nav-item logout" onClick={handleLogout} title="Log out">
                        <LogOut size={20} />
                        {sidebarOpen && <span>Log Out</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="admin-main">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={page}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderPage()}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    )
}

export default AdminLayout
