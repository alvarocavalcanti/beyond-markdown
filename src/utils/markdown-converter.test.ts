import { describe, it, expect } from 'vitest';
import { convertHtmlToMarkdown } from './markdown-converter';

describe('markdown-converter', () => {
  describe('table conversion', () => {
    it('should convert HTML tables to markdown tables', () => {
      const html = `
        <table>
          <thead>
            <tr>
              <th>Ability</th>
              <th>Score Measures...</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Strength</td>
              <td>Physical might</td>
            </tr>
            <tr>
              <td>Dexterity</td>
              <td>Agility, reflexes, and balance</td>
            </tr>
          </tbody>
        </table>
      `;

      const result = convertHtmlToMarkdown(html);

      expect(result).toContain('| Ability');
      expect(result).toContain('| Score Measures...');
      expect(result).toContain('| Strength');
      expect(result).toContain('| Physical might');
      expect(result).toContain('| Dexterity');
      expect(result).toContain('|');
      expect(result).toContain('---');
    });
  });

  describe('aside conversion', () => {
    it('should convert aside elements to blockquotes', () => {
      const html = `
        <aside class="text--rules-sidebar">
          <p>Rules Glossary</p>
          <p>This is important information.</p>
        </aside>
      `;

      const result = convertHtmlToMarkdown(html);

      expect(result).toContain('> Rules Glossary');
      expect(result).toContain('> This is important information');
    });

    it('should convert D&D Beyond rules sidebar from requirements', () => {
      const html = `
        <aside class="text--rules-sidebar" id="RulesGlossary">
          <p>Rules Glossary</p>
          <p>If you read a rules term in this book and want to know its definition, consult the <a href="/sources/dnd/br-2024/rules-glossary">Rules Glossary</a>. This chapter provides an overview of how to play D&D and focuses on the big picture. Many places in this chapter reference that glossary.</p>
        </aside>
      `;

      const result = convertHtmlToMarkdown(html);

      expect(result).toContain('> Rules Glossary');
      expect(result).toContain('> If you read a rules term');
      expect(result).toContain('[Rules Glossary](/sources/dnd/br-2024/rules-glossary)');
    });

    it('should handle aside with multiple paragraphs', () => {
      const html = `
        <aside class="note">
          <p>Important Note</p>
          <p>First paragraph of content.</p>
          <p>Second paragraph of content.</p>
        </aside>
      `;

      const result = convertHtmlToMarkdown(html);

      expect(result).toContain('> Important Note');
      expect(result).toContain('> First paragraph');
      expect(result).toContain('> Second paragraph');
    });

    it('should handle nested elements within aside', () => {
      const html = `
        <aside>
          <p><strong>Bold text</strong> and <em>italic text</em></p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
          </ul>
        </aside>
      `;

      const result = convertHtmlToMarkdown(html);

      expect(result).toContain('> **Bold text**');
      expect(result).toContain('*italic text*');
      expect(result).toContain('List item');
    });
  });

  describe('tooltip link conversion', () => {
    it('should preserve tooltip data attributes in links', () => {
      const html = `
        <a class="tooltip-hover" href="/skills" data-tooltip-href="//www.dndbeyond.com/skills/12-tooltip">Insight</a>
      `;

      const result = convertHtmlToMarkdown(html);

      expect(result).toContain('[Insight](/skills');
      expect(result).toContain('//www.dndbeyond.com/skills/12-tooltip');
    });

    it('should convert D&D Beyond skill tooltip from requirements', () => {
      const html = `
        <p data-content-chunk-id="c6cbca43-e6a4-44d5-bee1-1961baa77dd2">
          <strong>Skill Proficiencies:</strong>
          <a class="tooltip-hover skill-tooltip" href="/sources/dnd/free-rules/playing-the-game#Skills" data-tooltip-href="//www.dndbeyond.com/skills/12-tooltip?disable-webm=1&disable-webm=1">Insight</a>
          and
          <a class="tooltip-hover skill-tooltip" href="/sources/dnd/free-rules/playing-the-game#Skills" data-tooltip-href="//www.dndbeyond.com/skills/10-tooltip?disable-webm=1&disable-webm=1">Religion</a>
        </p>
      `;

      const result = convertHtmlToMarkdown(html);

      expect(result).toContain('**Skill Proficiencies:**');
      expect(result).toContain('[Insight](/sources/dnd/free-rules/playing-the-game#Skills "//www.dndbeyond.com/skills/12-tooltip?disable-webm=1&disable-webm=1")');
      expect(result).toContain('[Religion](/sources/dnd/free-rules/playing-the-game#Skills "//www.dndbeyond.com/skills/10-tooltip?disable-webm=1&disable-webm=1")');
    });

    it('should handle tooltip-hover links without data-tooltip-href', () => {
      const html = `<a class="tooltip-hover" href="/test">Link</a>`;

      const result = convertHtmlToMarkdown(html);

      expect(result).toBe('[Link](/test)');
    });

    it('should handle regular links normally', () => {
      const html = `<a href="/test">Regular Link</a>`;

      const result = convertHtmlToMarkdown(html);

      expect(result).toBe('[Regular Link](/test)');
    });

    it('should preserve multiple tooltip links in same paragraph', () => {
      const html = `
        <p>
          You have
          <a class="tooltip-hover" href="#Skills" data-tooltip-href="/tooltip/acrobatics">Acrobatics</a>
          and
          <a class="tooltip-hover" href="#Skills" data-tooltip-href="/tooltip/athletics">Athletics</a>
          proficiency.
        </p>
      `;

      const result = convertHtmlToMarkdown(html);

      expect(result).toContain('[Acrobatics](#Skills "/tooltip/acrobatics")');
      expect(result).toContain('[Athletics](#Skills "/tooltip/athletics")');
    });
  });

  describe('heading anchor conversion', () => {
    it('should remove anchor links from headings', () => {
      const html = `
        <h2><a href="#Proficiency"></a>Proficiency</h2>
      `;

      const result = convertHtmlToMarkdown(html);

      expect(result).toContain('## Proficiency');
      expect(result).not.toContain('[](#Proficiency)');
    });
  });

  describe('navigation removal', () => {
    it('should remove nav elements', () => {
      const html = `
        <nav>
          <a href="/home">Home</a>
          <a href="/about">About</a>
        </nav>
        <p>Main content</p>
      `;

      const result = convertHtmlToMarkdown(html);

      expect(result).not.toContain('Home');
      expect(result).not.toContain('About');
      expect(result).toContain('Main content');
    });

    it('should remove breadcrumb elements', () => {
      const html = `
        <div class="breadcrumb">
          <a href="/parent">Parent</a>
        </div>
        <p>Main content</p>
      `;

      const result = convertHtmlToMarkdown(html);

      expect(result).not.toContain('Parent');
      expect(result).toContain('Main content');
    });
  });

  describe('title and URL', () => {
    it('should add title as H1 when provided', () => {
      const html = '<p>Content</p>';
      const result = convertHtmlToMarkdown(html, 'Test Title');

      expect(result).toMatch(/^# Test Title/);
    });

    it('should add source URL when provided', () => {
      const html = '<p>Content</p>';
      const result = convertHtmlToMarkdown(html, undefined, 'https://example.com');

      expect(result).toContain('*Source: https://example.com*');
    });

    it('should add both title and URL', () => {
      const html = '<p>Content</p>';
      const result = convertHtmlToMarkdown(html, 'Test Title', 'https://example.com');

      expect(result).toMatch(/^# Test Title/);
      expect(result).toContain('*Source: https://example.com*');
    });
  });
});
