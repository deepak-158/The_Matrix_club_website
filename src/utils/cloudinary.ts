/**
 * Cloudinary image utility for The Matrix Club website.
 * Generates optimized CDN URLs with automatic format conversion,
 * quality optimization, and responsive sizing.
 */

import { CLOUD_NAME, IMAGE_MAP } from '../data/imageMap'

const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`

interface CloudinaryOptions {
    /** Max width in pixels */
    width?: number
    /** Max height in pixels */
    height?: number
    /** Quality: 'auto', 'auto:low', 'auto:good', 'auto:best', or a number 1-100 */
    quality?: string | number
    /** Crop mode */
    crop?: 'fill' | 'fit' | 'limit' | 'scale' | 'thumb'
    /** Gravity for cropping */
    gravity?: 'auto' | 'face' | 'center'
    /** Format: 'auto' uses WebP/AVIF based on browser support */
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
}

/**
 * Generate an optimized Cloudinary URL for a given local image path.
 * Falls back to the local path if the image isn't in the mapping.
 */
export function cloudinaryUrl(
    localPath: string,
    options: CloudinaryOptions = {}
): string {
    const publicId = IMAGE_MAP[localPath]

    // Fallback to local path if not found in mapping
    if (!publicId) return localPath

    const {
        width,
        height,
        quality = 'auto',
        crop = 'limit',
        gravity = 'auto',
        format = 'auto',
    } = options

    const transforms: string[] = [`f_${format}`, `q_${quality}`]

    if (width) transforms.push(`w_${width}`)
    if (height) transforms.push(`h_${height}`)
    if (width || height) {
        transforms.push(`c_${crop}`)
        if (crop === 'fill' || crop === 'thumb') {
            transforms.push(`g_${gravity}`)
        }
    }

    return `${CLOUDINARY_BASE}/${transforms.join(',')}/${publicId}`
}

/** Preset: Team member avatar (120px displayed, 2x for retina = 240px) */
export function teamAvatarUrl(localPath: string): string {
    return cloudinaryUrl(localPath, {
        width: 240,
        height: 240,
        crop: 'fill',
        gravity: 'face',
    })
}

/** Preset: Gallery/event thumbnail (400px) */
export function galleryThumbUrl(localPath: string): string {
    return cloudinaryUrl(localPath, { width: 400 })
}

/** Preset: Event card image (600px) */
export function eventImageUrl(localPath: string): string {
    return cloudinaryUrl(localPath, { width: 600 })
}

/** Preset: Full-width hero/banner (1200px) */
export function heroImageUrl(localPath: string): string {
    return cloudinaryUrl(localPath, { width: 1200 })
}

/** Preset: Sponsor logo (200px) */
export function sponsorLogoUrl(localPath: string): string {
    return cloudinaryUrl(localPath, { width: 200 })
}
