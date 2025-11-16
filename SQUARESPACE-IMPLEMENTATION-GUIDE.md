# Complete Squarespace Implementation Guide

## 🎯 Quick Start (3 Methods)

Choose the method that works best for your situation:

- **Method 1**: Images uploaded to Squarespace (same URL pattern)
- **Method 2**: Images in Squarespace Asset Library (unique URLs each)
- **Method 3**: Images hosted externally (CDN, GitHub, etc.)

---

## Method 1: Images on Squarespace (Same URL Pattern)

**Best for:** Images uploaded to Squarespace that share a common URL pattern

### Step 1: Upload Your Images

1. Log into Squarespace
2. Go to **Settings → Files**
3. Upload all your 360° images (e.g., `00000.png`, `00001.png`, ... `00035.png`)
4. After uploading, click on **one image** to see its URL
5. The URL will look like: `https://yoursite.squarespace.com/s/00000.png`
6. **Copy the base URL** (everything before the filename): `https://yoursite.squarespace.com/s/`

### Step 2: Get the Code

1. Open `squarespace-ready.html` in your project
2. Copy the **entire content** of the file

### Step 3: Configure the Code

Find this section in the code (around line 236-247):

```javascript
window.rotator360 = new Rotator360Embed({
    containerId: 'rotator360-embed',
    
    // CHANGE THESE VALUES:
    imagePath: 'https://yoursite.squarespace.com/s/',  // ← Your base URL here
    imageFormat: 'png',                                 // ← jpg, png, or webp
    totalFrames: 36,                                    // ← Number of images
    startFrame: 0,                                      // ← 0 for 00000, 1 for 001
    framePadding: 5,                                    // ← 5 for 00000, 3 for 001
    useUnderscore: false                                // ← false for 00000.png, true for product_001.jpg
});
```

**Update these values:**
- `imagePath`: Your Squarespace base URL
- `imageFormat`: Your image format (png, jpg, webp)
- `totalFrames`: Number of images you have
- `startFrame`: Starting number (0 for 00000, 1 for 001)
- `framePadding`: Number of digits (5 for 00000, 3 for 001)
- `useUnderscore`: `false` for `00000.png`, `true` for `product_001.jpg`

### Step 4: Add to Squarespace

1. Edit the page where you want the rotator
2. Click **Add Block** → **Code**
3. Paste the entire code (with your configuration)
4. Click **Save**
5. Preview your page

---

## Method 2: Squarespace Asset Library (Unique URLs)

**Best for:** When each image has a completely different URL path

### Step 1: Upload Images to Squarespace

1. Go to **Settings → Files**
2. Upload all your 360° images
3. **Important:** Keep them in the same folder if possible

### Step 2: Get All Image URLs

#### Option A: Manual Method
1. Click on each image in Squarespace
2. Copy its URL
3. Paste into an array (see Step 3)

#### Option B: Bulk Copy Method (Recommended)
1. Open your Asset Library folder with all images
2. Press **F12** to open Developer Tools
3. Go to the **Console** tab
4. Paste this script and press Enter:

```javascript
(async () => {
  const buttons = [...document.querySelectorAll('[data-clipboard-text]')];
  const urls = buttons
    .map(btn => btn.getAttribute('data-clipboard-text'))
    .filter(url => /\d{5}\.png/i.test(url) || /\d{3}\.jpg/i.test(url)) // Adjust regex for your naming
    .sort((a, b) => a.localeCompare(b));
  const json = JSON.stringify(urls, null, 2);
  console.log(json);
  try {
    await navigator.clipboard.writeText(json);
    console.log('✅ Copied to clipboard!');
  } catch (err) {
    console.warn('Copy failed:', err);
  }
})();
```

5. The URLs will be copied to your clipboard as a JSON array

### Step 3: Configure with Explicit URLs

Open `squarespace-ready.html` and find the configuration section. Replace it with:

