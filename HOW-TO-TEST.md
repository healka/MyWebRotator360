# How to Test Your 360° Rotator

## Quick Start (Windows)

### Step 1: Start the Local Server

Open PowerShell or Command Prompt in this folder and run:

```bash
py -m http.server 8000
```

**Note:** On Windows, use `py` instead of `python`

Or simply double-click `start-server.bat`

### Step 2: Open in Browser

Once the server is running, open your browser and go to:

**http://localhost:8000/index.html**

### Step 3: Check the Console

1. Press **F12** to open Developer Tools
2. Click the **Console** tab
3. You should see messages like:
   - `Rotator360 initialized with: ...`
   - `Rotator360: Starting to preload 36 images...`
   - `Rotator360: Finished loading. Success: 36, Errors: 0`

### Step 4: Test the Rotator

- **Desktop:** Click and drag left/right on the image area
- **Mobile:** Swipe left/right on the image area
- The product should rotate smoothly!

## Troubleshooting

### Images Not Loading?

1. **Check Console Errors (F12)**
   - Look for red error messages
   - Check if image paths are correct

2. **Verify Image Names**
   - Your images should be: `00000.png`, `00001.png`, ... `00035.png`
   - All in the `images/` folder

3. **Check Image Paths**
   - Open `test-image.html` in browser: `http://localhost:8000/test-image.html`
   - This will test if images can be loaded

### Server Won't Start?

- Make sure port 8000 is not in use
- Try a different port: `py -m http.server 8080`
- Then use: `http://localhost:8080/index.html`

### Still Having Issues?

Check the browser console (F12) for specific error messages and share them.

