// Upload all images from public/images to Cloudinary
// Usage: node scripts/upload-to-cloudinary.mjs

import { v2 as cloudinary } from 'cloudinary';
import { readdir, stat } from 'fs/promises';
import { join, relative, parse } from 'path';

cloudinary.config({
    cloud_name: 'dfc9sgywk',
    api_key: '174996598746739',
    api_secret: 'ari321XC-VPd1nS8cHrWjrh-t8E',
    secure: true,
});

const IMAGES_DIR = 'public/images';
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const FOLDER_PREFIX = 'matrix-club';

async function getAllImages(dir) {
    const files = [];
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...(await getAllImages(fullPath)));
        } else {
            const ext = parse(entry.name).ext.toLowerCase();
            if (IMAGE_EXTS.has(ext)) {
                files.push(fullPath);
            }
        }
    }
    return files;
}

async function uploadImage(localPath) {
    // Convert local path to Cloudinary public_id
    // e.g., public/images/team/technical/DeepakShukla.jpg → matrix-club/team/technical/DeepakShukla
    const relPath = relative(IMAGES_DIR, localPath);
    const { dir, name } = parse(relPath);
    const publicId = `${FOLDER_PREFIX}/${dir ? dir + '/' : ''}${name}`;

    try {
        const result = await cloudinary.uploader.upload(localPath, {
            public_id: publicId,
            overwrite: true,
            resource_type: 'image',
            unique_filename: false,
            use_filename: true,
        });
        return { localPath, publicId, url: result.secure_url, success: true };
    } catch (err) {
        return { localPath, publicId, error: err.message, success: false };
    }
}

async function main() {
    console.log('🔍 Finding images...');
    const images = await getAllImages(IMAGES_DIR);
    console.log(`📸 Found ${images.length} images to upload\n`);

    const results = { success: 0, failed: 0 };
    const mapping = {};

    // Upload in batches of 5 to avoid rate limits
    for (let i = 0; i < images.length; i += 5) {
        const batch = images.slice(i, i + 5);
        const batchResults = await Promise.all(batch.map(uploadImage));

        for (const r of batchResults) {
            if (r.success) {
                results.success++;
                // Map the local web path to cloudinary public_id
                const webPath = '/' + relative('public', r.localPath);
                mapping[webPath] = r.publicId;
                console.log(`  ✅ ${r.localPath} → ${r.publicId}`);
            } else {
                results.failed++;
                console.log(`  ❌ ${r.localPath}: ${r.error}`);
            }
        }
    }

    console.log(`\n✨ Done! Uploaded: ${results.success}, Failed: ${results.failed}`);

    // Write mapping file
    const mappingContent = `// Auto-generated Cloudinary image mapping
// Cloud: dfc9sgywk
// Generated: ${new Date().toISOString()}

export const CLOUD_NAME = 'dfc9sgywk';

export const IMAGE_MAP: Record<string, string> = ${JSON.stringify(mapping, null, 2)};
`;

    const { writeFile } = await import('fs/promises');
    await writeFile('src/data/imageMap.ts', mappingContent);
    console.log('\n📄 Wrote image mapping to src/data/imageMap.ts');
}

main().catch(console.error);