```javascript
window.rotator360 = new Rotator360Embed({
    containerId: 'rotator360-embed',
    
    // Use explicit URLs instead of imagePath
    frameUrls: [
        'https://images.squarespace-cdn.com/content/.../00000.png?content-type=image%2Fpng',
        'https://images.squarespace-cdn.com/content/.../00001.png?content-type=image%2Fpng',
        'https://images.squarespace-cdn.com/content/.../00002.png?content-type=image%2Fpng',
        // ... paste all your URLs here in order
        'https://images.squarespace-cdn.com/content/.../00035.png?content-type=image%2Fpng'
    ],
    
    // Optional: specify totalFrames (will auto-detect from frameUrls length)
    totalFrames: 36,
    startFrame: 0
});
```

**Important:** Make sure URLs are in the correct order (00000, 00001, 00002, etc.)

### Step 4: Add to Squarespace

1. Edit your page
2. Add a **Code Block**
3. Paste the entire code
4. Save and preview

---

## Method 3: External Hosting (CDN, GitHub, etc.)

**Best for:** Images hosted on GitHub, CDN, or external server

### Step 1: Host Your Images

Upload your images to:
- **GitHub** (free, use jsDelivr CDN)
- **Cloudinary** (free tier available)
- **AWS S3** or other CDN
- Any web server

### Step 2: Get the Base URL

For GitHub + jsDelivr:
- Upload images to a GitHub repository
- Base URL format: `https://cdn.jsdelivr.net/gh/USERNAME/REPO@main/FOLDER/`
- Example: `https://cdn.jsdelivr.net/gh/healka/rotator-assets@main/AspenTest/`

### Step 3: Configure

Open `squarespace-ready.html` and update:

```javascript
window.rotator360 = new Rotator360Embed({
    containerId: 'rotator360-embed',
    
    imagePath: 'https://cdn.jsdelivr.net/gh/yourusername/yourrepo@main/foldername/',
    imageFormat: 'png',
    totalFrames: 36,
    startFrame: 0,
    framePadding: 5,
    useUnderscore: false
});
```

### Step 4: Add to Squarespace

Same as Method 1, Step 4.

---

## 📋 Configuration Reference

### Common Image Naming Patterns

| Image Names | Configuration |
|------------|---------------|
| `00000.png`, `00001.png`, ... | `startFrame: 0`, `framePadding: 5`, `useUnderscore: false` |
| `000.png`, `001.png`, ... | `startFrame: 0`, `framePadding: 3`, `useUnderscore: false` |
| `product_001.jpg`, `product_002.jpg`, ... | `startFrame: 1`, `framePadding: 3`, `useUnderscore: true` |
| `chair_01.jpg`, `chair_02.jpg`, ... | `startFrame: 1`, `framePadding: 2`, `useUnderscore: true` |

### All Configuration Options

```javascript
{
    containerId: 'rotator360-embed',     // Container element ID
    imagePath: 'https://...',            // Base URL (or use frameUrls)
    frameUrls: [...],                    // Explicit URLs array (alternative to imagePath)
    imageFormat: 'png',                  // 'png', 'jpg', or 'webp'
    totalFrames: 36,                     // Number of images
    startFrame: 0,                       // Starting frame number
    framePadding: 5,                     // Digits in filename (5 = 00000)
    useUnderscore: false                // true for product_001, false for 00000
}
```

---

## 🎨 Customization Options

### Change Aspect Ratio

In the `<style>` section, find:
```css
.rotator-360-embed {
    padding-bottom: 75%; /* Change this value */
}
```

- `75%` = 4:3 aspect ratio
- `100%` = 1:1 (square)
- `56.25%` = 16:9 (widescreen)
- `133.33%` = 3:4 (portrait)

### Change Rotation Speed

Find this line in the JavaScript (around line 181):
```javascript
this.rotation += deltaX * 0.5; // Change 0.5 to adjust speed
```

- `0.3` = slower rotation
- `0.5` = normal (default)
- `1.0` = faster rotation
- `1.5` = very fast

### Change Colors/Styling

Modify the CSS in the `<style>` section:
- Background color: `background: #fff;`
- Border radius: `border-radius: 10px;`
- Shadow: `box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);`
- Loading text color: `color: #667eea;`

