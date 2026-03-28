import { Hono } from 'hono'
import { authMiddleware } from '../auth'
import type { Env } from '../types'

// Cloudinary upload via REST API (no SDK needed in Workers)
async function cloudinaryUpload(file: File, folder: string, env: Env): Promise<{ secure_url: string; public_id: string }> {
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}${env.CLOUDINARY_SECRET}`

    const hash = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(paramsToSign))
    const signature = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')

    const form = new FormData()
    form.append('file', file)
    form.append('folder', folder)
    form.append('timestamp', timestamp)
    form.append('api_key', env.CLOUDINARY_KEY)
    form.append('signature', signature)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD}/image/upload`, {
        method: 'POST',
        body: form,
    })

    if (!res.ok) throw new Error(`Cloudinary upload failed: ${res.statusText}`)
    return res.json()
}

async function cloudinaryDelete(publicId: string, env: Env): Promise<void> {
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}${env.CLOUDINARY_SECRET}`

    const hash = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(paramsToSign))
    const signature = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')

    const form = new FormData()
    form.append('public_id', publicId)
    form.append('timestamp', timestamp)
    form.append('api_key', env.CLOUDINARY_KEY)
    form.append('signature', signature)

    await fetch(`https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD}/image/destroy`, {
        method: 'POST',
        body: form,
    })
}

export const galleryRoutes = new Hono<{ Bindings: Env }>()

/* ═══ ALBUMS ═══ */

// GET /api/gallery/albums — public
galleryRoutes.get('/albums', async (c) => {
    const { results } = await c.env.DB.prepare(`
    SELECT a.*, COUNT(g.id) as image_count,
      (SELECT g2.image_url FROM gallery g2 WHERE g2.album_id = a.id ORDER BY g2.created_at DESC LIMIT 1) as latest_image
    FROM albums a LEFT JOIN gallery g ON g.album_id = a.id
    GROUP BY a.id ORDER BY a.created_at DESC
  `).all()
    return c.json(results)
})

// GET /api/gallery/albums/:id — public
galleryRoutes.get('/albums/:id', async (c) => {
    const id = c.req.param('id')
    const album = await c.env.DB.prepare('SELECT * FROM albums WHERE id = ?').bind(id).first()
    if (!album) return c.json({ error: 'Album not found' }, 404)
    const { results: images } = await c.env.DB.prepare('SELECT * FROM gallery WHERE album_id = ? ORDER BY created_at DESC').bind(id).all()
    return c.json({ ...album, images })
})

// POST /api/gallery/albums — admin
galleryRoutes.post('/albums', authMiddleware, async (c) => {
    const { title, description } = await c.req.json()
    if (!title) return c.json({ error: 'Title is required' }, 400)
    const result = await c.env.DB.prepare('INSERT INTO albums (title, description) VALUES (?, ?)').bind(title, description || null).run()
    const album = await c.env.DB.prepare('SELECT * FROM albums WHERE id = ?').bind(result.meta.last_row_id).first()
    return c.json(album, 201)
})

// PUT /api/gallery/albums/:id — admin
galleryRoutes.put('/albums/:id', authMiddleware, async (c) => {
    const id = c.req.param('id')
    const existing = await c.env.DB.prepare('SELECT * FROM albums WHERE id = ?').bind(id).first()
    if (!existing) return c.json({ error: 'Album not found' }, 404)
    const { title, description } = await c.req.json()
    await c.env.DB.prepare('UPDATE albums SET title = COALESCE(?1, title), description = COALESCE(?2, description) WHERE id = ?3').bind(title, description, id).run()
    const album = await c.env.DB.prepare('SELECT * FROM albums WHERE id = ?').bind(id).first()
    return c.json(album)
})

// DELETE /api/gallery/albums/:id — admin
galleryRoutes.delete('/albums/:id', authMiddleware, async (c) => {
    const id = c.req.param('id')
    const existing = await c.env.DB.prepare('SELECT * FROM albums WHERE id = ?').bind(id).first()
    if (!existing) return c.json({ error: 'Album not found' }, 404)

    // Delete images from Cloudinary
    const { results: images } = await c.env.DB.prepare('SELECT cloudinary_id FROM gallery WHERE album_id = ?').bind(id).all()
    for (const img of images as { cloudinary_id: string }[]) {
        if (img.cloudinary_id) await cloudinaryDelete(img.cloudinary_id, c.env).catch(console.error)
    }

    await c.env.DB.prepare('DELETE FROM albums WHERE id = ?').bind(id).run()
    return c.json({ success: true })
})

/* ═══ IMAGES ═══ */

// GET /api/gallery — public
galleryRoutes.get('/', async (c) => {
    const albumId = c.req.query('album_id')
    const sql = albumId
        ? 'SELECT * FROM gallery WHERE album_id = ? ORDER BY created_at DESC'
        : 'SELECT * FROM gallery ORDER BY created_at DESC'
    const { results } = albumId
        ? await c.env.DB.prepare(sql).bind(albumId).all()
        : await c.env.DB.prepare(sql).all()
    return c.json(results)
})

// POST /api/gallery — admin, upload images to album
galleryRoutes.post('/', authMiddleware, async (c) => {
    try {
        const formData = await c.req.formData()
        const files = formData.getAll('images') as File[]
        const albumId = formData.get('album_id') as string

        if (!files.length) return c.json({ error: 'No images provided' }, 400)
        if (!albumId) return c.json({ error: 'album_id is required' }, 400)

        const album = await c.env.DB.prepare('SELECT * FROM albums WHERE id = ?').bind(albumId).first()
        if (!album) return c.json({ error: 'Album not found' }, 404)

        const inserted = []
        for (const file of files) {
            if (!(file instanceof File)) continue
            const result = await cloudinaryUpload(file, 'matrix-club/gallery', c.env)
            const title = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
            const dbResult = await c.env.DB.prepare(
                'INSERT INTO gallery (title, image_url, cloudinary_id, album_id) VALUES (?, ?, ?, ?)'
            ).bind(title, result.secure_url, result.public_id, albumId).run()
            const item = await c.env.DB.prepare('SELECT * FROM gallery WHERE id = ?').bind(dbResult.meta.last_row_id).first()
            inserted.push(item)
        }

        return c.json({ uploaded: inserted.length, images: inserted }, 201)
    } catch (err) {
        console.error('Upload error:', err)
        return c.json({ error: 'Failed to upload images' }, 500)
    }
})

// DELETE /api/gallery/:id — admin
galleryRoutes.delete('/:id', authMiddleware, async (c) => {
    const id = c.req.param('id')
    const item = await c.env.DB.prepare('SELECT * FROM gallery WHERE id = ?').bind(id).first() as { cloudinary_id: string } | null
    if (!item) return c.json({ error: 'Image not found' }, 404)

    if (item.cloudinary_id) await cloudinaryDelete(item.cloudinary_id, c.env).catch(console.error)
    await c.env.DB.prepare('DELETE FROM gallery WHERE id = ?').bind(id).run()
    return c.json({ success: true })
})
