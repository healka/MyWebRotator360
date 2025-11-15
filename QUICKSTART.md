# Quick Start Guide

Get your 360° rotator up and running in minutes!

## Step 1: Prepare Your Images

1. Take or render 36 images of your product from different angles (every 10°)
2. Name them sequentially: `product_001.jpg`, `product_002.jpg`, etc.
3. Place them in the `images/` folder

## Step 2: Test Locally

1. Open `index.html` in your browser
2. Update the configuration in `index.html`:
   ```javascript
   const rotator = new Rotator360({
       containerId: 'rotator360',
       imagePath: 'images/chair',  // Change to your image name
       imageFormat: 'jpg',          // Change if using png/webp
       totalFrames: 36,             // Change to your number of images
       startFrame: 1,
       framePadding: 3              // 3 = 001, 2 = 01
   });
   ```
3. Test by dragging the image left/right

## Step 3: Embed on Squarespace

### Option A: Quick Embed (Recommended)

1. **Upload images to Squarespace:**
   - Go to Settings → Files
   - Upload all your rotation images
   - Note the URL pattern (e.g., `https://yoursite.squarespace.com/s/chair_001.jpg`)

2. **Add Code Block:**
   - Edit your Squarespace page
   - Add a Code Block
   - Open `squarespace-embed.html` and copy the entire content
   - Paste into the Code Block

3. **Update Configuration:**
   - Find the configuration section in the code (marked with "CHANGE THIS")
   - Update `imagePath` to your Squarespace image URL pattern
   - Update `imageFormat` to match your images
   - Update `totalFrames` to your number of images
   - Save and preview!

### Option B: Custom Integration

1. Copy CSS from `styles.css` to Squarespace Custom CSS
2. Copy JavaScript from `rotator.js` to Code Injection (Footer)
3. Add HTML structure to your page using a Code Block

## Configuration Reference

```javascript
{
    containerId: 'rotator360',           // ID of container element
    imagePath: 'images/chair',           // Base path (without frame number)
    imageFormat: 'jpg',                  // jpg, png, or webp
    totalFrames: 36,                     // Number of images
    startFrame: 1,                       // Starting frame
    framePadding: 3,                     // Digits in filename (3 = 001)
    autoRotate: false,                   // Enable auto-rotation
    autoRotateSpeed: 0.5                 // Rotation speed (0.1-2.0)
}
```

## Troubleshooting

**Images not showing?**
- Check image paths are correct
- Verify image naming matches configuration
- Open browser console (F12) to see errors

**Rotation feels slow/fast?**
- In `rotator.js`, find `this.rotation += deltaX * 0.5;`
- Increase number for faster rotation (e.g., `* 1.0`)
- Decrease for slower rotation (e.g., `* 0.3`)

**Not working on mobile?**
- Ensure touch events are enabled (they are by default)
- Check that images are loading properly

## Need Help?

Check `README.md` for detailed documentation and advanced customization options.

