import browser from 'webextension-polyfill';

browser.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;

  if ('sidePanel' in browser) {
    await (browser as any).sidePanel.open({ windowId: tab.windowId });
  }
});

browser.runtime.onMessage.addListener((message: any, sender: any) => {
  if (message.type === 'GET_PAGE_CONTENT') {
    return handleGetPageContent(sender.tab?.id);
  }
  return false;
});

async function handleGetPageContent(tabId: number | undefined) {
  if (!tabId) return null;

  const response = await browser.tabs.sendMessage(tabId, {
    type: 'EXTRACT_CONTENT',
  });

  return response;
}

console.log('Beyond Markdown background service worker loaded');
