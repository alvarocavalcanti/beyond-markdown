import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

export type LinkStyle = 'absolute' | 'keep' | 'remove';

export interface ConversionOptions {
  linkStyle?: LinkStyle;
}

export function createMarkdownConverter(options: ConversionOptions = {}): TurndownService {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
    strongDelimiter: '**',
  });

  turndownService.use(gfm);

  addAsideRule(turndownService);
  addTooltipRule(turndownService);
  addExternalLinkRule(turndownService, options.linkStyle ?? 'absolute');
  addListItemRule(turndownService);
  addRemoveNavigationRule(turndownService);
  addHeadingAnchorRule(turndownService);

  return turndownService;
}

function addAsideRule(turndownService: TurndownService) {
  turndownService.addRule('aside', {
    filter: 'aside',
    replacement(content) {
      const prefix = '> ';
      const lines = content.trim().split('\n');
      const quotedLines = lines.map(line => `${prefix}${line}`).join('\n');

      return `\n\n${quotedLines}\n\n`;
    },
  });
}

function addTooltipRule(turndownService: TurndownService) {
  turndownService.addRule('tooltip', {
    filter: (node) => {
      if (node.nodeName !== 'A') return false;
      const element = node as HTMLElement;
      return element.classList.contains('tooltip-hover');
    },
    replacement(content, node) {
      const element = node as HTMLAnchorElement;
      const href = element.getAttribute('href') || '';
      const tooltipHref = element.dataset.tooltipHref;

      if (tooltipHref) {
        return `[${content}](${href} "${tooltipHref}")`;
      }

      return `[${content}](${href})`;
    },
  });
}

function addRemoveNavigationRule(turndownService: TurndownService) {
  turndownService.addRule('removeNavigation', {
    filter: (node) => {
      if (node.nodeType !== 1) return false;
      const element = node as HTMLElement;

      const isNav = node.nodeName === 'NAV';
      const isBreadcrumb = element.getAttribute('role') === 'navigation';
      const hasNavClass = !!(element.className && (
        element.className.includes('breadcrumb') ||
        element.className.includes('navigation') ||
        element.className.includes('nav-')
      ));

      return isNav || isBreadcrumb || hasNavClass;
    },
    replacement() {
      return '';
    },
  });
}

function addExternalLinkRule(turndownService: TurndownService, linkStyle: LinkStyle) {
  if (linkStyle === 'keep') return;

  turndownService.addRule('externalLink', {
    filter: (node) => {
      if (node.nodeName !== 'A') return false;
      const element = node as HTMLAnchorElement;
      if (element.classList.contains('tooltip-hover')) return false;
      const href = element.getAttribute('href') || '';
      if (linkStyle === 'remove') return href.startsWith('/') || href.startsWith('http');
      return href.startsWith('/');
    },
    replacement(content, node) {
      if (linkStyle === 'remove') return content;

      const element = node as HTMLAnchorElement;
      const href = element.getAttribute('href') || '';
      return `[${content}](https://www.dndbeyond.com${href})`;
    },
  });
}

function addListItemRule(turndownService: TurndownService) {
  turndownService.addRule('listItem', {
    filter: 'li',
    replacement(content, node, options) {
      const cleaned = content
        .replace(/^\n+/, '')
        .replace(/\n+$/, '\n')
        .replace(/\n/gm, '\n    ')
        .trimStart();

      const parent = node.parentNode as HTMLElement;
      let prefix = `${options.bulletListMarker} `;

      if (parent?.nodeName === 'OL') {
        const start = parent.getAttribute('start');
        const index = Array.prototype.indexOf.call(parent.children, node);
        prefix = `${start ? Number(start) + index : index + 1}. `;
      }

      return prefix + cleaned + (node.nextSibling && !/\n$/.test(cleaned) ? '\n' : '');
    },
  });
}

function addHeadingAnchorRule(turndownService: TurndownService) {
  turndownService.addRule('headingAnchors', {
    filter: (node) => {
      if (!['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(node.nodeName)) return false;
      const element = node as HTMLElement;
      const firstChild = element.firstChild;
      return !!(firstChild?.nodeName === 'A' && (firstChild as HTMLAnchorElement).getAttribute('href')?.startsWith('#'));
    },
    replacement(content, node) {
      const element = node as HTMLElement;
      const level = Number.parseInt(node.nodeName.charAt(1));
      const hashes = '#'.repeat(level);

      const text = element.textContent || '';
      return `\n\n${hashes} ${text}\n\n`;
    },
  });
}

export function convertHtmlToMarkdown(html: string, title?: string, url?: string, options?: ConversionOptions): string {
  const converter = createMarkdownConverter(options);
  let markdown = converter.turndown(html);

  if (title) {
    markdown = `# ${title}\n\n${markdown}`;
  }

  if (url) {
    markdown = `${markdown}\n\n---\n\n*Source: ${url}*`;
  }

  return markdown.trim();
}
