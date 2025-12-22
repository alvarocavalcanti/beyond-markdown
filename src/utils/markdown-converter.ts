import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

export function createMarkdownConverter(): TurndownService {
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

export function convertHtmlToMarkdown(html: string, title?: string, url?: string): string {
  const converter = createMarkdownConverter();
  let markdown = converter.turndown(html);

  if (title) {
    markdown = `# ${title}\n\n${markdown}`;
  }

  if (url) {
    markdown = `${markdown}\n\n---\n\n*Source: ${url}*`;
  }

  return markdown.trim();
}