---

## 🔧 Troubleshooting

### Images Not Loading?

1. **Check Browser Console (F12)**
   - Look for 404 errors
   - Verify URLs are correct

2. **Verify Image URLs**
   - Test one URL directly in browser
   - Make sure URLs are accessible (not private)

3. **Check Configuration**
   - `imagePath` matches your actual URLs
   - `imageFormat` matches your files
   - `totalFrames` matches number of images
   - `framePadding` matches filename format

### Rotator Not Appearing?

1. **Check Console for Errors (F12)**
   - Look for JavaScript errors
   - Check if container element exists

2. **Verify Code Block**
   - Make sure entire code is pasted
   - No missing closing tags

3. **Check Squarespace Settings**
   - Some Squarespace plans may restrict custom code
   - Try a different page template

### Rotation Not Working?

1. **Check Touch Events**
   - Mobile: Try swiping
   - Desktop: Try clicking and dragging

2. **Check Console**
   - Look for JavaScript errors
   - Verify images loaded successfully

### Images Loading Slowly?

1. **Optimize Images**
   - Compress images (use TinyPNG or similar)
   - Consider WebP format
   - Reduce image dimensions if too large

2. **Use CDN**
   - Host images on a CDN for faster delivery
   - GitHub + jsDelivr is free and fast

---

## ✅ Quick Checklist

Before going live, verify:

- [ ] All images uploaded and accessible
- [ ] Configuration matches your image naming
- [ ] Tested on desktop (drag to rotate)
- [ ] Tested on mobile (swipe to rotate)
- [ ] No console errors (F12)
- [ ] Loading indicator disappears when ready
- [ ] Rotation is smooth
- [ ] Images are in correct order

---

## 📞 Need More Help?

1. **Check Browser Console (F12)** - Most issues show error messages here
2. **Test with `test-image.html`** - Verify images load correctly
3. **Review `README.md`** - Detailed documentation
4. **Check `DEPLOYMENT.md`** - Additional deployment tips

---

## 🚀 Pro Tips

1. **Test First**: Always test in preview mode before publishing
2. **Optimize Images**: Compress images to reduce load time
3. **Use CDN**: External CDN is often faster than Squarespace files
4. **Mobile First**: Test on mobile devices - most users are on mobile
5. **Multiple Rotators**: You can add multiple rotators on one page (just change `containerId`)

---

## Example: Complete Working Code

