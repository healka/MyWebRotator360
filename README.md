# 360° Image Rotator for Squarespace

A lightweight, interactive 360° product viewer designed for easy integration into Squarespace websites. Perfect for showcasing home theater seating, furniture, products, or any item that benefits from a full rotation view.

## ✨ Features

- **Drag to Rotate** - Smooth mouse/touch interaction with momentum
- **Auto-Rotate** - Automatic rotation with adjustable speed
- **Controls** - Play/Pause, Reset, and Frame counter
- **Multi-Instance** - Add multiple rotators on the same page
- **Mobile-Friendly** - Full touch gesture support
- **Self-Contained** - Single HTML file with inline CSS/JS
- **No Dependencies** - Pure vanilla JavaScript, no libraries needed

## 🚀 Quick Start

1. **Open** `squarespace-with-controls.html`
2. **Configure** the image settings (line ~383)
3. **Copy** the entire file content
4. **Paste** into a Squarespace Code Block
5. **Done!**

## 📁 Project Structure

```
MyWebRotator360/
├── squarespace-with-controls.html    # Main file - copy this!
├── SQUARESPACE-IMPLEMENTATION-GUIDE.md # Detailed setup guide
├── README.md                          # This file
└── images/
    └── README.md                      # Image preparation guide
```

## 🔧 Configuration

Edit the `CONFIG` section in `squarespace-with-controls.html`:

```javascript
const CONFIG = {
    imagePath: 'https://yoursite.squarespace.com/s/',
    imageFormat: 'png',
    totalFrames: 36,
    startFrame: 0,
    framePadding: 5,
    useUnderscore: false,
    autoRotateSpeed: 0.5
};
```

## 📖 Documentation

See **[SQUARESPACE-IMPLEMENTATION-GUIDE.md](SQUARESPACE-IMPLEMENTATION-GUIDE.md)** for:
- Detailed setup instructions
- Image naming patterns
- Customization options
- Troubleshooting guide
- Best practices

## 🎯 Use Cases

- **E-commerce** - Product showcases (furniture, electronics, etc.)
- **Home Theater Seating** - Show seating designs from all angles
- **Portfolio** - Display 3D renders or photography
- **Real Estate** - Virtual property tours
- **Automotive** - Vehicle showcases

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Customization

The rotator is fully customizable:
- Aspect ratios (4:3, 16:9, square, etc.)
- Colors and styling
- Control visibility
- Rotation speed and sensitivity
- Frame counter display

All styling is inline and easy to modify.

## 🛠️ Technical Details

- **Pure JavaScript** - No jQuery or other dependencies
- **RequestAnimationFrame** - Smooth 60fps animations
- **Event delegation** - Efficient DOM manipulation
- **Instance isolation** - Multiple rotators work independently
- **Touch events** - Full mobile gesture support
- **Memory efficient** - Image preloading with proper cleanup

## 💡 Tips

1. **Image Optimization** - Compress images for faster loading (use TinyPNG or similar)
2. **Recommended**: 36 images (10° per frame) for smooth rotation
3. **File Size**: Keep each image under 300KB for best performance
4. **Testing**: Test on actual mobile devices, not just browser DevTools

## 📋 Requirements

### For Website Integration
- Squarespace site with Code Block support (most plans)
- 360° product images (typically 36 images)
- Images hosted on Squarespace or external CDN

### For Development
- Any text editor
- Web browser for testing
- (Optional) Local web server for testing

## 🎓 How to Create 360° Images

1. **Photography Method**:
   - Use a turntable
   - Take photos every 10° (36 photos total)
   - Use consistent lighting and camera settings

2. **3D Rendering Method**:
   - Create 3D model in Blender, 3ds Max, etc.
   - Render frames at 10° intervals
   - Export as PNG or JPG sequence

## 🔄 Updates

Current version includes:
- ✅ Multi-instance support
- ✅ Momentum/inertia effect
- ✅ Frame counter
- ✅ Auto-rotate controls
- ✅ Mobile touch support

## 📄 License

Free to use for personal and commercial projects.

## 🤝 Support

For setup help, see the [Implementation Guide](SQUARESPACE-IMPLEMENTATION-GUIDE.md).

---

**Made for Squarespace** | Easy setup | No coding required | Mobile-ready

