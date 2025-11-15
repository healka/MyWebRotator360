# 360° Image Rotator

A smooth, interactive 360-degree image rotator that creates the illusion of 3D rotation by switching between pre-rendered images from different angles. Perfect for product showcases on e-commerce websites.

## Features

- 🖱️ **Mouse Drag Support** - Click and drag to rotate on desktop
- 📱 **Touch/Swipe Support** - Swipe to rotate on mobile devices
- 🎯 **Smooth Rotation** - Seamless transitions between frames
- ⚡ **Image Preloading** - All images preload for instant rotation
- 🎨 **Customizable** - Easy to customize appearance and behavior
- 📦 **Squarespace Ready** - Easy to embed on Squarespace websites

## How It Works

The rotator uses multiple pre-rendered images of your product from different angles (typically 36 or 72 images for a full 360° rotation). As the user drags or swipes, the script calculates which image to display based on the drag distance, creating a smooth rotation effect.

## Image Requirements

1. **Number of Images**: Typically 36 images (10° per image) or 72 images (5° per image) for smoother rotation
2. **Naming Convention**: Images must be named sequentially. Supported formats:
   - `product_001.jpg`, `product_002.jpg`, `product_003.jpg`, etc. (with underscore)
   - `00000.png`, `00001.png`, `00002.png`, etc. (without underscore, 5-digit padding)
   - `chair_01.jpg`, `chair_02.jpg`, etc. (2-digit padding)
   - Any sequential naming pattern - just configure `startFrame`, `framePadding`, and `useUnderscore`
3. **Image Format**: JPG, PNG, or WebP
4. **Consistent Angles**: Images should be evenly spaced around the product (same camera distance, lighting, etc.)

## Quick Start

### 1. Prepare Your Images

Organize your images in a folder with sequential naming:
```
images/
  ├── chair_001.jpg
  ├── chair_002.jpg
  ├── chair_003.jpg
  └── ... (up to chair_036.jpg for 36 images)
```

### 2. Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="rotator360" class="rotator-360">
        <img id="rotatorImage" src="" alt="360 Product View">
        <div class="rotator-overlay">
            <div class="loading-indicator">Loading...</div>
        </div>
    </div>

    <script src="rotator.js"></script>
    <script>
        // Example 1: For images named chair_001.jpg, chair_002.jpg, etc.
        const rotator = new Rotator360({
            containerId: 'rotator360',
            imagePath: 'images/chair',      // Base path (without frame number)
            imageFormat: 'jpg',              // Image format
            totalFrames: 36,                 // Number of images
            startFrame: 1,                  // Starting frame
            framePadding: 3,                // Number of digits (3 = 001, 002, etc.)
            useUnderscore: true             // Use underscore: chair_001.jpg
        });
        
        // Example 2: For images named 00000.png, 00001.png, etc.
        // const rotator = new Rotator360({
        //     containerId: 'rotator360',
        //     imagePath: 'images/',          // Base path
        //     imageFormat: 'png',
        //     totalFrames: 36,
        //     startFrame: 0,                 // Start at 0
        //     framePadding: 5,               // 5 digits: 00000, 00001, etc.
        //     useUnderscore: false           // No underscore: 00000.png
        // });
    </script>
</body>
</html>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerId` | string | `'rotator360'` | ID of the container element |
| `imagePath` | string | `'images/product'` | Base path for images (without frame number) |
| `imageFormat` | string | `'jpg'` | Image file format (jpg, png, webp) |
| `totalFrames` | number | `36` | Total number of images |
| `startFrame` | number | `1` | Starting frame number (0 for 00000.png, 1 for 001.jpg) |
| `framePadding` | number | `3` | Number of digits in filename (3 = 001, 5 = 00000) |
| `useUnderscore` | boolean | `true` | Use underscore in filename (true for product_001.jpg, false for 00000.png) |
| `frameUrls` | string[] | `null` | Explicit URLs for each frame (use when files don’t share a base path) |
| `autoRotate` | boolean | `false` | Enable auto-rotation on load |
| `autoRotateSpeed` | number | `0.5` | Auto-rotation speed (0.1 - 2.0) |

## Embedding on Squarespace

### Method 1: Code Block (Recommended)

1. **Upload your images** to Squarespace:
   - Go to Settings → Files
   - Upload all your rotation images
   - Note the URL pattern (e.g., `https://yoursite.squarespace.com/s/chair_001.jpg`)

2. **Add a Code Block** to your page:
   - Edit your page
   - Add a Code Block
   - Paste the following code:

