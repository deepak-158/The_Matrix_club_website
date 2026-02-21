import { Hono } from 'hono'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import type { Env } from './types'

// Simple JWT using Web Crypto (Workers don't have jsonwebtoken)
async function signToken(payload: Record<string, unknown>, secret: string, expiresInHours = 24): Promise<string> {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).replace(/=/g, '')
    const now = Math.floor(Date.now() / 1000)
    const body = btoa(JSON.stringify({ ...payload, iat: now, exp: now + expiresInHours * 3600 })).replace(/=/g, '')
    const data = `${header}.${body}`
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
    const sig = btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
    return `${data}.${sig}`
}

async function verifyToken(token: string, secret: string): Promise<Record<string, unknown> | null> {
    try {
        const [header, body, sig] = token.split('.')
        const data = `${header}.${body}`
        const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])
        // Reconstruct sig for verification
        const sigBytes = Uint8Array.from(atob(sig.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))
        const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(data))
        if (!valid) return null
        const payload = JSON.parse(atob(body))
        if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null
        return payload
    } catch {
        return null
    }
}

// Simple password hash using SHA-256 (Workers don't have bcrypt)
async function hashPassword(password: string): Promise<string> {
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export const authRoutes = new Hono<{ Bindings: Env }>()

authRoutes.post('/login', async (c) => {
    const { password } = await c.req.json<{ password: string }>()
    if (!password) return c.json({ error: 'Password is required' }, 400)

    const adminPassword = c.env.ADMIN_PASSWORD || 'matrix2026'
    if (password !== adminPassword) return c.json({ error: 'Invalid password' }, 401)

    const token = await signToken({ admin: true }, c.env.JWT_SECRET)

    setCookie(c, 'token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60,
        path: '/',
    })

    return c.json({ success: true, message: 'Logged in' })
})

authRoutes.post('/logout', (c) => {
    deleteCookie(c, 'token', { path: '/' })
    return c.json({ success: true, message: 'Logged out' })
})

authRoutes.get('/check', async (c) => {
    const token = getCookie(c, 'token')
    if (!token) return c.json({ authenticated: false })
    const payload = await verifyToken(token, c.env.JWT_SECRET)
    return c.json({ authenticated: !!payload })
})

// Auth middleware for protected routes
export async function authMiddleware(c: any, next: () => Promise<void>) {
    const token = getCookie(c, 'token')
    if (!token) return c.json({ error: 'Not authenticated' }, 401)
    const payload = await verifyToken(token, c.env.JWT_SECRET)
    if (!payload) return c.json({ error: 'Invalid or expired token' }, 401)
    c.set('admin', true)
    await next()
}
