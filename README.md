# Beyond Markdown

A browser extension to export D&D Beyond content as Markdown files.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Chrome](https://img.shields.io/badge/chrome-supported-brightgreen.svg)
![Firefox](https://img.shields.io/badge/firefox-supported-brightgreen.svg)

## ⚠️ Important Disclaimer

This extension is intended for **personal use only**. By using this extension, you agree to:

- Comply with [D&D Beyond's Terms of Service](https://www.dndbeyond.com/en/terms-conditions)
- Only export content you have legal access to view
- Use exported content solely for personal, non-commercial purposes
- Not redistribute or share exported content
- Respect Wizards of the Coast's intellectual property rights

This tool functions similarly to your browser's "Print to PDF" or "Save As" features - it only converts content already visible to you in your browser. It does not bypass any paywalls, authentication, or access controls.

**The authors of this extension are not affiliated with Wizards of the Coast or D&D Beyond.**

## Features

- 🎲 Extract content from D&D Beyond source pages
- 📝 Convert HTML to clean Markdown format
- 🔖 Preserve aside elements (rules sidebars, notes) as blockquotes
- 🔗 Maintain tooltip links with reference URLs
- 🧹 Remove navigation elements and chunk IDs for clean output
- 💾 Download markdown files with one click
- 🦊 Works in both Firefox and Chrome

## Installation

### Chrome

1. Download the latest Chrome release from [Releases](https://github.com/yourusername/beyond-markdown/releases)
2. Extract the zip file
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode" (toggle in top right)
5. Click "Load unpacked" and select the extracted folder
6. Navigate to any D&D Beyond page and click the extension icon

### Firefox

1. Download the latest Firefox release from [Releases](https://github.com/yourusername/beyond-markdown/releases)
2. Extract the zip file
3. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
4. Click "Load Temporary Add-on..."
5. Navigate to the extracted folder and select `manifest.json`
6. Navigate to any D&D Beyond page and click the extension icon

## Usage

1. Navigate to any D&D Beyond source page (e.g., https://www.dndbeyond.com/sources/dnd/br-2024/playing-the-game)
2. Click the Beyond Markdown extension icon in your browser toolbar
3. Click "Generate" to convert the page content to Markdown
4. Review the preview
5. Click "Save" to download the markdown file

## Development

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
npm install
```

### Build Commands

- `npm run dev` - Start development server for Chrome
- `npm run dev:firefox` - Start development server for Firefox
- `npm run build` - Build production version for Chrome
- `npm run build:firefox` - Build production version for Firefox
- `npm run lint` - Lint TypeScript files
- `npm run release:chrome` - Create Chrome release zip
- `npm run release:firefox` - Create Firefox release zip

### Project Structure

See [CLAUDE.md](./CLAUDE.md) for detailed architecture documentation.

## Support

If you find this extension useful, consider supporting its development:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/alvarocavalcanti)

## License

See [LICENSE](./LICENSE) file for details.
