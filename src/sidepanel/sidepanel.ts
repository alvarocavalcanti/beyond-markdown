import browser from 'webextension-polyfill';
import { convertHtmlToMarkdown } from '../utils/markdown-converter';

const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
const saveBtn = document.getElementById('save-btn') as HTMLButtonElement;
const downloadImagesCheckbox = document.getElementById('download-images') as HTMLInputElement;
const imageSyntaxGroup = document.getElementById('image-syntax-group') as HTMLDivElement;
const markdownPreview = document.getElementById('markdown-preview') as HTMLDivElement;
const savePathInput = document.getElementById('save-path') as HTMLInputElement;

let currentMarkdown = '';

downloadImagesCheckbox.addEventListener('change', () => {
  imageSyntaxGroup.style.display = downloadImagesCheckbox.checked ? 'block' : 'none';
});

generateBtn.addEventListener('click', async () => {
  try {
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';

    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];

    if (!activeTab.id) {
      throw new Error('No active tab found');
    }

    const response = await browser.runtime.sendMessage({
      type: 'GET_PAGE_CONTENT',
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

saveBtn.addEventListener('click', async () => {
  if (!currentMarkdown) return;

  try {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];

    const filename = `${sanitizeFilename(activeTab.title || 'export')}.md`;
    const blob = new Blob([currentMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);

    await browser.downloads.download({
      url,
      filename: savePathInput.value ? `${savePathInput.value}/${filename}` : filename,
      saveAs: false,
    });

    URL.revokeObjectURL(url);
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
