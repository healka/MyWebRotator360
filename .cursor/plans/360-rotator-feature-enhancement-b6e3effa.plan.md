<!-- b6e3effa-0f94-42d1-93e5-184ee662ed5c facebf0e-f310-4d0f-99e0-fd2bd2b3ceb0 -->
# 360° Image Rotator Feature Enhancement Plan

## Current State Analysis

The project currently has:

- Basic drag/swipe rotation
- Auto-rotate functionality
- Reset button
- Image preloading
- Loading indicator (simple text)
- Squarespace integration support

## Proposed Feature Enhancements

### 1. Enhanced Loading Experience

- **Loading progress bar/percentage**: Show actual loading progress (X of Y images loaded)
- **Progressive loading**: Display images as they load instead of waiting for all
- **Error handling UI**: Visual feedback for failed image loads

**Files to modify:**

- `rotator.js`: Add progress tracking, update `onAllImagesLoaded()` and `preloadImages()`
- `styles.css`: Add progress bar styles
- `index.html`: Add progress bar HTML element

### 2. Navigation Controls

- **Previous/Next frame buttons**: Step through frames one at a time
- **Frame counter display**: Show "Frame X of Y" or "X° / 360°"
- **Thumbnail strip**: Optional thumbnail navigation bar
- **Keyboard navigation**: Arrow keys to rotate, spacebar for auto-rotate toggle

**Files to modify:**

- `rotator.js`: Add `goToNextFrame()`, `goToPreviousFrame()`, keyboard event handlers
- `styles.css`: Style navigation buttons and frame counter
- `index.html`: Add navigation button elements

### 3. Zoom Functionality

- **Pinch-to-zoom on mobile**: Two-finger pinch gesture
- **Mouse wheel zoom on desktop**: Scroll wheel to zoom in/out
- **Zoom controls**: Buttons or slider for zoom level
- **Pan when zoomed**: Drag to move around zoomed image

**Files to modify:**

- `rotator.js`: Add zoom state, pinch detection, wheel handlers, pan logic
- `styles.css`: Add zoom container styles, overflow handling
- `index.html`: Add zoom control buttons (optional)

### 4. Fullscreen Mode

- **Fullscreen button**: Toggle fullscreen view
- **Fullscreen API integration**: Use browser Fullscreen API
- **Exit on ESC key**: Standard fullscreen behavior

**Files to modify:**

- `rotator.js`: Add `toggleFullscreen()`, fullscreen event listeners
- `styles.css`: Add fullscreen styles
- `index.html`: Add fullscreen button

### 5. Smooth Animations & Effects

- **Frame transition animations**: Fade or cross-fade between frames
- **Momentum/inertia**: Continue rotation after drag ends with deceleration
- **Smooth auto-rotate**: Ease in/out for auto-rotate start/stop
- **Rotation speed control**: Adjustable sensitivity slider

**Files to modify:**

- `rotator.js`: Add momentum calculation, animation easing, transition effects
- `styles.css`: Add transition classes, animation keyframes

### 6. Enhanced Auto-Rotate

- **Play/Pause button**: Better control than toggle
- **Speed control**: Slider to adjust auto-rotate speed
- **Direction toggle**: Rotate clockwise or counter-clockwise
- **Pause on hover/interaction**: Auto-pause when user interacts

**Files to modify:**

- `rotator.js`: Enhance `startAutoRotate()` and `stopAutoRotate()`, add speed/direction options
- `styles.css`: Style new controls
- `index.html`: Add speed slider, direction toggle

### 7. Performance Optimizations

- **Lazy loading option**: Load images on-demand instead of all upfront
- **Image quality settings**: Support for different quality levels
- **RequestAnimationFrame**: Use RAF for smoother animations
- **Debounced frame updates**: Prevent excessive frame switching

**Files to modify:**

- `rotator.js`: Add lazy loading logic, RAF-based animation loop, debouncing

### 8. Accessibility Improvements

- **ARIA labels**: Proper labels for screen readers
- **Keyboard navigation**: Full keyboard support (arrows, space, ESC)
- **Focus indicators**: Visible focus states for keyboard users
- **Alt text support**: Better image alt text handling

**Files to modify:**

- `rotator.js`: Add ARIA attributes, keyboard event handlers
- `styles.css`: Add focus styles
- `index.html`: Add ARIA attributes

### 9. Configuration Options

- **Configurable controls**: Show/hide specific controls
- **Customizable styling**: More CSS variables for easy theming
- **Event callbacks**: onFrameChange, onLoadComplete, etc.
- **Multiple rotator instances**: Better support for multiple rotators on one page

**Files to modify:**

- `rotator.js`: Add configuration options, event emitter pattern
- `styles.css`: Add CSS variables for theming

### 10. Visual Polish

- **Loading skeleton**: Better loading state visualization
- **Smooth cursor transitions**: Better grab/grabbing cursor states
- **Hover effects**: Subtle hover effects on controls
- **Responsive improvements**: Better mobile experience

**Files to modify:**

- `styles.css`: Enhanced visual styles
- `index.html`: Add skeleton loading elements

## Implementation Priority

**Phase 1 (High Priority - Core UX):**

1. Loading progress indicator
2. Navigation controls (prev/next, frame counter)
3. Keyboard navigation
4. Enhanced auto-rotate controls

**Phase 2 (Medium Priority - Enhanced Features):**

5. Zoom functionality
6. Fullscreen mode
7. Smooth animations & momentum

**Phase 3 (Nice to Have - Polish):**

8. Thumbnail strip
9. Performance optimizations (lazy loading)
10. Accessibility improvements

## Files Structure

```
rotator.js          - Main class with all new methods
styles.css          - All new styles and animations
index.html          - Updated HTML with new controls
squarespace-ready.html - Updated embed version
```

## Technical Considerations

- Maintain backward compatibility with existing configurations
- Ensure Squarespace embed version gets all features
- Test on mobile devices (touch events)
- Performance: avoid janky animations
- Browser compatibility: Fullscreen API, touch events

### To-dos

- [ ] Add loading progress bar showing X/Y images loaded with percentage
- [ ] Add Previous/Next frame buttons and frame counter display (Frame X of Y)
- [ ] Implement keyboard navigation (arrow keys, spacebar, ESC)
- [ ] Add play/pause button, speed control slider, and direction toggle for auto-rotate
- [ ] Implement zoom with pinch-to-zoom (mobile) and mouse wheel (desktop), plus pan when zoomed
- [ ] Add fullscreen toggle button using Fullscreen API with ESC key support
- [ ] Add momentum/inertia effect, frame transition animations, and smooth auto-rotate easing
- [ ] Add ARIA labels, keyboard focus indicators, and screen reader support
- [ ] Update squarespace-ready.html with all new features for embed version
- [ ] Add CSS variables for easy theming and customization