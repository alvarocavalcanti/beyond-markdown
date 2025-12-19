# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Beyond Markdown is a browser extension that allows users to export their D&D Beyond content as Markdown. The extension supports both Firefox and Chrome.

## Current State

This is an early-stage project. The codebase structure, build system, and development workflow are not yet established.

## Future Development Notes

When implementing the extension:
- Browser extension manifests will need to be created for both Firefox (manifest.json v2/v3) and Chrome (manifest.json v3)
- Content scripts will be needed to interact with D&D Beyond pages
- Background scripts may be needed for orchestrating exports
- UI components for export options and configuration
- Markdown conversion utilities to transform D&D Beyond HTML content to proper Markdown format
