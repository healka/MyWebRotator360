/**
 * 360° Image Rotator
 * A smooth, interactive image rotator that creates the illusion of 3D rotation
 * by switching between pre-rendered images from different angles.
 */
class Rotator360 {
    constructor(options = {}) {
        // Configuration
        this.containerId = options.containerId || 'rotator360';

        this.frameUrls = Array.isArray(options.frameUrls) ? options.frameUrls.filter(Boolean) : null;
        this.usesFrameUrls = Array.isArray(this.frameUrls) && this.frameUrls.length > 0;

        this.imagePath = options.imagePath || 'images/product';
        this.imageFormat = options.imageFormat || 'jpg';
        this.framePadding = options.framePadding || 3;
        this.useUnderscore = options.useUnderscore !== undefined ? options.useUnderscore : true;

        if (this.usesFrameUrls) {
            this.totalFrames = options.totalFrames || this.frameUrls.length;
        } else {
            this.totalFrames = options.totalFrames || 36;
        }

        this.startFrame = options.startFrame !== undefined ? options.startFrame : (this.usesFrameUrls ? 0 : 1);
        this.autoRotate = options.autoRotate || false;
        this.autoRotateSpeed = options.autoRotateSpeed || 0.5;

        // DOM Elements
        this.container = document.getElementById(this.containerId);
        this.imageElement = this.container.querySelector('img');
        this.overlay = this.container.querySelector('.rotator-overlay');

        // State
        this.currentFrame = this.startFrame;
        this.isDragging = false;
        this.startX = 0;
        this.lastX = 0;
        this.rotation = 0;
        this.autoRotateInterval = null;
        this.images = [];
        this.imagesLoaded = 0;

        // Initialize
        this.init();
    }

    init() {
        if (!this.container || !this.imageElement) {
            console.error('Rotator360: Container or image element not found');
            return;
        }

        // Preload images
        this.preloadImages();

        // Setup event listeners
        this.setupEventListeners();

        // Setup control buttons
        this.setupControls();
    }

    /**
     * Preload all images for smooth rotation
     */
    preloadImages() {
        const totalImages = this.totalFrames;
        let loadedCount = 0;
        let successCount = 0;
        let errorCount = 0;

        console.log(`Rotator360: Starting to preload ${totalImages} images...`);
        if (this.usesFrameUrls) {
            console.log('Rotator360: Using explicit frame URLs');
        } else {
            console.log(`Rotator360: Image path pattern: ${this.imagePath}[${this.useUnderscore ? '_' : ''}][frame].${this.imageFormat}`);
        }

        // Loop through frames
        for (let index = 0; index < totalImages; index++) {
            const frameNumber = this.startFrame + index;
            const imageUrl = this.getImageUrl(frameNumber);

            if (!imageUrl) {
                console.error(`Rotator360: No image URL resolved for frame ${frameNumber}`);
                loadedCount++;
                errorCount++;
                this.images.push(null);
                continue;
            }

            const img = new Image();
            img.src = imageUrl;
            
            img.onload = () => {
                loadedCount++;
                successCount++;
                if (loadedCount === totalImages) {
                    console.log(`Rotator360: Finished loading. Success: ${successCount}, Errors: ${errorCount}`);
                    this.onAllImagesLoaded();
                }
            };

            img.onerror = () => {
                console.error(`Rotator360: Failed to load image: ${imageUrl}`);
                loadedCount++;
                errorCount++;
                if (loadedCount === totalImages) {
                    console.log(`Rotator360: Finished loading. Success: ${successCount}, Errors: ${errorCount}`);
                    if (errorCount > 0) {
                        console.error(`Rotator360: ${errorCount} images failed to load. Check image paths and filenames.`);
                    }
                    this.onAllImagesLoaded();
                }
            };

            this.images.push(img);
        }

        // Set initial image
        this.updateImage(this.startFrame);
    }

    /**
     * Called when all images are loaded
     */
    onAllImagesLoaded() {
        if (this.overlay) {
            this.overlay.classList.add('hidden');
        }
    }

    /**
     * Setup mouse and touch event listeners
     */
    setupEventListeners() {
        // Mouse events
        this.container.addEventListener('mousedown', this.handleStart.bind(this));
        document.addEventListener('mousemove', this.handleMove.bind(this));
        document.addEventListener('mouseup', this.handleEnd.bind(this));

        // Touch events
        this.container.addEventListener('touchstart', this.handleStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.handleMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleEnd.bind(this));

        // Prevent context menu on long press
        this.container.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    /**
     * Setup control buttons
     */
    setupControls() {
        const autoRotateBtn = document.getElementById('autoRotateBtn');
        const resetBtn = document.getElementById('resetBtn');

        if (autoRotateBtn) {
            autoRotateBtn.addEventListener('click', () => this.toggleAutoRotate());
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetRotation());
        }
    }

