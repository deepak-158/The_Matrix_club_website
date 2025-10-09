// Utility function to generate sample images (fallback)
export const getSampleImage = (width: number, height: number, text?: string) => {
  const displayText = text || `${width}x${height}`
  return `https://via.placeholder.com/${width}x${height}/222222/00FF41?text=${encodeURIComponent(displayText)}`
}

// Image helper function - switches between real images and placeholders
export const getImage = (imagePath: string, fallbackWidth = 400, fallbackHeight = 400, fallbackText?: string) => {
  // Check if image exists in public folder, otherwise use placeholder
  // In production, you might want to implement proper image existence checking
  if (imagePath && imagePath !== '/images/team/null' && !imagePath.includes('null')) {
    return imagePath
  }
  return getSampleImage(fallbackWidth, fallbackHeight, fallbackText)
}

// Sample image categories with real images
export const sampleImages = {
  event: (filename?: string) => 
    filename ? `/images/events/${filename}` : '/images/events/image.png',
  gallery: (filename?: string) => 
    filename ? `/images/gallery/${filename}` : '/images/gallery/image.png',
  team: (filename?: string) => 
    filename ? `/images/team/${filename}` : '/images/team/image.png',
  hero: (filename?: string) => 
    filename ? `/images/${filename}` : getSampleImage(1200, 600, 'Matrix+Club'),
  sponsor: (filename?: string) => 
    filename ? `/images/sponsors/${filename}` : '/images/sponsors/image.png',
}

// Navigation helpers
export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

export const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}