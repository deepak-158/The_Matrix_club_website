import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Save, Calendar, ToggleLeft, ToggleRight } from 'lucide-react'
import { eventsApi, uploadApi, type EventData } from './api'

const EMPTY_EVENT = { title: '', date: '', description: '', attendees: '', status: 'upcoming', image_url: '', gallery_url: '', registration_url: '', registration_open: false }

const EventsManager: React.FC = () => {
    const [events, setEvents] = useState<EventData[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editing, setEditing] = useState<Record<string, unknown>>(EMPTY_EVENT)
    const [editId, setEditId] = useState<number | null>(null)
    const [saving, setSaving] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)

    const load = () => {
        eventsApi.list().then(setEvents).catch(console.error).finally(() => setLoading(false))
    }

    useEffect(load, [])

    const openNew = () => { setEditing({ ...EMPTY_EVENT }); setEditId(null); setImageFile(null); setShowModal(true) }
    const openEdit = (e: EventData) => {
        setEditing({ ...e, registration_open: !!(e as unknown as Record<string, unknown>).registration_open })
        setEditId(e.id); setImageFile(null); setShowModal(true)
    }

    const handleSave = async () => {
        if (!editing.title || !editing.date || !editing.description) return
        setSaving(true)
        try {
            let imageUrl = (editing.image_url as string) || ''
            if (imageFile) {
                const upload = await uploadApi.image(imageFile, 'matrix-club/events')
                imageUrl = upload.url
            }
            const data = { ...editing, image_url: imageUrl || null }
            if (editId) await eventsApi.update(editId, data as Partial<EventData>)
            else await eventsApi.create(data as Partial<EventData>)
            setShowModal(false)
            load()
        } catch (err) { console.error(err) }
        finally { setSaving(false) }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this event?')) return
        await eventsApi.delete(id).catch(console.error)
        load()
    }

    const STATUS_COLORS: Record<string, string> = { upcoming: '#6366f1', ongoing: '#22c55e', completed: '#888' }

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h1>Events</h1>
                    <p>Manage club events and registrations</p>
                </div>
                <button className="admin-btn-primary" onClick={openNew}><Plus size={18} /> Add Event</button>
            </div>

            {loading ? <p style={{ color: '#888' }}>Loading...</p> : (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr><th>Title</th><th>Date</th><th>Status</th><th>Registration</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {events.map((e) => {
                                const regOpen = !!(e as unknown as Record<string, unknown>).registration_open
                                const regUrl = (e as unknown as Record<string, unknown>).registration_url as string | null
                                return (
                                    <tr key={e.id}>
                                        <td style={{ fontWeight: 600 }}>{e.title}</td>
                                        <td><Calendar size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />{e.date}</td>
                                        <td>
                                            <span className="admin-badge" style={{ background: STATUS_COLORS[e.status] + '25', color: STATUS_COLORS[e.status] }}>
                                                {e.status}
                                            </span>
                                        </td>
                                        <td>
                                            {regUrl ? (
                                                <span className="admin-badge" style={{ background: regOpen ? '#22c55e25' : '#88888825', color: regOpen ? '#22c55e' : '#888' }}>
                                                    {regOpen ? '🟢 Open' : '🔴 Closed'}
                                                </span>
                                            ) : (
                                                <span style={{ color: '#555' }}>—</span>
                                            )}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <button className="admin-icon-btn" onClick={() => openEdit(e)}><Pencil size={16} /></button>
                                                <button className="admin-icon-btn danger" onClick={() => handleDelete(e.id)}><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            {events.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888', padding: 40 }}>No events yet</td></tr>}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)}>
                        <motion.div className="admin-modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} style={{ maxWidth: 650 }}>
                            <div className="admin-modal-header">
                                <h2>{editId ? 'Edit Event' : 'New Event'}</h2>
                                <button className="admin-icon-btn" onClick={() => setShowModal(false)}><X size={20} /></button>
                            </div>

                            <div className="admin-modal-body" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
                                <div className="admin-form-group">
                                    <label>Title *</label>
                                    <input className="admin-input" value={(editing.title as string) || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Event title" />
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label>Date *</label>
                                        <input className="admin-input" type="date" value={(editing.date as string) || ''} onChange={(e) => setEditing({ ...editing, date: e.target.value })} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Status</label>
                                        <select className="admin-input" value={(editing.status as string) || 'upcoming'} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
                                            <option value="upcoming">Upcoming</option>
                                            <option value="ongoing">Ongoing</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label>Description *</label>
                                    <textarea className="admin-input" rows={4} value={(editing.description as string) || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="Event description" />
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label>Attendees</label>
                                        <input className="admin-input" value={(editing.attendees as string) || ''} onChange={(e) => setEditing({ ...editing, attendees: e.target.value })} placeholder="e.g. 200+" />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Gallery URL</label>
                                        <input className="admin-input" value={(editing.gallery_url as string) || ''} onChange={(e) => setEditing({ ...editing, gallery_url: e.target.value })} placeholder="Instagram post link" />
                                    </div>
                                </div>

                                {/* Registration Section */}
                                <div style={{ background: '#0a0a0a', border: '1px solid #262626', borderRadius: 10, padding: '1.2rem', marginBottom: '1.2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <div>
                                            <h4 style={{ color: '#fff', margin: 0, fontSize: '0.95rem' }}>Registration / Google Form</h4>
                                            <p style={{ color: '#666', margin: '2px 0 0', fontSize: '0.8rem' }}>Add a Google Form link for event registration & payment</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setEditing({ ...editing, registration_open: !editing.registration_open })}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: editing.registration_open ? '#22c55e' : '#666', padding: 0 }}
                                        >
                                            {editing.registration_open ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                                        </button>
                                    </div>
                                    <div className="admin-form-group" style={{ marginBottom: 0 }}>
                                        <label>Registration URL (Google Form link)</label>
                                        <input
                                            className="admin-input"
                                            value={(editing.registration_url as string) || ''}
                                            onChange={(e) => setEditing({ ...editing, registration_url: e.target.value })}
                                            placeholder="https://docs.google.com/forms/d/e/..."
                                        />
                                    </div>
                                </div>

                                <div className="admin-form-group">
                                    <label>Cover Image</label>
                                    <input type="file" accept="image/*" className="admin-input" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                                    {typeof editing.image_url === 'string' && editing.image_url && !imageFile && <img src={editing.image_url} alt="" style={{ width: 200, height: 100, objectFit: 'cover', borderRadius: 8, marginTop: 8 }} />}
                                </div>
                            </div>

                            <div className="admin-modal-footer">
                                <button className="admin-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
                                    <Save size={16} /> {saving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default EventsManager
