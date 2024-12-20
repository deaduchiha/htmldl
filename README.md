# htmldl

`htmldl` is a lightweight and customizable utility for exporting DOM nodes as images (PNG, JPEG, or SVG) in React applications. It is built on top of the `html-to-image` library, providing an easy-to-use API to generate high-quality images from any HTML content.

---

## Installation

Install the package using npm or yarn:

```bash
npm install htmldl
```

or

```bash
bun add htmldl
```

---

## Features

- 🌟 **Multi-Format Support**: Export DOM nodes as PNG, JPEG, or SVG.
- 🖼️ **Custom Quality and Scale**: Adjust image resolution and quality to your needs.
- 🎨 **Background Color Support**: Add custom backgrounds to your exports.
- 📂 **Customizable File Names**: Specify the name of the downloaded image file.
- 🔄 **Callbacks**: Optional hooks for handling download completion or errors.
- 🚀 **Easy to Use**: Seamless integration with React and modern browsers.

---

## Example Usage

### Code Example

Below is an example of how you can use `htmldl` in your React project:

```tsx
import { useCallback, useRef } from "react";
import { downloadNodeAsImage } from "htmldl";

function App() {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!printRef.current) return;

    await downloadNodeAsImage(printRef.current, {
      fileName: "example-download",
      format: "jpeg",
      quality: 0.9,
      scale: 2,
      backgroundColor: "#ffffff",
      onDownloadComplete: () => alert("Download complete!"),
      onError: (error) => console.error("Download failed:", error),
    });
  }, []);

  return (
    <main>
      <div>
        <div ref={printRef}>
          <h1>htmldl Example</h1>
          <p>
            Export this content as an image by clicking the download button
            below.
          </p>
        </div>
      </div>

      <button onClick={handleDownload}>Download as Image</button>
    </main>
  );
}

export default App;
```

---

## API

### `downloadNodeAsImage(node: HTMLElement, options?: ExportOptions): Promise<void>`

Converts a DOM node to an image and triggers a download.

#### Parameters:

1. **`node`** (required): The DOM element you want to capture.
2. **`options`** (optional): An object to customize the export process.

---

### Options

| Option               | Type                       | Default      | Description                                         |
| -------------------- | -------------------------- | ------------ | --------------------------------------------------- |
| `fileName`           | `string`                   | `"download"` | Name of the downloaded file.                        |
| `format`             | `"png" \| "jpeg" \| "svg"` | `"png"`      | Format of the downloaded image.                     |
| `quality`            | `number`                   | `1`          | JPEG quality (0 to 1).                              |
| `scale`              | `number`                   | `1`          | Scale factor for resolution.                        |
| `backgroundColor`    | `string`                   | `undefined`  | Background color for the image (e.g., `"#ffffff"`). |
| `onDownloadComplete` | `() => void`               | `undefined`  | Callback executed after the download completes.     |
| `onError`            | `(error: Error) => void`   | `undefined`  | Custom error handler, invoked when an error occurs. |

---

### Example with Custom Options

```tsx
await downloadNodeAsImage(printRef.current, {
  fileName: "custom-image",
  format: "svg",
  scale: 3,
  backgroundColor: "#ff0000",
  onDownloadComplete: () => console.log("Export complete!"),
  onError: (err) => console.error("Export failed:", err),
});
```

---

## Under the Hood

`htmldl` uses the following utility methods from `html-to-image` to generate images:

- **`toPng`**: Converts a node to a PNG image.
- **`toJpeg`**: Converts a node to a JPEG image.
- **`toSvg`**: Converts a node to an SVG image.

The `triggerDownload` function automatically creates a download link for the generated image.

---

## Requirements

- **React**: Version `16.8+` (requires hooks support).
- Works seamlessly in modern browsers.

---

## Contributing

We welcome contributions! If you encounter any issues or have ideas for improvements, feel free to open an issue or submit a pull request.

---

Start using `htmldl` today and make exporting your DOM content as images a breeze! 🎉
