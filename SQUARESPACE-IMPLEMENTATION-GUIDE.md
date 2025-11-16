# Squarespace Implementation Guide - 360° Image Rotator

## 🎯 Quick Start

Your 360° rotator is ready to use! Just copy, configure, and paste into Squarespace.

### Features Included
- ✅ Drag to rotate (works even when cursor leaves screen)
- ✅ Momentum/inertia effect after drag
- ✅ Auto Rotate button with speed control
- ✅ Reset button
- ✅ Frame counter (Frame X / Y)
- ✅ Multiple instances support (add as many as you want on one page)
- ✅ Mobile-friendly (touch swipe support)

---

## Step 1: Prepare Your Images

You need a series of images showing your product from different angles (typically 36 images for a full 360° rotation).

### Image Requirements
- **Sequential naming**: Images should be numbered (e.g., `00000.png`, `00001.png`, ... `00035.png`)
- **Same format**: All images should be the same format (PNG, JPG, or WebP)
- **Consistent size**: All images should have the same dimensions
- **Even angles**: Images should be evenly spaced (36 images = 10° per image)

### Where to Host Images

Choose one of these options:

#### Option A: Upload to Squarespace (Recommended)
1. Go to **Settings → Files** in Squarespace
2. Upload all your 360° images
3. Click on one image to see its URL
4. Note the URL pattern (e.g., `https://yoursite.squarespace.com/s/00000.png`)

#### Option B: Use External CDN (GitHub, Cloudinary, etc.)
- GitHub + jsDelivr: `https://cdn.jsdelivr.net/gh/username/repo@main/folder/`
- Your own CDN or server

---

## Step 2: Get the Code

1. Open the file: **`squarespace-with-controls.html`**
2. Copy the **entire content** of the file (Ctrl+A, Ctrl+C)

---

## Step 3: Configure Your Settings

Before pasting into Squarespace, you need to configure the image settings.

Look for the **CONFIGURATION** section in the code (near the bottom, around line 383):

```javascript
const CONFIG = {
    // Option A: base path pattern (recommended)
    imagePath: 'https://cdn.jsdelivr.net/gh/healka/rotator-assets@main/AspenTest/',
    imageFormat: 'png',
    totalFrames: 36,
    startFrame: 0,
    framePadding: 5,
    useUnderscore: false,
    autoRotateSpeed: 0.5
};
```

### Configuration Options Explained

| Option | Description | Examples |
|--------|-------------|----------|
| `imagePath` | Base URL path to your images (without frame number) | `'https://yoursite.squarespace.com/s/'`<br>`'https://cdn.jsdelivr.net/gh/user/repo@main/folder/'` |
| `imageFormat` | Image file extension | `'png'`, `'jpg'`, `'webp'` |
| `totalFrames` | Total number of images | `36`, `72`, `24` |
| `startFrame` | Starting frame number | `0` (for 00000.png)<br>`1` (for 001.jpg) |
| `framePadding` | Number of digits in filename | `5` (for 00000)<br>`3` (for 001)<br>`2` (for 01) |
| `useUnderscore` | Whether filename has underscore separator | `false` (for 00000.png)<br>`true` (for product_001.jpg) |
| `autoRotateSpeed` | Speed of auto-rotation (degrees per frame) | `0.5` (normal)<br>`0.3` (slower)<br>`1.0` (faster) |

### Common Image Naming Patterns

#### Pattern 1: 00000.png, 00001.png, ... 00035.png
```javascript
imagePath: 'https://yoursite.squarespace.com/s/',
imageFormat: 'png',
totalFrames: 36,
startFrame: 0,
framePadding: 5,
useUnderscore: false
```

#### Pattern 2: product_001.jpg, product_002.jpg, ... product_036.jpg
```javascript
imagePath: 'https://yoursite.squarespace.com/s/product',
imageFormat: 'jpg',
totalFrames: 36,
startFrame: 1,
framePadding: 3,
useUnderscore: true
```

#### Pattern 3: chair01.png, chair02.png, ... chair36.png
```javascript
imagePath: 'https://yoursite.squarespace.com/s/chair',
imageFormat: 'png',
totalFrames: 36,
startFrame: 1,
framePadding: 2,
useUnderscore: false
```

### Option B: Explicit URLs (When URLs Don't Follow a Pattern)

If each image has a completely different URL, use the `frameUrls` option instead:

```javascript
const CONFIG = {
    frameUrls: [
        'https://images.squarespace-cdn.com/content/.../00000.png?...',
        'https://images.squarespace-cdn.com/content/.../00001.png?...',
        'https://images.squarespace-cdn.com/content/.../00002.png?...',
        // ... add all URLs in order
    ],
    totalFrames: 36,
    startFrame: 0
};
```

**Tip:** To get all URLs from Squarespace Asset Library:
1. Open Asset Library folder with your images
2. Press **F12** (Developer Tools)
3. Go to **Console** tab
4. Paste this script:

```javascript
[...document.querySelectorAll('[data-clipboard-text]')]
  .map(btn => btn.getAttribute('data-clipboard-text'))
  .filter(url => url && (url.includes('.png') || url.includes('.jpg')))
  .sort()
  .forEach(url => console.log(`'${url}',`));
```

5. Copy the output and paste into `frameUrls` array

---

## Step 4: Add to Squarespace

