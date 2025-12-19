import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener((message: any) => {
  if (message.type === 'EXTRACT_CONTENT') {
    return Promise.resolve(extractPageContent());
  }
  return false;
});

function extractPageContent() {
  const articleContent = document.querySelector('article, main, .content, .article-content');

  if (!articleContent) {
    return {
      html: document.body.innerHTML,
      title: document.title,
      url: window.location.href,
    };
  }

  return {
    html: articleContent.innerHTML,
    title: document.title,
    url: window.location.href,
  };
}

console.log('Beyond Markdown content script loaded');
