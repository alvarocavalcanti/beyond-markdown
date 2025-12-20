import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const sizes = [16, 32, 48, 128];
const publicIconsDir = join(process.cwd(), 'public', 'icons');

async function generateIcons() {
  await mkdir(publicIconsDir, { recursive: true });

  for (const size of sizes) {
    const fontSize = size * 0.45;
    const svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            .text { font-family: Arial, sans-serif; font-weight: bold; }
          </style>
        </defs>
        <rect width="${size}" height="${size}" fill="#1a1a1a" rx="${size * 0.2}"/>
        <text x="30%" y="52%" class="text" font-size="${fontSize}" fill="#e74c3c"
              text-anchor="middle" dominant-baseline="central">B</text>
        <text x="70%" y="52%" class="text" font-size="${fontSize}" fill="#e74c3c"
              text-anchor="middle" dominant-baseline="central">M</text>
        <path d="M ${size * 0.78} ${size * 0.58} l ${size * 0.08} ${size * 0.12} l ${size * 0.08} ${-size * 0.12}"
              stroke="#e74c3c" stroke-width="${size * 0.06}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
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
