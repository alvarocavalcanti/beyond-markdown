import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function patchManifestForFirefox() {
  const manifestPath = join(process.cwd(), 'dist', 'manifest.json');
  const manifestContent = await readFile(manifestPath, 'utf-8');
  const manifest = JSON.parse(manifestContent);

  if (manifest.background && manifest.background.service_worker) {
    const serviceWorkerPath = manifest.background.service_worker;
    manifest.background.scripts = [serviceWorkerPath];
    delete manifest.background.service_worker;
  }

  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('✓ Patched manifest.json for Firefox compatibility');
}

patchManifestForFirefox().catch(console.error);
