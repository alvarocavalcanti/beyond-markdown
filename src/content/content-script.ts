import browser from 'webextension-polyfill';
import { MESSAGE_TYPES } from '../constants/messages';

browser.runtime.onMessage.addListener((message: any) => {
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
