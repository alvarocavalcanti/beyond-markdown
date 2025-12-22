import browser from 'webextension-polyfill';
import { convertHtmlToMarkdown } from '../utils/markdown-converter';
import { MESSAGE_TYPES } from '../constants/messages';

const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
const saveBtn = document.getElementById('save-btn') as HTMLButtonElement;
const markdownPreview = document.getElementById('markdown-preview') as HTMLDivElement;

let currentMarkdown = '';

generateBtn.addEventListener('click', async () => {
  try {
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';

    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];

    if (!activeTab.id) {
      throw new Error('No active tab found');
    }

    const response = await browser.tabs.sendMessage(activeTab.id, {
      type: MESSAGE_TYPES.EXTRACT_CONTENT,
    }) as { html: string; title: string; url: string } | null;

    if (!response) {
      throw new Error('Failed to get page content');
    }

    currentMarkdown = convertHtmlToMarkdown(response.html, response.title, response.url);

    markdownPreview.textContent = currentMarkdown;
    markdownPreview.classList.remove('placeholder');
    saveBtn.disabled = false;

  } catch (error) {
    console.error('Error generating markdown:', error);
    markdownPreview.textContent = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    markdownPreview.classList.add('placeholder');
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = 'Generate';
  }
});

saveBtn.addEventListener('click', () => {
  if (!currentMarkdown) return;

  try {
    const tabs = browser.tabs.query({ active: true, currentWindow: true });
    tabs.then((tabArray) => {
      const activeTab = tabArray[0];
      const filename = `${sanitizeFilename(activeTab.title || 'export')}.md`;

      const blob = new Blob([currentMarkdown], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    });
  } catch (error) {
    console.error('Error saving markdown:', error);
    alert(`Error saving file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

console.log('Beyond Markdown sidepanel loaded');
