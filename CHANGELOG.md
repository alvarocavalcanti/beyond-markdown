# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-04-01

### Added

- External links setting with three options, persisted across sessions:
  - **Absolute D&D Beyond URLs** (default) — converts relative links to full `https://www.dndbeyond.com/...` URLs, preventing Obsidian from treating them as local wiki links
  - **Keep as-is** — preserves original relative links
  - **Remove links** — strips links and renders plain text

### Fixed

- Bullet point indentation: extra whitespace inside `<li>` elements no longer produces visually indented list items in the output

## [1.0.2] - 2025-12-22

### Added

- Ko-fi donation link

### Fixed

- Firefox AMO compliance: added `data_collection_permissions`
- Manifest fields for better store compatibility

## [1.0.1] - 2025-12-22

### Fixed

- Minor fixes and improvements

## [1.0.0] - 2025-12-20

### Added

- Initial release
- HTML to Markdown conversion with Turndown and GFM support
- Custom rules for D&D Beyond aside elements (rules sidebars, notes)
- Tooltip link preservation using `data-tooltip-href`
- Navigation and breadcrumb removal
- Chrome sidepanel and Firefox popup UI
- File download as `.md`
- GitHub Actions workflow for automated releases
