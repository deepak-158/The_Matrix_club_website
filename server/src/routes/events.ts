import { Hono } from 'hono'
import { authMiddleware } from '../auth'
import type { Env } from '../types'

export const eventsRoutes = new Hono<{ Bindings: Env }>()

// GET /api/events — public
eventsRoutes.get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM events ORDER BY date DESC').all()
    return c.json(results)
})

// GET /api/events/:id — public
eventsRoutes.get('/:id', async (c) => {
    const event = await c.env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(c.req.param('id')).first()
    if (!event) return c.json({ error: 'Event not found' }, 404)
    return c.json(event)
})

// POST /api/events — admin
eventsRoutes.post('/', authMiddleware, async (c) => {
    const { title, date, description, attendees, status, image_url, gallery_url, registration_url, registration_open } = await c.req.json()
    if (!title || !date || !description) return c.json({ error: 'Title, date, and description are required' }, 400)

    const result = await c.env.DB.prepare(
        'INSERT INTO events (title, date, description, attendees, status, image_url, gallery_url, registration_url, registration_open) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(title, date, description, attendees || null, status || 'upcoming', image_url || null, gallery_url || null, registration_url || null, registration_open ? 1 : 0).run()

    const event = await c.env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(result.meta.last_row_id).first()
    return c.json(event, 201)
})

// PUT /api/events/:id — admin
eventsRoutes.put('/:id', authMiddleware, async (c) => {
    const id = c.req.param('id')
    const existing = await c.env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(id).first()
    if (!existing) return c.json({ error: 'Event not found' }, 404)

    const { title, date, description, attendees, status, image_url, gallery_url, registration_url, registration_open } = await c.req.json()

    await c.env.DB.prepare(`
    UPDATE events SET
      title = COALESCE(?1, title), date = COALESCE(?2, date), description = COALESCE(?3, description),
      attendees = COALESCE(?4, attendees), status = COALESCE(?5, status), image_url = COALESCE(?6, image_url),
      gallery_url = COALESCE(?7, gallery_url), registration_url = ?8,
      registration_open = COALESCE(?9, registration_open), updated_at = datetime('now')
    WHERE id = ?10
  `).bind(title, date, description, attendees, status, image_url, gallery_url,
        registration_url !== undefined ? registration_url : null,
        registration_open !== undefined ? (registration_open ? 1 : 0) : null,
        id).run()

    const event = await c.env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(id).first()
    return c.json(event)
})

// DELETE /api/events/:id — admin
eventsRoutes.delete('/:id', authMiddleware, async (c) => {
    const id = c.req.param('id')
    const existing = await c.env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(id).first()
    if (!existing) return c.json({ error: 'Event not found' }, 404)

    await c.env.DB.prepare('DELETE FROM events WHERE id = ?').bind(id).run()
    return c.json({ success: true })
})
