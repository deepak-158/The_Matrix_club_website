const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

async function request<T = unknown>(path: string, method: Method = 'GET', body?: unknown): Promise<T> {
    const opts: RequestInit = {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    }
    if (body && method !== 'GET') opts.body = JSON.stringify(body)
    const res = await fetch(`${API_BASE}${path}`, opts)
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }))
        throw new Error(err.error || 'Request failed')
    }
    return res.json()
}

async function uploadFiles(path: string, files: File[], fields?: Record<string, string>) {
    const form = new FormData()
    files.forEach((f) => form.append('images', f))
    if (fields) Object.entries(fields).forEach(([k, v]) => form.append(k, v))
    const res = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        credentials: 'include',
        body: form,
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }))
        throw new Error(err.error || 'Upload failed')
    }
    return res.json()
}

async function uploadFile(path: string, file: File, fields?: Record<string, string>) {
    const form = new FormData()
    form.append('image', file)
    if (fields) Object.entries(fields).forEach(([k, v]) => form.append(k, v))
    const res = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        credentials: 'include',
        body: form,
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }))
        throw new Error(err.error || 'Upload failed')
    }
    return res.json()
}

// Auth
export const authApi = {
    login: (password: string) => request('/api/auth/login', 'POST', { password }),
    logout: () => request('/api/auth/logout', 'POST'),
    check: () => request<{ authenticated: boolean }>('/api/auth/check'),
}

// Events
export interface EventData {
    id: number; title: string; date: string; description: string
    attendees: string | null; status: string; image_url: string | null
    gallery_url: string | null; registration_url: string | null
    registration_open: number; created_at: string; updated_at: string
}

export const eventsApi = {
    list: () => request<EventData[]>('/api/events'),
    get: (id: number) => request<EventData>(`/api/events/${id}`),
    create: (data: Partial<EventData>) => request<EventData>('/api/events', 'POST', data),
    update: (id: number, data: Partial<EventData>) => request<EventData>(`/api/events/${id}`, 'PUT', data),
    delete: (id: number) => request(`/api/events/${id}`, 'DELETE'),
}

// Albums
export interface Album {
    id: number; title: string; description: string | null
    cover_url: string | null; created_at: string
    image_count?: number; latest_image?: string | null
}

export interface GalleryImage {
    id: number; title: string; image_url: string; cloudinary_id: string
    album_id: number; created_at: string
}

export interface AlbumDetail extends Album {
    images: GalleryImage[]
}

export const albumsApi = {
    list: () => request<Album[]>('/api/gallery/albums'),
    get: (id: number) => request<AlbumDetail>(`/api/gallery/albums/${id}`),
    create: (data: { title: string; description?: string }) => request<Album>('/api/gallery/albums', 'POST', data),
    update: (id: number, data: Partial<Album>) => request<Album>(`/api/gallery/albums/${id}`, 'PUT', data),
    delete: (id: number) => request(`/api/gallery/albums/${id}`, 'DELETE'),
}

export const galleryApi = {
    list: (albumId?: number) => {
        const qs = albumId ? `?album_id=${albumId}` : ''
        return request<GalleryImage[]>(`/api/gallery${qs}`)
    },
    uploadToAlbum: (albumId: number, files: File[]) =>
        uploadFiles('/api/gallery', files, { album_id: albumId.toString() }),
    delete: (id: number) => request(`/api/gallery/${id}`, 'DELETE'),
}

// Announcements
export interface Announcement {
    id: number; title: string; message: string; link: string | null
    link_text: string | null; is_active: number; created_at: string; updated_at: string
}

export const announcementsApi = {
    list: (all = true) => request<Announcement[]>(`/api/announcements?all=${all}`),
    create: (data: Partial<Announcement>) => request<Announcement>('/api/announcements', 'POST', data),
    update: (id: number, data: Partial<Announcement>) => request<Announcement>(`/api/announcements/${id}`, 'PUT', data),
    delete: (id: number) => request(`/api/announcements/${id}`, 'DELETE'),
}

// Stats
export const statsApi = {
    get: () => request<{ events: number; gallery: number; announcements: number }>('/api/stats'),
}

// Upload
export const uploadApi = {
    image: (file: File, folder?: string) => uploadFile('/api/upload', file, { folder: folder || 'matrix-club/uploads' }),
}
