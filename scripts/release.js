import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const browser = process.argv[2];
if (!browser || !['chrome', 'firefox'].includes(browser)) {
  console.error('Usage: node scripts/release.js [chrome|firefox]');
  process.exit(1);
}

const manifestPath = join(process.cwd(), 'dist', 'manifest.json');
const manifestContent = await readFile(manifestPath, 'utf-8');
const manifest = JSON.parse(manifestContent);
const version = manifest.version;

const zipFilename = `beyond-markdown-${browser}-v${version}.zip`;

console.log(`Creating ${browser} release: ${zipFilename}`);

execSync(`cd dist && zip -r ../${zipFilename} .`, { stdio: 'inherit' });

console.log(`✓ ${browser} release created: ${zipFilename}`);