1. **Edit your Squarespace page**
2. **Add a new block**: Click the **+** icon where you want the rotator
3. **Select "Code" block** from the menu
4. **Paste the entire code** (with your configuration)
5. **Click "Apply"** or **"Save"**
6. **Preview** your page to test

---

## Step 5: Add Multiple Rotators (Optional)

Want multiple 360° viewers on the same page? Just duplicate the code block!

Each instance works independently with its own:
- Controls (Auto Rotate, Reset)
- Frame counter
- Rotation state

Simply copy the entire code block and paste it again on the same page.

---

## 🎨 Customization

### Change Aspect Ratio

In the CSS section, find:

```css
.rotator-360-embed {
    padding-bottom: 75%; /* Change this value */
}
```

- `75%` = 4:3 (default)
- `56.25%` = 16:9 (widescreen)
- `100%` = 1:1 (square)
- `133.33%` = 3:4 (portrait)

### Change Colors

```css
.rotator-btn-embed {
    background: #667eea; /* Change button color */
}
.rotator-btn-embed.active {
    background: #48bb78; /* Change active button color */
}
```

### Enable Speed Control Slider

In the HTML section, find the commented-out speed control and uncomment it:

```html
<!-- Optional: speed control (uncomment to use) -->
<label class="rotator-info-embed speedControl-embed" style="background: transparent; box-shadow:none;">
    Speed
    <input class="speedInput-embed" type="range" min="0.2" max="2" step="0.1" value="0.5" style="vertical-align:middle;">
</label>
```

Remove the `<!--` and `-->` to enable it.

---

## 🔧 Troubleshooting

### Problem: Images not loading

**Check:**
1. Open browser console (F12) - look for 404 errors
2. Verify one image URL directly in browser
3. Check that `imagePath` matches your actual URLs
4. Verify `imageFormat`, `framePadding`, `startFrame` are correct

**Common issues:**
- Wrong `framePadding` (5 vs 3 vs 2)
- Wrong `startFrame` (0 vs 1)
- Wrong `useUnderscore` (true vs false)
- Images are private/not publicly accessible

### Problem: Only shows "Loading..."

**Possible causes:**
- Images failed to load (check console for errors)
- JavaScript error (check console)
- Wrong configuration

**Solution:**
1. Press F12 and check Console tab for errors
2. Test one image URL directly in browser
3. Verify configuration matches your image naming

### Problem: Rotation is too fast/slow

**Solution:**
Adjust the sensitivity in the code. Find this line (around line 268):

```javascript
const sensitivity = 0.5; // Change this value
```

- Lower = slower rotation (`0.3`)
- Higher = faster rotation (`1.0`)

### Problem: Auto-rotate is too fast/slow

**Solution:**
Change `autoRotateSpeed` in the CONFIG section:

```javascript
autoRotateSpeed: 0.5  // 0.3 = slower, 1.0 = faster
```

### Problem: Multiple blocks on same page, only first one works

**Solution:**
This shouldn't happen with the new version! If it does:
1. Make sure you're using `squarespace-with-controls.html`
2. Check that each block has the class `rotator-wrap-embed`
3. Clear browser cache and refresh

---

## 📱 Mobile Considerations

The rotator is fully mobile-responsive:
- ✅ Touch/swipe gestures work
- ✅ Pinch gestures won't interfere with rotation
- ✅ Works on all screen sizes

**Tip:** Test on actual mobile devices, not just browser DevTools, for best accuracy.

---

## 🚀 Best Practices

### Image Optimization
1. **Compress images** - Use TinyPNG, Squoosh, or similar
2. **Recommended size**: 1200-1800px width
3. **Target file size**: Under 300KB per image
4. **Format**: WebP for best compression, PNG for transparency, JPG for photos

### Performance
- **36 images** is the sweet spot (10° per frame)
- **72 images** for ultra-smooth rotation (5° per frame) - but slower loading
- **24 images** for faster loading (15° per frame) - less smooth

### User Experience
- Start with auto-rotate OFF - let users discover interaction
- Add instructions above the rotator: "Drag to rotate"
- Place the reset button prominently
- Consider adding a speed slider for user control

---

## 📋 File Structure

Your project now contains:

```
MyWebRotator360/
├── squarespace-with-controls.html    ← Main file (copy this!)
├── SQUARESPACE-IMPLEMENTATION-GUIDE.md ← This guide
└── images/
    └── README.md                      ← Image preparation guide
```

---

## 💡 Tips

1. **Test locally first**: Open `squarespace-with-controls.html` in your browser to test before uploading to Squarespace
2. **Use Squarespace preview**: Always preview changes before publishing
3. **Keep originals**: Keep a copy of your original, uncompressed images
4. **Consistent lighting**: All images should have the same lighting/exposure
5. **Clean background**: Use a plain or transparent background for best results

---

## 📞 Need Help?

Common questions:
- **"How do I create 360° images?"** - Use a turntable and take photos every 10°, or use 3D software to render frames
- **"Can I use videos instead?"** - No, this rotator uses static images
- **"Can I zoom in?"** - Not in the current version (future feature)
- **"Does it work on all Squarespace templates?"** - Yes, works on all templates that support Code Blocks

---

**Ready to go?** Just copy `squarespace-with-controls.html`, configure it, and paste into your Squarespace Code Block!
