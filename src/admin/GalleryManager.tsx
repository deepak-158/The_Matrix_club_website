import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Trash2, X, FolderPlus, Folder, ChevronLeft, Plus, ImageIcon } from 'lucide-react'
import { albumsApi, galleryApi, type Album, type GalleryImage } from './api'

const GalleryManager: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([])
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
    const [images, setImages] = useState<GalleryImage[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [showNewAlbum, setShowNewAlbum] = useState(false)
    const [albumTitle, setAlbumTitle] = useState('')
    const [albumDesc, setAlbumDesc] = useState('')
    const [dragOver, setDragOver] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const loadAlbums = () => {
        albumsApi.list().then(setAlbums).catch(console.error).finally(() => setLoading(false))
    }

    const loadImages = (albumId: number) => {
        galleryApi.list(albumId).then(setImages).catch(console.error)
    }

    useEffect(loadAlbums, [])

    useEffect(() => {
        if (selectedAlbum) loadImages(selectedAlbum.id)
    }, [selectedAlbum])

    const createAlbum = async () => {
        if (!albumTitle.trim()) return
        try {
            const album = await albumsApi.create({ title: albumTitle.trim(), description: albumDesc.trim() || undefined })
            setShowNewAlbum(false)
            setAlbumTitle('')
            setAlbumDesc('')
            loadAlbums()
            setSelectedAlbum(album)
        } catch (err) { console.error(err) }
    }

    const deleteAlbum = async (id: number) => {
        if (!confirm('Delete this album and ALL its images? This cannot be undone.')) return
        await albumsApi.delete(id).catch(console.error)
        setSelectedAlbum(null)
        setImages([])
        loadAlbums()
    }

    const handleFiles = async (files: FileList | File[]) => {
        if (!selectedAlbum) return
        const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'))
        if (imageFiles.length === 0) return

        setUploading(true)
        try {
            await galleryApi.uploadToAlbum(selectedAlbum.id, imageFiles)
            loadImages(selectedAlbum.id)
            loadAlbums()
        } catch (err) { console.error(err) }
        finally { setUploading(false) }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); setDragOver(false)
        handleFiles(e.dataTransfer.files)
    }

    const deleteImage = async (id: number) => {
        if (!confirm('Delete this image?')) return
        await galleryApi.delete(id).catch(console.error)
        if (selectedAlbum) loadImages(selectedAlbum.id)
        loadAlbums()
    }

    // ── Album list view ──
    if (!selectedAlbum) {
        return (
            <div>
                <div className="admin-page-header">
                    <div><h1>Gallery</h1><p>Manage photo albums</p></div>
                    <button className="admin-btn-primary" onClick={() => setShowNewAlbum(true)}>
                        <FolderPlus size={18} /> New Album
                    </button>
                </div>

                {loading ? <p style={{ color: '#888' }}>Loading...</p> : albums.length === 0 ? (
                    <div className="admin-empty">
                        <Folder size={48} color="#444" />
                        <p>No albums yet. Create your first album to start uploading photos!</p>
                    </div>
                ) : (
                    <div className="admin-gallery-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
                        {albums.map((album) => (
                            <motion.div
                                key={album.id}
                                className="admin-gallery-item"
                                style={{ cursor: 'pointer', aspectRatio: '4/3' }}
                                onClick={() => setSelectedAlbum(album)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ scale: 1.03 }}
                            >
                                {album.latest_image ? (
                                    <img src={album.latest_image} alt={album.title} loading="lazy" />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a' }}>
                                        <Folder size={40} color="#444" />
                                    </div>
                                )}
                                <div className="admin-gallery-overlay" style={{ opacity: 1, background: 'linear-gradient(transparent 30%, rgba(0,0,0,0.9))' }}>
                                    <div style={{ flex: 1 }}>
                                        <div className="admin-gallery-title" style={{ fontSize: '1rem', fontWeight: 600 }}>{album.title}</div>
                                        <span style={{ color: '#999', fontSize: '0.8rem' }}>{album.image_count || 0} photos</span>
                                    </div>
                                    <button className="admin-icon-btn danger" onClick={(e) => { e.stopPropagation(); deleteAlbum(album.id) }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* New Album Modal */}
                <AnimatePresence>
                    {showNewAlbum && (
                        <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowNewAlbum(false)}>
                            <motion.div className="admin-modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} style={{ maxWidth: 450 }}>
                                <div className="admin-modal-header">
                                    <h2>Create Album</h2>
                                    <button className="admin-icon-btn" onClick={() => setShowNewAlbum(false)}><X size={20} /></button>
                                </div>
                                <div className="admin-modal-body">
                                    <div className="admin-form-group">
                                        <label>Album Title *</label>
                                        <input className="admin-input" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} placeholder="e.g. Media Morphosis 2025" autoFocus />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Description (optional)</label>
                                        <textarea className="admin-input" rows={3} value={albumDesc} onChange={(e) => setAlbumDesc(e.target.value)} placeholder="Brief description of this album" />
                                    </div>
                                </div>
                                <div className="admin-modal-footer">
                                    <button className="admin-btn-secondary" onClick={() => setShowNewAlbum(false)}>Cancel</button>
                                    <button className="admin-btn-primary" onClick={createAlbum} disabled={!albumTitle.trim()}>
                                        <FolderPlus size={16} /> Create Album
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    }

    // ── Album detail view (images) ──
    return (
        <div>
            <div className="admin-page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="admin-icon-btn" onClick={() => { setSelectedAlbum(null); setImages([]) }}>
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1>{selectedAlbum.title}</h1>
                        <p>{selectedAlbum.description || `${images.length} photos`}</p>
                    </div>
                </div>
                <button className="admin-btn-primary" onClick={() => inputRef.current?.click()} disabled={uploading}>
                    <Plus size={18} /> {uploading ? 'Uploading...' : 'Add Photos'}
                </button>
            </div>

            <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = '' }} />

            {/* Drop zone */}
            <div
                className={`admin-dropzone ${dragOver ? 'active' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                style={{ marginBottom: '1.5rem' }}
            >
                <Upload size={32} color="#666" />
                <p style={{ color: '#888', margin: '8px 0 0' }}>
                    {uploading ? 'Uploading images...' : 'Drag & drop images here, or click to select (multiple supported)'}
                </p>
            </div>

            {images.length === 0 ? (
                <div className="admin-empty">
                    <ImageIcon size={48} color="#444" />
                    <p>No photos in this album yet. Upload some!</p>
                </div>
            ) : (
                <div className="admin-gallery-grid">
                    {images.map((img) => (
                        <motion.div key={img.id} className="admin-gallery-item" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <img src={img.image_url} alt={img.title} loading="lazy" />
                            <div className="admin-gallery-overlay">
                                <span className="admin-gallery-title">{img.title}</span>
                                <button className="admin-icon-btn danger" onClick={() => deleteImage(img.id)}><Trash2 size={16} /></button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default GalleryManager
