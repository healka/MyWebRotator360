/**
 * Example Configuration for Images Named: 00000.png, 00001.png, 00002.png, etc.
 * 
 * Use this configuration when your images are named with 5-digit padding starting at 0
 */

const rotator = new Rotator360({
    containerId: 'rotator360',
    
    // Base path to your images (without the frame number)
    // Example: jsDelivr CDN hosting the AspenTest frames on GitHub
    imagePath: 'https://cdn.jsdelivr.net/gh/healka/rotator-assets@main/AspenTest/',
    
    // Image file format
    imageFormat: 'png',
    
    // Total number of images (e.g., 36 images from 00000 to 00035)
    totalFrames: 36,
    
    // Starting frame number (0 for 00000.png)
    startFrame: 0,
    
    // Number of digits in filename (5 for 00000, 00001, etc.)
    framePadding: 5,
    
    // No underscore in filename (false for 00000.png, true for product_00000.png)
    useUnderscore: false,
    
    // Optional: Auto-rotate settings
    autoRotate: false,
    autoRotateSpeed: 0.5
});

/**
 * SQUARESPACE EXAMPLE:
 * 
 * Host once on GitHub, then use jsDelivr:
 * imagePath: 'https://cdn.jsdelivr.net/gh/<username>/rotator-assets@main/<FolderName>/',
 * imageFormat: 'png',
 * totalFrames: 36,
 * startFrame: 0,
 * framePadding: 5,
 * useUnderscore: false
 */

