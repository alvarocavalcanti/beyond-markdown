# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Beyond Markdown is a browser extension that exports D&D Beyond content as Markdown. Built for Chrome (Manifest V3, sidepanel) and Firefox (popup), using TypeScript with Vite.

## Commands

- `npm run dev` - Start development server with hot reload (Chrome)
- `npm run dev:firefox` - Start development server for Firefox
- `npm run build` - Build production extension to `dist/`
- `npm run build:firefox` - Build for Firefox (runs `scripts/firefox-manifest.js` post-build to patch manifest)
- `npm run lint` - Lint TypeScript files with ESLint
- `npm test` - Run tests once with Vitest
- `npm run test:watch` - Run tests in watch mode
- `npm run validate` - Lint + test + build both targets (use before releasing)
- `npm run release:chrome` / `npm run release:firefox` - Build and package zip for store submission

## Architecture

### Browser Target Split

The same source is built for two targets via `TARGET_BROWSER` env var (defaults to `chrome`):

- **Chrome**: uses `src/sidepanel/` — Chrome Side Panel API, opened via `chrome.sidePanel`
- **Firefox**: uses `src/popup/` — standard browser popup (no Side Panel API)

`vite-plugin-web-extension` reads `src/manifest.json` and automatically resolves `.ts` references to `.js` in output. The Firefox build additionally runs `scripts/firefox-manifest.js` to transform the manifest for MV2 compatibility.

### Message Flow

Content is extracted via a request/response message pattern:

1. User clicks Generate in the UI (sidepanel or popup)
2. UI sends `EXTRACT_CONTENT` message (defined in `src/constants/messages.ts`) to the active tab
3. `src/content/content-script.ts` receives the message, extracts the first `article`, `main`, or `.content` element, and returns `{ html, title, url }`
4. UI passes the response to `convertHtmlToMarkdown()` and renders the result

The background service worker (`src/background/service-worker.ts`) only handles opening the sidepanel on icon click — it does **not** relay content messages.

### Markdown Converter

`src/utils/markdown-converter.ts` wraps Turndown with GFM plugin and adds custom rules:

- **`<aside>` elements** → blockquotes (handles rules sidebars, notes)
- **Tooltip links** (`.tooltip-hover` with `data-tooltip-href`) → standard Markdown links using `data-tooltip-href` as the title attribute
- **Heading anchors** — empty `<a>` tags inside headings are stripped
- **`<nav>` and `.breadcrumb`** elements → removed entirely
- **`data-content-chunk-id`** attributes → removed (not preserved)

Tests live in `src/utils/markdown-converter.test.ts` and use Vitest with jsdom.

### Development Notes

- TypeScript strict mode enabled; ESLint + lint-staged run on commit (husky)
- `webextension-polyfill` abstracts Chrome/Firefox API differences
- Chrome-specific APIs (e.g. `chrome.sidePanel`) are cast to `any` for TypeScript compatibility
- `src/utils/image-processor.ts` exists but is not integrated — image URLs remain as external links

### Release Process

1. Update version in `src/manifest.json`
2. Run `npm run validate` to confirm everything passes
3. Run `npm run release:chrome` and `npm run release:firefox` to create zips
4. Or push a version tag to trigger the GitHub Actions release workflow
