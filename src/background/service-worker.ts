import browser from 'webextension-polyfill';

browser.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;

  await browser.sidePanel.open({ windowId: tab.windowId });
});

browser.runtime.onMessage.addListener((message, sender) => {
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
