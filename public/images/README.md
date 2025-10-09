# Images Folder Structure

Place your images in the following folders based on their usage:

## 📁 `/public/images/`

### Team Photos
**Folder:** `/public/images/team/`
- Place individual team member photos here
- Recommended naming: `firstname-lastname.jpg` or use member ID
- **Format:** JPG or PNG
- **Size:** 400x400px (square) for best results
- **Examples:**
  - `eipshita-basuli.jpg`
  - `ayush-upadhyay.jpg`
  - `piyush-kumar-singh.jpg`

### Event Images  
**Folder:** `/public/images/events/`
- Event posters, workshop photos, etc.
- **Format:** JPG or PNG
- **Size:** 400x250px (16:10 ratio) for event cards
- **Examples:**
  - `cybershot-workshop.jpg`
  - `vfx-masterclass.jpg`
  - `drone-cinematography.jpg`

### Gallery Photos
**Folder:** `/public/images/gallery/`
- Club work showcase, project photos
- **Format:** JPG or PNG  
- **Size:** 250x250px (square) for gallery grid
- **Examples:**
  - `photography-work-1.jpg`
  - `video-project-1.jpg`
  - `design-work-1.jpg`

### Sponsor Logos
**Folder:** `/public/images/sponsors/`
- Partner and sponsor logos
- **Format:** PNG (transparent background preferred)
- **Size:** 200x100px max
- **Examples:**
  - `vit-bhopal-logo.png`
  - `adobe-logo.png`

## 🔧 How to Reference Images in Code

Once you place images in the public folder, reference them like this:

```tsx
// Team member photo
<img src="/images/team/eipshita-basuli.jpg" alt="Eipshita Basuli" />

// Event image
<img src="/images/events/cybershot-workshop.jpg" alt="CyberShot Workshop" />

// Gallery photo
<img src="/images/gallery/photography-work-1.jpg" alt="Photography Work" />

// Sponsor logo
<img src="/images/sponsors/vit-bhopal-logo.png" alt="VIT Bhopal" />
```

## 📋 Current Placeholder Usage

The website currently uses placeholder images from `via.placeholder.com`. Once you add real images, update the following files:

1. **Team photos:** Update `src/pages/About.tsx` - replace `member.image` with actual paths
2. **Event images:** Update `src/pages/Events.tsx` and `src/pages/Home.tsx`
3. **Gallery images:** Update `src/pages/Home.tsx` 
4. **Sponsor logos:** Update `src/pages/About.tsx`

## ✅ Image Optimization Tips

- **Compress images** before uploading (use tools like TinyPNG)
- **Use WebP format** for better performance when possible
- **Keep file sizes under 500KB** for fast loading
- **Use descriptive file names** (no spaces, use hyphens)
- **Maintain consistent aspect ratios** within each category