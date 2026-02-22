import React, { useState } from 'react'

interface OptimizedImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    style?: React.CSSProperties
    /** Skeleton border radius, defaults to '8px' */
    borderRadius?: string
}

/**
 * Image component with skeleton loading animation and smooth fade-in.
 * Works with any image URL (Cloudinary or local).
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    width,
    height,
    className,
    style,
    borderRadius = '8px',
}) => {
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)

    if (error) {
        return (
            <div
                className={className}
                style={{
                    width: width ?? '100%',
                    height: height ?? 200,
                    background: '#222',
                    borderRadius,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#666',
                    fontSize: '0.85rem',
                    ...style,
                }}
                role="img"
                aria-label={alt}
            >
                Image unavailable
            </div>
        )
    }

    return (
        <div
            className={className}
            style={{
                position: 'relative',
                width: width ?? '100%',
                height: height ?? 'auto',
                borderRadius,
                overflow: 'hidden',
                ...style,
            }}
        >
            {/* Skeleton */}
            {!loaded && (
                <div
                    className="skeleton-pulse"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite',
                        borderRadius,
                    }}
                />
            )}

            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    borderRadius,
                }}
            />
        </div>
    )
}

export default OptimizedImage