```html
<style>
    .rotator-360-embed {
        position: relative;
        width: 100%;
        padding-bottom: 75%;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        cursor: grab;
        user-select: none;
        touch-action: none;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    .rotator-360-embed:active { cursor: grabbing; }
    .rotator-360-embed img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        transition: opacity 0.1s ease;
    }
    .rotator-overlay-embed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.9);
        z-index: 10;
        transition: opacity 0.3s ease;
    }
    .rotator-overlay-embed.hidden {
        opacity: 0;
        pointer-events: none;
    }
    .loading-indicator-embed {
        font-size: 1.2em;
        color: #667eea;
        font-weight: 500;
    }
</style>

<div class="rotator-360-embed" id="rotator360-embed">
    <img id="rotatorImage-embed" src="" alt="360 Product View">
    <div class="rotator-overlay-embed">
        <div class="loading-indicator-embed">Loading...</div>
    </div>
</div>

<script>
    // Define window.ROTATOR_FRAME_URLS before the main script to use explicit URLs
    window.ROTATOR_FRAME_URLS = [
        'https://images.squarespace-cdn.com/content/....../00000.png?content-type=image%2Fpng',
        'https://images.squarespace-cdn.com/content/....../00001.png?content-type=image%2Fpng',
        // ... add all frames
    ];
</script>

<script>
    // Include the Rotator360Embed class script (see squarespace-ready.html for the latest version)
</script>
```

3. **Update the configuration** in the script:
   - If each image has a unique folder URL (common in Asset Library), paste the explicit URLs into `window.ROTATOR_FRAME_URLS`
   - If your images share a base path (e.g., hosted on a CDN), use the `imagePath` configuration instead
   - Adjust `totalFrames`, `framePadding`, `startFrame`, `useUnderscore` as needed

### Method 2: Custom CSS/JavaScript Injection

1. Go to **Settings → Advanced → Code Injection**
2. Add the CSS to **Header** and JavaScript to **Footer**
3. Add the HTML to your page using a Code Block

## Tips for Best Results

1. **Image Quality**: Use high-quality images (at least 1200px width recommended)
2. **Consistent Lighting**: Ensure all images have consistent lighting and exposure
3. **Even Spacing**: Images should be evenly spaced (every 10° for 36 images, every 5° for 72 images)
4. **File Size**: Optimize images for web (use tools like TinyPNG or ImageOptim)
5. **Aspect Ratio**: Keep all images the same aspect ratio
6. **Background**: Use transparent or consistent backgrounds for best results

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Adjust Rotation Sensitivity

In `rotator.js`, modify the sensitivity value in `handleMove()`:
```javascript
this.rotation += deltaX * 0.5; // Change 0.5 to adjust speed (higher = faster)
```

### Change Aspect Ratio

In `styles.css`, modify the `padding-bottom` value:
```css
.rotator-360 {
    padding-bottom: 75%; /* 75% = 4:3, 100% = 1:1, 56.25% = 16:9 */
}
```

### Custom Styling

All styles are in `styles.css`. Modify colors, borders, shadows, etc. to match your brand.

## Troubleshooting

**Images not loading:**
- Check image paths are correct
- Verify image naming or explicit URLs match your configuration
- Check browser console for errors

**Rotation feels choppy:**
- Reduce number of images or increase image quality
- Check image file sizes (smaller files load faster)
- Ensure images are preloaded

**Not working on mobile:**
- Verify touch events are enabled
- Check that `touch-action: none` is set in CSS

### Squarespace Asset Library – Bulk URL Export Helper

When Squarespace stores each image in a unique path, use this helper to copy all URLs quickly:

1. Open your Asset Library folder with the 360° images
2. Press **F12** (DevTools) → Console tab
3. Paste this snippet and press Enter:

```javascript
(async () => {
  const buttons = [...document.querySelectorAll('[data-clipboard-text]')];
  const urls = buttons
    .map(btn => btn.getAttribute('data-clipboard-text'))
    .filter(url => /\d{5}\.png/i.test(url))
    .sort((a, b) => a.localeCompare(b));
  const json = JSON.stringify(urls, null, 2);
  console.log(json);
  try {
    await navigator.clipboard.writeText(json);
    console.log('Copied to clipboard!');
  } catch (err) {
    console.warn('Copy to clipboard failed:', err);
  }
})();
```

4. Paste the copied array into `window.ROTATOR_FRAME_URLS` in the Squarespace code block (or into a JSON file)

> If the snippet finds no URLs, scroll through the folder so all items load and run it again.

## License

Free to use for personal and commercial projects.

## Credits

Inspired by Cylindo and other 360° product visualization tools.

