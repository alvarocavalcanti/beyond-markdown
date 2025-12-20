export interface ImageInfo {
  originalSrc: string;
  filename: string;
  blob?: Blob;
}

export async function extractImages(html: string): Promise<ImageInfo[]> {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const images = doc.querySelectorAll('img');
  const imageInfos: ImageInfo[] = [];

  images.forEach((img, index) => {
    const src = img.src || img.getAttribute('src') || '';
    if (src && !src.startsWith('data:')) {
      const filename = getFilenameFromUrl(src, index);
      imageInfos.push({
        originalSrc: src,
        filename,
      });
    }
  });

  return imageInfos;
}

export async function downloadImages(images: ImageInfo[]): Promise<ImageInfo[]> {
  const downloadPromises = images.map(async (imageInfo) => {
    try {
      const response = await fetch(imageInfo.originalSrc);
      const blob = await response.blob();
      return { ...imageInfo, blob };
    } catch (error) {
      console.error(`Failed to download image: ${imageInfo.originalSrc}`, error);
      return imageInfo;
    }
  });

  return Promise.all(downloadPromises);
}

export function rewriteImageLinks(
  markdown: string,
  images: ImageInfo[],
  syntax: 'standard' | 'obsidian',
  downloadImages: boolean
): string {
  let result = markdown;

  images.forEach((imageInfo) => {
    const newSrc = downloadImages ? imageInfo.filename : imageInfo.originalSrc;

    const standardPattern = new RegExp(`!\\[([^\\]]*)\\]\\(${escapeRegex(imageInfo.originalSrc)}[^)]*\\)`, 'g');

    if (syntax === 'obsidian' && downloadImages) {
      result = result.replace(standardPattern, `![[${newSrc}]]`);
    } else {
      result = result.replace(standardPattern, `![$1](${newSrc})`);
    }
  });

  return result;
}

function getFilenameFromUrl(url: string, index: number): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.split('/').pop() || `image-${index}`;
    return filename.replace(/[^a-z0-9.-]/gi, '-');
  } catch {
    return `image-${index}.png`;
  }
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
