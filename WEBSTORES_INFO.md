# Web Store Submission Information

This document contains the information needed to submit Beyond Markdown to the Chrome Web Store and Firefox Add-ons (AMO).

## General Information

### Extension Name

```text
Beyond Markdown
```

### Tagline / Short Description

```text
Export D&D Beyond content as Markdown files
```

### Detailed Description

```text
Beyond Markdown is a browser extension that allows you to export D&D Beyond source pages as clean Markdown files.

Features:

- Extract content from any D&D Beyond source page
- Convert HTML to clean, readable Markdown format
- Preserve aside elements (rules sidebars, notes) as blockquotes
- Maintain tooltip links with reference URLs
- Remove navigation elements and chunk IDs for clean output
- One-click download of markdown files
- Works seamlessly in both Firefox and Chrome

Perfect for:

- Creating personal notes from D&D Beyond content
- Archiving your favorite rules for offline reference
- Converting content to your preferred markdown editor (Obsidian, Notion, etc.)

How to Use:

1. Navigate to any D&D Beyond source page
2. Click the Beyond Markdown extension icon
3. Click "Generate" to convert the page content
4. Review the preview
5. Click "Save" to download the markdown file

⚠️ Important: This extension is for personal use only. You must comply with D&D Beyond's Terms of Service and only export content you have legal access to view.

This extension does not bypass paywalls, authentication, or access controls. It functions similarly to your browser's "Print to PDF" feature.

Not affiliated with Wizards of the Coast or D&D Beyond.
```

### Category

**Chrome Web Store:**

- Primary: `Productivity`
- Secondary: `Tools`

**Firefox Add-ons:**

- Primary: `Other`
- Or: `Productivity`

### Version

```text
1.0.0
```

### Support/Homepage URL

```text
https://github.com/yourusername/beyond-markdown
```

### Support Email (Optional)

```text
your-email@example.com
```

---

## Chrome Web Store Specific

### Screenshots Required

You need at least 1 screenshot (1280x800 or 640x400 recommended).

**Screenshot 1**: Popup with preview

- Show the extension popup open on a D&D Beyond page
- Display markdown preview of converted content
- Highlight the Generate and Save buttons

**Screenshot 2** (Optional): Before/After comparison

- Split view showing D&D Beyond page and resulting markdown

**Screenshot Ideas**:

1. Extension popup showing markdown preview
2. Downloaded markdown file in a text editor
3. Aside element properly converted to blockquote

### Promotional Images (Optional)

**Small Promotional Tile** (440x280 PNG):

- Extension icon + "Beyond Markdown" text
- Tagline: "D&D Beyond to Markdown"

**Marquee Promotional Tile** (1400x560 PNG) - Optional but recommended:

- More elaborate design with features list
- Screenshots or mockups

### Privacy Policy

Since you're not collecting any user data, you can state:

```text
This extension does not collect, store, or transmit any personal data. All processing happens locally in your browser. Settings are stored locally using the browser's storage API and are never sent to any server.
```

Or simply: **Not Required** (check "This extension does not collect user data")

### Permissions Justification

When Chrome asks why you need each permission:

**storage**:

```text
Used to save user preferences locally (currently not exposed in UI, but infrastructure exists for future features).
```

**downloads**:

```text
Required to allow users to download the converted markdown files to their local device.
```

**host_permissions** (`https://www.dndbeyond.com/*`):

```text
Required to access and extract content from D&D Beyond pages that the user is currently viewing. This permission allows the content script to read the page HTML and convert it to Markdown.
```

---

## Firefox Add-ons (AMO) Specific

### Add-on ID

```text
beyond-markdown@memorablenaton.es
```

Already in manifest.json

### License

```text
Apache License 2.0
```

Match with your LICENSE file

### This add-on is experimental

```text
No
```

### This add-on requires payment, non-free services or software

```text
No
```

### Source Code Submission

Firefox requires source code for review. You'll need to upload:

1. The zip file with built extension
2. A separate source code zip (optional if code is public on GitHub)

For source code, you can either:

- **Option A**: Point to your public GitHub repository
- **Option B**: Upload a zip of your source code

If uploading source, include:

- All source files (`src/` directory)
- `package.json` and `package-lock.json`
- Build instructions in a `BUILD.md` or point to README.md

**Build Instructions for AMO reviewers**:

```bash
1. Install Node.js 20+
2. Run: npm install
3. Run: npm run build:firefox
4. The built extension will be in the dist/ folder
```

### Screenshots

At least 1 screenshot required (same as Chrome).

### Release Notes (for each version)

**v1.0.0**:

```text
Initial release

Features:

- Export D&D Beyond source pages as Markdown
- Custom conversion rules for aside elements and tooltips
- Clean markdown output
- One-click download
- Works on all D&D Beyond source pages
```

---

## Pre-Submission Checklist

### Both Stores

- [ ] Test extension in production build
- [ ] Verify all permissions are necessary
- [ ] Take screenshots (1280x800 recommended)
- [ ] Prepare promotional images (optional but recommended)
- [ ] Test on different D&D Beyond pages
- [ ] Verify disclaimer is visible in extension

### Chrome Specific

- [ ] Register Chrome Web Store developer account ($5 one-time fee)
- [ ] Prepare privacy policy statement
- [ ] Review Chrome Web Store policies

### Firefox Specific

- [ ] Create Firefox Add-ons developer account (free)
- [ ] Ensure add-on ID is in manifest
- [ ] Prepare source code or GitHub link
- [ ] Review AMO policies

---

## Post-Submission

### Chrome Web Store

- Review typically takes a few hours to a few days
- You'll receive email notification when approved/rejected
- Can publish immediately or schedule release

### Firefox Add-ons

- Review typically takes 1-5 days for new extensions
- Manual review by Mozilla staff
- More thorough review process than Chrome
- You'll receive email with review results

---

## Tips for Approval

1. **Be transparent**: Clearly explain what the extension does
2. **Minimal permissions**: Only request what you actually need (✓ already done)
3. **Clear privacy**: State you don't collect data (✓ already done)
4. **Good screenshots**: Show the extension in action
5. **Detailed description**: Explain use cases and limitations
6. **Responsive support**: Be ready to answer reviewer questions

---

## Common Rejection Reasons (to avoid)

- **Unclear purpose**: Make description very clear about D&D Beyond export
- **Excessive permissions**: You only request what's needed ✓
- **Missing privacy policy**: State clearly if no data collected ✓
- **Poor quality screenshots**: Take high-quality, clear screenshots
- **Trademark issues**: Avoid using "D&D" or "Dungeons & Dragons" in extension name ✓
  - "Beyond Markdown" is generic enough
  - Make disclaimer clear about no affiliation ✓
