import { Hono } from 'hono'
import { authMiddleware } from '../auth'
import type { Env } from '../types'

// Cloudinary upload via REST API
async function cloudinaryUpload(file: File, folder: string, env: Env) {
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

    if (!res.ok) throw new Error('Upload failed')
    return res.json() as Promise<{ secure_url: string; public_id: string; width: number; height: number }>
}

export const uploadRoutes = new Hono<{ Bindings: Env }>()

// POST /api/upload — admin, generic Cloudinary upload
uploadRoutes.post('/', authMiddleware, async (c) => {
    try {
        const formData = await c.req.formData()
        const file = formData.get('image') as File | null
        if (!file) return c.json({ error: 'No file provided' }, 400)

        const folder = (formData.get('folder') as string) || 'matrix-club/uploads'
        const result = await cloudinaryUpload(file, folder, c.env)

        return c.json({
            url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
        })
    } catch (err) {
        console.error('Upload error:', err)
        return c.json({ error: 'Upload failed' }, 500)
    }
})
