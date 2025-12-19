import browser from 'webextension-polyfill';

export interface Settings {
  savePath: string;
  downloadImages: boolean;
  imageSyntax: 'standard' | 'obsidian';
}

const DEFAULT_SETTINGS: Settings = {
  savePath: '',
  downloadImages: false,
  imageSyntax: 'standard',
};

export async function getSettings(): Promise<Settings> {
  const result = await browser.storage.local.get('settings');
  return { ...DEFAULT_SETTINGS, ...result.settings };
}

export async function saveSettings(settings: Partial<Settings>): Promise<void> {
  const current = await getSettings();
  const updated = { ...current, ...settings };
  await browser.storage.local.set({ settings: updated });
}

export async function resetSettings(): Promise<void> {
  await browser.storage.local.set({ settings: DEFAULT_SETTINGS });
}
