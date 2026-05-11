import browser from 'webextension-polyfill';
import { MESSAGE_TYPES } from '../constants/messages';

browser.runtime.onMessage.addListener((message: { type: string }) => {
  if (message.type === MESSAGE_TYPES.EXTRACT_CONTENT) {
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
      url: globalThis.location.href,
    };
  }

  return {
    html: articleContent.innerHTML,
    title: document.title,
    url: globalThis.location.href,
  };
}

console.log('Beyond Markdown content script loaded');
