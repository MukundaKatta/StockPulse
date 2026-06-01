/**
 * Clipboard utility functions for reading and writing clipboard content.
 */

/** Read text from the clipboard. */
export async function readClipboard(): Promise<string> {
  if (!navigator.clipboard) {
    throw new Error('Clipboard API not available');
  }
  return navigator.clipboard.readText();
}

/** Write text to the clipboard. */
export async function writeClipboard(text: string): Promise<void> {
  if (!navigator.clipboard) {
    throw new Error('Clipboard API not available');
  }
  await navigator.clipboard.writeText(text);
}

/** Copy an image blob to the clipboard. */
export async function copyImageToClipboard(
  imageBlob: Blob
): Promise<void> {
  if (!navigator.clipboard) {
    throw new Error('Clipboard API not available');
  }

  const pngBlob =
    imageBlob.type === 'image/png'
      ? imageBlob
      : await convertToPng(imageBlob);

  const clipboardItem = new ClipboardItem({
    'image/png': pngBlob,
  });

  await navigator.clipboard.write([clipboardItem]);
}

async function convertToPng(blob: Blob): Promise<Blob> {
  const imageBitmap = await createImageBitmap(blob);
  const canvas = document.createElement('canvas');
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2d context');
  ctx.drawImage(imageBitmap, 0, 0);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) resolve(result);
      else reject(new Error('Failed to convert image to PNG'));
    }, 'image/png');
  });
}
