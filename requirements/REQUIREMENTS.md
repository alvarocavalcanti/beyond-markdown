# General Description

This browser extension should be compatible with both Firefox and Chrome. Its sole feature is to export pages from D&D Beyond into Markdown files.

## Similar Extensions

### Obsidian WebClipper

<https://github.com/obsidianmd/obsidian-clipper>

### Markdownload

<https://github.com/sleetish/markdownload>

## Features

### Markdown Content Generation ✅ IMPLEMENTED

The page content should be converted to Markdown when the extension's icon is clicked.

**Status**: Implemented using Turndown library with custom rules for D&D Beyond content.

### Preview Window ✅ IMPLEMENTED

When the user clicks the extension icon, the markdown content should be displayed on a popup/context window.

**Status**: Implemented as a popup window that works in both Chrome and Firefox.

### Saving the Markdown ✅ PARTIALLY IMPLEMENTED

The preview window offers a Save button, that defaults to the browser's Downloads folder. But there's a text box next to the button that the user can type a different folder.

**Status**: Save button implemented using browser's native "Save As" dialog. Custom folder path input removed as it's not compatible with browser extension security policies.

### Images ⏳ NOT IMPLEMENTED

The preview window has an option to either download the images or use external links instead. If the download option is selected, the user is offered to choose which syntax to be used, standard Markdown, `[text](link)` or Obsidian, `[[link]]`.

**Status**: Not implemented. Image processor utility created but not integrated. Images remain as external links in the markdown output.

### Previously Used Settings ⏳ PARTIALLY IMPLEMENTED

The extension should remember the last used settings.

**Status**: Settings persistence infrastructure created but removed from UI since image download feature is not implemented.

### Aside and Tooltip Support ✅ IMPLEMENTED

Both aforementioned Similar Extensions, Markdownload and Obsidian WebClipper, have limitations with the `aside` tags and other `tooltip` related classes. But those elements are widely used in D&D Beyond, for example:

**Status**: Implemented with custom Turndown rules. Aside elements are converted to Markdown blockquotes, and tooltip links preserve their data-tooltip-href attributes.

<https://www.dndbeyond.com/sources/dnd/br-2024/playing-the-game>

```html
<aside class="text--rules-sidebar" id="RulesGlossary">
<p>Rules Glossary</p>
<p>If you read a rules term in this book and want to know its definition, consult the <a href="/sources/dnd/br-2024/rules-glossary">Rules Glossary</a>. This chapter provides an overview of how to play D&amp;D and focuses on the big picture. Many places in this chapter reference that glossary.</p>
</aside>
```

<https://www.dndbeyond.com/sources/dnd/br-2024/character-origins#Acolyte>

```html
<p data-content-chunk-id="c6cbca43-e6a4-44d5-bee1-1961baa77dd2"><strong>Skill Proficiencies:</strong> <a class="tooltip-hover skill-tooltip" href="/sources/dnd/free-rules/playing-the-game#Skills" data-tooltip-href="//www.dndbeyond.com/skills/12-tooltip?disable-webm=1&amp;disable-webm=1">Insight</a> and <a class="tooltip-hover skill-tooltip" href="/sources/dnd/free-rules/playing-the-game#Skills" data-tooltip-href="//www.dndbeyond.com/skills/10-tooltip?disable-webm=1&amp;disable-webm=1">Religion</a></p>
```

## Technical Requirements

- TypeScript
- NPM
