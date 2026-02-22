import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { authRoutes, authMiddleware } from './auth'
import { eventsRoutes } from './routes/events'
import { galleryRoutes } from './routes/gallery'
import { announcementsRoutes } from './routes/announcements'
import { uploadRoutes } from './routes/upload'
import type { Env } from './types'

const app = new Hono<{ Bindings: Env }>()

// ── CORS ──
app.use('*', async (c, next) => {
    const frontendUrl = c.env.FRONTEND_URL || 'http://localhost:5173'
    const corsMiddleware = cors({
        origin: (origin) => {
            // Allow the configured frontend URL, localhost for dev, and any *.netlify.app
            const allowed = [frontendUrl, 'http://localhost:5173', 'http://localhost:4173']
            if (!origin) return frontendUrl
            if (allowed.includes(origin)) return origin
            if (origin.endsWith('.netlify.app')) return origin
            return frontendUrl
        },
        credentials: true,
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Cookie'],
    })
    return corsMiddleware(c, next)
})

// ── Root ──
app.get('/', (c) => c.json({
    name: 'Matrix Club API',
    status: 'running',
    endpoints: ['/api/health', '/api/events', '/api/gallery', '/api/announcements', '/api/stats'],
}))

// ── Auth Routes ──
app.route('/api/auth', authRoutes)

// ── Public + Protected Routes ──
app.route('/api/events', eventsRoutes)
app.route('/api/gallery', galleryRoutes)
app.route('/api/announcements', announcementsRoutes)
app.route('/api/upload', uploadRoutes)

// ── Health ──
app.get('/api/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }))

// ── Stats ──
app.get('/api/stats', async (c) => {
    const db = c.env.DB
    const events = await db.prepare('SELECT COUNT(*) as count FROM events').first<{ count: number }>()
    const gallery = await db.prepare('SELECT COUNT(*) as count FROM gallery').first<{ count: number }>()
    const announcements = await db.prepare('SELECT COUNT(*) as count FROM announcements WHERE is_active = 1').first<{ count: number }>()
    return c.json({
        events: events?.count || 0,
        gallery: gallery?.count || 0,
        announcements: announcements?.count || 0,
    })
})

export default app
