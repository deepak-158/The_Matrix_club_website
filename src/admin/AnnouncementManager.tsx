import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Save, Bell, BellOff } from 'lucide-react'
import { announcementsApi, type Announcement } from './api'

const EMPTY = { title: '', message: '', link: '', link_text: '' }

const AnnouncementManager: React.FC = () => {
    const [items, setItems] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editing, setEditing] = useState<Partial<Announcement>>(EMPTY)
    const [editId, setEditId] = useState<number | null>(null)
    const [saving, setSaving] = useState(false)

    const load = () => { announcementsApi.list(true).then(setItems).catch(console.error).finally(() => setLoading(false)) }
    useEffect(load, [])

    const openNew = () => { setEditing(EMPTY); setEditId(null); setShowModal(true) }
    const openEdit = (a: Announcement) => { setEditing({ ...a }); setEditId(a.id); setShowModal(true) }

    const handleSave = async () => {
        if (!editing.title || !editing.message) return
        setSaving(true)
        try {
            if (editId) await announcementsApi.update(editId, editing)
            else await announcementsApi.create(editing)
            setShowModal(false); load()
        } catch (err) { console.error(err) }
        finally { setSaving(false) }
    }

    const toggleActive = async (a: Announcement) => {
        await announcementsApi.update(a.id, { is_active: a.is_active ? 0 : 1 } as Partial<Announcement>).catch(console.error)
        load()
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this announcement?')) return
        await announcementsApi.delete(id).catch(console.error)
        load()
    }

    return (
        <div>
            <div className="admin-page-header">
                <div><h1>Announcements</h1><p>Manage site-wide announcements</p></div>
                <button className="admin-btn-primary" onClick={openNew}><Plus size={18} /> New Announcement</button>
            </div>

            {loading ? <p style={{ color: '#888' }}>Loading...</p> : items.length === 0 ? (
                <div className="admin-empty">
                    <Bell size={48} color="#444" />
                    <p>No announcements yet.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {items.map((a) => (
                        <motion.div key={a.id} className="admin-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ opacity: a.is_active ? 1 : 0.5 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{a.title}</h3>
                                        <span className="admin-badge" style={{ background: a.is_active ? '#22c55e25' : '#88888825', color: a.is_active ? '#22c55e' : '#888' }}>
                                            {a.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <p style={{ color: '#aaa', margin: '4px 0', fontSize: '0.9rem' }}>{a.message}</p>
                                    {a.link && <p style={{ color: '#6366f1', margin: '4px 0', fontSize: '0.85rem' }}>{a.link_text || a.link}</p>}
                                </div>
                                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                                    <button className="admin-icon-btn" onClick={() => toggleActive(a)} title={a.is_active ? 'Deactivate' : 'Activate'}>
                                        {a.is_active ? <BellOff size={16} /> : <Bell size={16} />}
                                    </button>
                                    <button className="admin-icon-btn" onClick={() => openEdit(a)}><Pencil size={16} /></button>
                                    <button className="admin-icon-btn danger" onClick={() => handleDelete(a.id)}><Trash2 size={16} /></button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)}>
                        <motion.div className="admin-modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
                            <div className="admin-modal-header">
                                <h2>{editId ? 'Edit' : 'New'} Announcement</h2>
                                <button className="admin-icon-btn" onClick={() => setShowModal(false)}><X size={20} /></button>
                            </div>
                            <div className="admin-modal-body">
                                <div className="admin-form-group">
                                    <label>Title *</label>
                                    <input className="admin-input" value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Announcement title" />
                                </div>
                                <div className="admin-form-group">
                                    <label>Message *</label>
                                    <textarea className="admin-input" rows={4} value={editing.message || ''} onChange={(e) => setEditing({ ...editing, message: e.target.value })} placeholder="Announcement message" />
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label>Link (optional)</label>
                                        <input className="admin-input" value={editing.link || ''} onChange={(e) => setEditing({ ...editing, link: e.target.value })} placeholder="/recruitment" />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Link Text</label>
                                        <input className="admin-input" value={editing.link_text || ''} onChange={(e) => setEditing({ ...editing, link_text: e.target.value })} placeholder="View Details" />
                                    </div>
                                </div>
                            </div>
                            <div className="admin-modal-footer">
                                <button className="admin-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="admin-btn-primary" onClick={handleSave} disabled={saving}><Save size={16} /> {saving ? 'Saving...' : 'Save'}</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default AnnouncementManager
