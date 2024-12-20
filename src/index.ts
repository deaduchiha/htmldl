import { toPng } from "html-to-image";

/**
 * Converts a given DOM node into a PNG and triggers a download.
 *
 * @param node The DOM node you want to capture.
 * @param fileName The file name for the downloaded PNG (default: 'download.png').
 */
export async function downloadNodeAsPng(
  node: HTMLElement,
  fileName: string = "download.png"
): Promise<void> {
  try {
    const dataUrl = await toPng(node);
    triggerDownload(dataUrl, fileName);
  } catch (error) {
    console.error("Error generating PNG:", error);
  }
}

function triggerDownload(dataUrl: string, fileName: string): void {
  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}
