# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Beyond Markdown is a browser extension that exports D&D Beyond content as Markdown. The extension is built for Chrome (Manifest V3) with sidepanel support, and uses TypeScript with Vite for building.

## Build Commands

- `npm run dev` - Start development server with hot reload
- `npm run dev:firefox` - Start development server for Firefox
- `npm run build` - Build production extension to `dist/` directory
- `npm run build:firefox` - Build production extension for Firefox
- `npm run lint` - Lint TypeScript files with ESLint

## Architecture

### Directory Structure

```bash
src/
├── background/           # Background service worker
│   └── service-worker.ts
├── content/             # Content script injected into D&D Beyond pages
│   └── content-script.ts
├── sidepanel/           # Sidepanel UI (Chrome side panel)
│   ├── index.html
│   ├── sidepanel.ts
│   └── styles.css
├── utils/               # Shared utilities
│   ├── markdown-converter.ts  # Turndown-based HTML to Markdown converter
│   └── storage.ts            # Browser storage wrapper
└── manifest.json        # Extension manifest (uses .ts extensions, built to .js)
```

### Key Components

**Background Service Worker** (`src/background/service-worker.ts`)

- Opens sidepanel when extension icon is clicked
- Routes messages between content script and sidepanel
- Handles `GET_PAGE_CONTENT` message type

**Content Script** (`src/content/content-script.ts`)

- Injected into all D&D Beyond pages (`https://www.dndbeyond.com/*`)
- Extracts page content (looks for `article`, `main`, or `.content` elements)
- Returns HTML, title, and URL to sidepanel

**Sidepanel UI** (`src/sidepanel/`)

- Chrome sidepanel for preview and export
- Settings: save path, image download options, markdown syntax (standard/Obsidian)
- Generate button triggers content extraction and markdown conversion
- Save button downloads the generated markdown file

**Markdown Converter** (`src/utils/markdown-converter.ts`)

- Uses Turndown library for HTML to Markdown conversion
- Custom rules for D&D Beyond specific elements:
  - `<aside>` tags - converted to blockquotes with headers (rules sidebars, notes)
  - Tooltip links - preserves `data-tooltip-href` attribute
  - `data-content-chunk-id` - preserved as HTML comments

### Build System

Uses **Vite** with `vite-plugin-web-extension`:

- Root directory is `src/`
- Automatically processes manifest.json and converts .ts references to .js
- Bundles TypeScript, handles CSS, and outputs to `dist/`
- Icon files: Placeholder SVG-based PNGs in `dist/icons/` (16, 32, 48, 128)

### Development Notes

- TypeScript strict mode enabled
- ESLint configured for browser extension development
- Uses `webextension-polyfill` for cross-browser compatibility
- Chrome-specific APIs (like `sidePanel`) are cast to `any` for TypeScript

### D&D Beyond Specific Features

The extension is designed to handle D&D Beyond's specific HTML structure:

- Aside elements with `class="text--rules-sidebar"` or similar
- Tooltip links with `class="tooltip-hover"` and `data-tooltip-href` attributes
- Content chunks identified by `data-content-chunk-id` attributes

### Manual Testing

#### Testing in Chrome

1. Run `npm run build` to create the `dist/` directory
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the `dist/` directory
5. Navigate to a D&D Beyond page (e.g., https://www.dndbeyond.com/sources/dnd/br-2024/playing-the-game)
6. Click the extension icon to open the popup
7. Click "Generate" to convert the page content to Markdown
8. Click "Save" to download the markdown file

#### Testing in Firefox

1. Run `npm run build:firefox` to create the Firefox build in `dist/` directory
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..."
4. Navigate to the `dist/` directory and select the `manifest.json` file
5. Navigate to a D&D Beyond page (e.g., https://www.dndbeyond.com/sources/dnd/br-2024/playing-the-game)
6. Click the extension icon in the toolbar to open the popup
7. Click "Generate" to convert the page content to Markdown
8. Click "Save" to download the markdown file

### Implemented Features

- ✅ HTML to Markdown conversion with Turndown
- ✅ Custom rules for D&D Beyond aside elements and tooltips
- ✅ Popup UI for both Chrome and Firefox
- ✅ Clean markdown output (removed chunk-ids, navigation, fixed heading anchors)
- ✅ File download using anchor element click (works in Firefox and Chrome)
- ✅ Proper PNG icons with D&D Beyond branding (red on black)
- ✅ Cross-browser manifest support (service_worker for Chrome, scripts for Firefox)
- ✅ GitHub Actions workflow for automated releases
- ✅ Buy Me a Coffee support button

### Known Issues & Future Improvements

- Image download feature not implemented (image-processor.ts utility created but not integrated)
  - Image URLs remain as external links in markdown
  - UI for image options removed
- Settings persistence infrastructure exists but not exposed in UI
- Custom save path not supported (browser security restrictions)

### Release Process

To create a release:
1. Update version in `src/manifest.json`
2. Run `npm run release:chrome` to create Chrome zip
3. Run `npm run release:firefox` to create Firefox zip
4. Or push to GitHub and use Actions workflow to create release automatically