Here's a complete example for images named `00000.png` through `00035.png`:

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
        margin: 20px 0;
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
(function() {
    'use strict';
    
    class Rotator360Embed {
        constructor(options) {
            this.containerId = options.containerId || 'rotator360-embed';
            this.frameUrls = Array.isArray(options.frameUrls) ? options.frameUrls.filter(Boolean) : null;
            this.usesFrameUrls = Array.isArray(this.frameUrls) && this.frameUrls.length > 0;
            this.imagePath = options.imagePath || 'images/product';
            this.imageFormat = options.imageFormat || 'jpg';
            this.framePadding = options.framePadding || 3;
            this.useUnderscore = options.useUnderscore !== undefined ? options.useUnderscore : true;
            this.totalFrames = this.usesFrameUrls ? (options.totalFrames || this.frameUrls.length) : (options.totalFrames || 36);
            this.startFrame = options.startFrame !== undefined ? options.startFrame : (this.usesFrameUrls ? 0 : 1);
            this.container = document.getElementById(this.containerId);
            this.imageElement = this.container.querySelector('img');
            this.overlay = this.container.querySelector('.rotator-overlay-embed');
            this.currentFrame = this.startFrame;
            this.isDragging = false;
            this.startX = 0;
            this.lastX = 0;
            this.rotation = 0;
            this.images = [];
            this.init();
        }

        init() {
            if (!this.container || !this.imageElement) {
                console.error('Rotator360: Container not found');
                return;
            }
            this.preloadImages();
            this.setupEventListeners();
        }

        preloadImages() {
            let loadedCount = 0;
            const totalImages = this.totalFrames;
            
            for (let index = 0; index < totalImages; index++) {
                const frameNumber = this.startFrame + index;
                const imageUrl = this.getImageUrl(frameNumber);
                const img = new Image();
                if (!imageUrl) {
                    this.images.push(null);
                    continue;
                }
                img.src = imageUrl;
                
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        if (this.overlay) {
                            this.overlay.classList.add('hidden');
                        }
                    }
                };
                
                img.onerror = () => {
                    console.warn('Rotator360: Failed to load image:', imageUrl);
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        if (this.overlay) {
                            this.overlay.classList.add('hidden');
                        }
                    }
                };
                
                this.images.push(img);
            }
            
            this.updateImage(this.startFrame);
        }

        setupEventListeners() {
            this.container.addEventListener('mousedown', (e) => this.handleStart(e));
            document.addEventListener('mousemove', (e) => this.handleMove(e));
            document.addEventListener('mouseup', (e) => this.handleEnd(e));
            this.container.addEventListener('touchstart', (e) => this.handleStart(e), { passive: false });
            document.addEventListener('touchmove', (e) => this.handleMove(e), { passive: false });
            document.addEventListener('touchend', (e) => this.handleEnd(e));
            this.container.addEventListener('contextmenu', (e) => e.preventDefault());
        }

        handleStart(e) {
            this.isDragging = true;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            this.startX = clientX;
            this.lastX = clientX;
            this.container.style.cursor = 'grabbing';
            e.preventDefault();
        }

        handleMove(e) {
            if (!this.isDragging) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const deltaX = clientX - this.lastX;
            this.lastX = clientX;
            this.rotation += deltaX * 0.5;
            this.updateFrameFromRotation();
            e.preventDefault();
        }

        handleEnd(e) {
            if (!this.isDragging) return;
            this.isDragging = false;
            this.container.style.cursor = 'grab';
        }

        updateFrameFromRotation() {
            const normalizedRotation = ((this.rotation % 360) + 360) % 360;
            const frameIndex = Math.round((normalizedRotation / 360) * this.totalFrames);
            let targetFrame = (frameIndex % this.totalFrames) + this.startFrame;
            if (targetFrame >= this.startFrame + this.totalFrames) {
                targetFrame = this.startFrame;
            }
            
            if (targetFrame !== this.currentFrame) {
                this.currentFrame = targetFrame;
                this.updateImage(targetFrame);
            }
        }

        updateImage(frameNumber) {
            const minFrame = this.startFrame;
            const maxFrame = this.startFrame + this.totalFrames - 1;
            if (frameNumber < minFrame || frameNumber > maxFrame) return;
            const imageUrl = this.getImageUrl(frameNumber);
            const arrayIndex = frameNumber - this.startFrame;
            const preloadedImg = this.images[arrayIndex];
            
            if (preloadedImg && preloadedImg.complete) {
                this.imageElement.src = preloadedImg.src;
            } else if (imageUrl) {
                this.imageElement.src = imageUrl;
            }
        }

        getImageUrl(frameNumber) {
            if (this.usesFrameUrls) {
                const index = frameNumber - this.startFrame;
                return this.frameUrls && this.frameUrls[index] ? this.frameUrls[index] : null;
            }
            const frameNum = String(frameNumber).padStart(this.framePadding, '0');
            const separator = this.useUnderscore ? '_' : '';
            return `${this.imagePath}${separator}${frameNum}.${this.imageFormat}`;
        }
    }

    function initRotator() {
        window.rotator360 = new Rotator360Embed({
            containerId: 'rotator360-embed',
            imagePath: 'https://yoursite.squarespace.com/s/', // ← CHANGE THIS
            imageFormat: 'png',                                 // ← CHANGE THIS
            totalFrames: 36,                                    // ← CHANGE THIS
            startFrame: 0,                                      // ← CHANGE THIS
            framePadding: 5,                                    // ← CHANGE THIS
            useUnderscore: false                                // ← CHANGE THIS
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRotator);
    } else {
        initRotator();
    }
})();
</script>
```

**Just update the configuration section with your values and paste into a Squarespace Code Block!**

