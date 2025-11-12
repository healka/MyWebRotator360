# Deployment Guide - 360° Rotator

## For Squarespace (Recommended Method)

### Step 1: Upload Your Images

1. Log into your Squarespace account
2. Go to **Settings → Files**
3. Upload all 36 images (`00000.png` through `00035.png`)
4. After uploading, click on one image to see its URL
5. **Copy the base URL pattern** - it will look like:
   - `https://yoursite.squarespace.com/s/00000.png`
   - The base URL is: `https://yoursite.squarespace.com/s/`

### Step 2: Get the Embed Code

1. Open `squarespace-embed.html` in a text editor
2. Copy the **entire content** of the file
3. Find the configuration section (around line 219-240)
4. Update these values:

```javascript
imagePath: 'https://yoursite.squarespace.com/s/',  // Your Squarespace URL
imageFormat: 'png',                                 // Your format
totalFrames: 36,                                     // Your number of images
startFrame: 0,                                       // Start at 0
framePadding: 5,                                     // 5 digits
useUnderscore: false                                 // No underscore
```

### Step 3: Add to Your Squarespace Page

1. Edit the page where you want the rotator
2. Click **Add Block** → **Code**
3. Paste the entire code from `squarespace-embed.html` (with your updated configuration)
4. Click **Save**
5. Preview your page to test

### Step 4: Test

- Open your page in a browser
- Open Developer Console (F12) to check for errors
- Try dragging/swiping the rotator
- Verify all 36 images load correctly

---

## For Other Websites (WordPress, Custom HTML, etc.)

### Option A: Upload Files to Your Server

1. **Upload these files to your web server:**
   - `rotator.js`
   - `styles.css` (or copy the CSS into your site's stylesheet)
   - `images/` folder with all your PNG files

2. **Add HTML to your page:**

```html
<!-- Add CSS (or include styles.css) -->
<link rel="stylesheet" href="path/to/styles.css">

<!-- Add the rotator container -->
<div id="rotator360" class="rotator-360">
    <img id="rotatorImage" src="" alt="360 Product View">
    <div class="rotator-overlay">
        <div class="loading-indicator">Loading...</div>
    </div>
</div>

<!-- Add JavaScript -->
<script src="path/to/rotator.js"></script>
<script>
    const rotator = new Rotator360({
        containerId: 'rotator360',
        imagePath: 'images/',        // Path to your images folder
        imageFormat: 'png',
        totalFrames: 36,
        startFrame: 0,
        framePadding: 5,
        useUnderscore: false,
        autoRotate: false,
        autoRotateSpeed: 0.5
    });
</script>
```

### Option B: Use CDN/Hosting Service

1. **Upload images to a CDN or image hosting service:**
   - Cloudinary, Imgur, AWS S3, etc.
   - Get the base URL for your images

2. **Update the configuration:**

```javascript
const rotator = new Rotator360({
    containerId: 'rotator360',
    imagePath: 'https://your-cdn.com/images/',  // CDN URL
    imageFormat: 'png',
    totalFrames: 36,
    startFrame: 0,
    framePadding: 5,
    useUnderscore: false
});
```

---

## Quick Reference: Your Configuration

Since your images are named `00000.png`, `00001.png`, etc., use these settings:

```javascript
{
    imagePath: 'https://yoursite.com/path/to/images/',  // Full URL or relative path
    imageFormat: 'png',
    totalFrames: 36,        // You have 36 images (00000-00035)
    startFrame: 0,          // Start at 0
    framePadding: 5,        // 5 digits: 00000
    useUnderscore: false    // No underscore in filename
}
```

---

## Troubleshooting

### Images Not Loading?

1. **Check image URLs:**
   - Open browser console (F12)
   - Look for 404 errors
   - Verify the URLs match your actual image locations

2. **CORS Issues:**
   - If hosting images on a different domain, ensure CORS headers are set
   - Or host images on the same domain as your website

3. **Path Issues:**
   - Use absolute URLs (starting with `http://` or `https://`)
   - Or ensure relative paths are correct from your HTML file location

### Rotator Not Appearing?

1. Check browser console for JavaScript errors
2. Verify `rotator.js` is loaded correctly
3. Ensure the container element ID matches: `rotator360`

### Performance Issues?

1. Optimize images (compress PNG files)
2. Consider using WebP format for smaller file sizes
3. Use a CDN for faster image delivery

---

## Need Help?

- Check browser console (F12) for error messages
- Verify image paths and filenames match exactly
- Test with `test-image.html` first to verify image loading

