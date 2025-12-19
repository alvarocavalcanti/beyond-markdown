import { defineConfig } from 'vite';
import webExtension from 'vite-plugin-web-extension';

export default defineConfig({
  plugins: [
    webExtension({
      manifest: './src/manifest.json',
      browser: process.env.TARGET_BROWSER || 'chrome',
      webExtConfig: {
        startUrl: 'https://www.dndbeyond.com/sources/dnd/br-2024/playing-the-game',
      },
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
