import { Hono } from 'hono'
import { authMiddleware } from '../auth'
import type { Env } from '../types'

export const announcementsRoutes = new Hono<{ Bindings: Env }>()

// GET /api/announcements — public (active only by default)
announcementsRoutes.get('/', async (c) => {
    const all = c.req.query('all') === 'true'
    const sql = all
        ? 'SELECT * FROM announcements ORDER BY created_at DESC'
        : 'SELECT * FROM announcements WHERE is_active = 1 ORDER BY created_at DESC'
    const { results } = await c.env.DB.prepare(sql).all()
    return c.json(results)
})

// POST /api/announcements — admin
announcementsRoutes.post('/', authMiddleware, async (c) => {
    const { title, message, link, link_text } = await c.req.json()
    if (!title || !message) return c.json({ error: 'Title and message are required' }, 400)
    const result = await c.env.DB.prepare(
        'INSERT INTO announcements (title, message, link, link_text) VALUES (?, ?, ?, ?)'
    ).bind(title, message, link || null, link_text || null).run()
    const ann = await c.env.DB.prepare('SELECT * FROM announcements WHERE id = ?').bind(result.meta.last_row_id).first()
    return c.json(ann, 201)
})

// PUT /api/announcements/:id — admin
announcementsRoutes.put('/:id', authMiddleware, async (c) => {
    const id = c.req.param('id')
    const existing = await c.env.DB.prepare('SELECT * FROM announcements WHERE id = ?').bind(id).first()
    if (!existing) return c.json({ error: 'Announcement not found' }, 404)
    const { title, message, link, link_text, is_active } = await c.req.json()
    await c.env.DB.prepare(`
    UPDATE announcements SET title = COALESCE(?1, title), message = COALESCE(?2, message),
    link = COALESCE(?3, link), link_text = COALESCE(?4, link_text),
    is_active = COALESCE(?5, is_active), updated_at = datetime('now') WHERE id = ?6
  `).bind(title, message, link, link_text, is_active !== undefined ? (is_active ? 1 : 0) : null, id).run()
    const ann = await c.env.DB.prepare('SELECT * FROM announcements WHERE id = ?').bind(id).first()
    return c.json(ann)
})

// DELETE /api/announcements/:id — admin
announcementsRoutes.delete('/:id', authMiddleware, async (c) => {
    const id = c.req.param('id')
    const existing = await c.env.DB.prepare('SELECT * FROM announcements WHERE id = ?').bind(id).first()
    if (!existing) return c.json({ error: 'Announcement not found' }, 404)
    await c.env.DB.prepare('DELETE FROM announcements WHERE id = ?').bind(id).run()
    return c.json({ success: true })
})
