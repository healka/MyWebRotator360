# Quick Start Guide

Get your 360° rotator up and running in minutes!

## Step 1: Host Your Images

1. Render/export 36 frames of your product (every 10°)
2. Name them sequentially: `00000.png`, `00001.png`, … `00035.png`
3. Commit the folder to a public GitHub repository (example: `healka/rotator-assets/AspenTest/`)
4. jsDelivr CDN will serve them at `https://cdn.jsdelivr.net/gh/healka/rotator-assets@main/AspenTest/00000.png`

> To use your own repo, replace `healka/rotator-assets@main/AspenTest/` with `<username>/<repo>@<branch>/<folder>/` after you push your frames.

## Step 2: Test Locally

1. Open `index.html` in your browser (it already points to the AspenTest CDN path)
2. Confirm you see the chair preview and can drag to rotate
3. To test another product, edit the `cdnImagePath` constant in the script

## Step 3: Embed on Squarespace

1. Edit your Squarespace page and add a **Code Block**
2. Open `squarespace-ready.html`, copy the entire file, and paste it into the block
3. Save – the embed already loads frames from `https://cdn.jsdelivr.net/gh/healka/rotator-assets@main/AspenTest/`
4. To switch products later, change the `cdnImagePath` constant inside the embed

## Configuration Reference

```javascript
{
    containerId: 'rotator360',           // ID of container element
    imagePath: 'https://cdn.jsdelivr.net/gh/healka/rotator-assets@main/AspenTest/',
    imageFormat: 'png',
    totalFrames: 36,                     // Number of images
    startFrame: 0,                       // Starting frame
    framePadding: 5,                     // Digits in filename (5 = 00000)
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

