import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const sizes = [16, 32, 48, 128];
const publicIconsDir = join(process.cwd(), 'public', 'icons');

async function generateIcons() {
  await mkdir(publicIconsDir, { recursive: true });

  for (const size of sizes) {
    const svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="#2c3e50"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}"
              fill="white" text-anchor="middle" dominant-baseline="central" font-weight="bold">BM</text>
      </svg>
    `;

    await sharp(Buffer.from(svg))
      .png()
      .toFile(join(publicIconsDir, `icon-${size}.png`));

    console.log(`Generated icon-${size}.png`);
  }

  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
