import { toPng, toJpeg, toSvg } from "html-to-image";

export interface ExportOptions {
  fileName?: string;
  format?: "png" | "jpeg" | "svg";
  quality?: number; // JPEG quality (0 to 1)
  scale?: number; // Resolution scale factor
  backgroundColor?: string; // Background color for the image
  onDownloadComplete?: () => void; // Callback after download
  onError?: (error: Error) => void; // Custom error handler
}

/**
 * Converts a DOM node into an image (PNG, JPEG, or SVG) and triggers a download.
 *
 * @param node The DOM node to capture.
 * @param options Options for the export.
 */
export async function downloadNodeAsImage(
  node: HTMLElement,
  options: ExportOptions = {}
): Promise<void> {
  const {
    fileName = "download",
    format = "png",
    quality = 1,
    scale = 1,
    backgroundColor,
    onDownloadComplete,
    onError,
  } = options;

  try {
    let dataUrl: string;

    const exportOptions = {
      pixelRatio: scale,
      quality,
      backgroundColor,
    };

    // Generate image based on the format
    if (format === "jpeg") {
      dataUrl = await toJpeg(node, exportOptions);
    } else if (format === "svg") {
      dataUrl = await toSvg(node, exportOptions);
    } else {
      dataUrl = await toPng(node, exportOptions);
    }

    // Trigger download
    triggerDownload(dataUrl, `${fileName}.${format}`);
    onDownloadComplete?.();
  } catch (error) {
    console.error("Error generating image:", error);
    onError?.(error as Error);
  }
}

function triggerDownload(dataUrl: string, fileName: string): void {
  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}