    /**
     * Handle start of drag/touch
     */
    handleStart(e) {
        this.isDragging = true;
        this.stopAutoRotate();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        this.startX = clientX;
        this.lastX = clientX;

        this.container.style.cursor = 'grabbing';
        e.preventDefault();
    }

    /**
     * Handle drag/touch movement
     */
    handleMove(e) {
        if (!this.isDragging) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const deltaX = clientX - this.lastX;
        this.lastX = clientX;

        // Calculate rotation based on drag distance
        const sensitivity = 0.5; // Adjust for faster/slower rotation
        this.rotation += deltaX * sensitivity;

        // Update frame based on rotation
        this.updateFrameFromRotation();

        e.preventDefault();
    }

    /**
     * Handle end of drag/touch
     */
    handleEnd(e) {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.container.style.cursor = 'grab';

        // Optional: Add momentum/inertia effect
        // this.applyMomentum();
    }

    /**
     * Update frame based on current rotation
     */
    updateFrameFromRotation() {
        // Convert rotation to frame number (0-360 degrees)
        const normalizedRotation = ((this.rotation % 360) + 360) % 360;
        const frameIndex = Math.round((normalizedRotation / 360) * this.totalFrames);
        
        // Calculate target frame based on startFrame
        let targetFrame = (frameIndex % this.totalFrames) + this.startFrame;
        // Handle wrap-around
        if (targetFrame >= this.startFrame + this.totalFrames) {
            targetFrame = this.startFrame;
        }

        if (targetFrame !== this.currentFrame) {
            this.currentFrame = targetFrame;
            this.updateImage(targetFrame);
        }
    }

    /**
     * Update displayed image
     */
    updateImage(frameNumber) {
        // Check bounds based on startFrame
        const minFrame = this.startFrame;
        const maxFrame = this.startFrame + this.totalFrames - 1;
        if (frameNumber < minFrame || frameNumber > maxFrame) {
            console.warn(`Rotator360: Frame ${frameNumber} out of bounds (${minFrame}-${maxFrame})`);
            return;
        }

        const imageUrl = this.getImageUrl(frameNumber);

        // Use preloaded image if available (array index is 0-based relative to startFrame)
        const arrayIndex = frameNumber - this.startFrame;
        const preloadedImg = this.images[arrayIndex];
        if (preloadedImg && preloadedImg.complete && preloadedImg.naturalWidth > 0) {
            this.imageElement.src = preloadedImg.src;
        } else if (imageUrl) {
            this.imageElement.src = imageUrl;
        }
    }

    /**
     * Toggle auto-rotation
     */
    toggleAutoRotate() {
        if (this.autoRotateInterval) {
            this.stopAutoRotate();
        } else {
            this.startAutoRotate();
        }
    }

    /**
     * Start auto-rotation
     */
    startAutoRotate() {
        this.stopAutoRotate(); // Clear any existing interval

        const autoRotateBtn = document.getElementById('autoRotateBtn');
        if (autoRotateBtn) {
            autoRotateBtn.classList.add('active');
            autoRotateBtn.textContent = 'Stop Auto Rotate';
        }

        this.autoRotateInterval = setInterval(() => {
            this.rotation += this.autoRotateSpeed;
            this.updateFrameFromRotation();
        }, 16); // ~60fps
    }

    /**
     * Stop auto-rotation
     */
    stopAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.autoRotateInterval = null;

            const autoRotateBtn = document.getElementById('autoRotateBtn');
            if (autoRotateBtn) {
                autoRotateBtn.classList.remove('active');
                autoRotateBtn.textContent = 'Auto Rotate';
            }
        }
    }

    /**
     * Reset rotation to starting position
     */
    resetRotation() {
        this.stopAutoRotate();
        this.rotation = 0;
        this.currentFrame = this.startFrame;
        this.updateImage(this.startFrame);
    }

    /**
     * Optional: Apply momentum effect after drag ends
     */
    applyMomentum() {
        // This could be implemented for a more natural feel
        // Calculate velocity from last few drag movements
        // Apply deceleration animation
    }

    /**
     * Public method to set rotation programmatically
     */
    setRotation(degrees) {
        this.rotation = degrees;
        this.updateFrameFromRotation();
    }

    /**
     * Public method to go to specific frame
     */
    goToFrame(frameNumber) {
        const minFrame = this.startFrame;
        const maxFrame = this.startFrame + this.totalFrames - 1;
        if (frameNumber < minFrame || frameNumber > maxFrame) return;
        
        const normalizedFrame = frameNumber - this.startFrame;
        this.rotation = (normalizedFrame / this.totalFrames) * 360;
        this.currentFrame = frameNumber;
        this.updateImage(frameNumber);
    }

    /**
     * Resolve URL for a given frame
     */
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

// Export for use in modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Rotator360;
}

