import TurndownService from 'turndown';

export function createMarkdownConverter(): TurndownService {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
    strongDelimiter: '**',
  });

  addAsideRule(turndownService);
  addTooltipRule(turndownService);
  addDataAttributeRule(turndownService);

  return turndownService;
}

function addAsideRule(turndownService: TurndownService) {
  turndownService.addRule('aside', {
    filter: 'aside',
    replacement(content, node) {
      const element = node as HTMLElement;
      const className = element.className || '';

      let prefix = '> ';
      let header = '';

      if (className.includes('rules-sidebar')) {
        header = '**Rules Sidebar**\n\n';
      } else if (className.includes('note')) {
        header = '**Note**\n\n';
      }

      const lines = content.trim().split('\n');
      const quotedLines = lines.map(line => `${prefix}${line}`).join('\n');

      return `\n\n${prefix}${header}${quotedLines}\n\n`;
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
      const tooltipHref = element.getAttribute('data-tooltip-href');

      if (tooltipHref) {
        return `[${content}](${href} "${tooltipHref}")`;
      }

      return `[${content}](${href})`;
    },
  });
}

function addDataAttributeRule(turndownService: TurndownService) {
  turndownService.addRule('dataAttributes', {
    filter: (node) => {
      if (node.nodeType !== 1) return false;
      const element = node as HTMLElement;
      return element.hasAttribute('data-content-chunk-id');
    },
    replacement(content, node) {
      const element = node as HTMLElement;
      const chunkId = element.getAttribute('data-content-chunk-id');

      if (chunkId && content.trim()) {
        return `${content} <!-- chunk-id: ${chunkId} -->`;
      }

      return content;
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
