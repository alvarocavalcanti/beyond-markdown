import { defineConfig } from 'vite';
import webExtension from 'vite-plugin-web-extension';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  plugins: [
    webExtension({
      manifest: 'manifest.json',
      browser: process.env.TARGET_BROWSER || 'chrome',
    }),
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
