#!/bin/bash
# Compress all images in public/images for web delivery
# Team photos: 300px width (displayed at 120px, 2x for retina)
# Event photos: 800px width
# Quality: 80% JPEG

set -e

IMAGES_DIR="public/images"
PROCESSED=0
SKIPPED=0

compress_image() {
  local file="$1"
  local max_width="$2"
  local quality="${3:-80}"
  
  # Get original size
  local orig_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
  
  # Skip if already small (< 200KB)
  if [ "$orig_size" -lt 204800 ]; then
    SKIPPED=$((SKIPPED + 1))
    return
  fi
  
  # Create backup name
  local backup="${file}.bak"
  
  # Compress using ImageMagick
  convert "$file" \
    -resize "${max_width}x${max_width}>" \
    -quality "$quality" \
    -strip \
    -sampling-factor 4:2:0 \
    -interlace Plane \
    "${file}.tmp"
  
  # Replace original
  mv "${file}.tmp" "$file"
  
  local new_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
  local saved=$(( (orig_size - new_size) / 1024 ))
  
  echo "  ✓ $(basename $file): ${orig_size}B → ${new_size}B (saved ${saved}KB)"
  PROCESSED=$((PROCESSED + 1))
}

echo "🔧 Compressing images in $IMAGES_DIR..."
echo ""

# Team photos (displayed at 120x120, compress to 300px for retina)
echo "👤 Team photos (→ 300px max):"
find "$IMAGES_DIR/team" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read file; do
  compress_image "$file" 300 80
done

# Event photos (displayed in cards/galleries, compress to 800px)  
echo ""
echo "📸 Event photos (→ 800px max):"
find "$IMAGES_DIR/events" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read file; do
  compress_image "$file" 800 80
done

# Sponsor/gallery/other
echo ""
echo "🏢 Other images (→ 400px max):"
find "$IMAGES_DIR" -maxdepth 2 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) ! -path "*/team/*" ! -path "*/events/*" | while read file; do
  compress_image "$file" 400 80
done

echo ""
echo "✅ Done! Processed: $PROCESSED, Skipped (already small): $SKIPPED"
echo ""
du -sh "$IMAGES_DIR"
