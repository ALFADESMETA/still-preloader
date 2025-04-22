// Create the overlay element.
const overlay = document.createElement('div');
overlay.id = 'loader';
overlay.style.cssText = `
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 999;
`;

// Create the Lottie animation container
const lottieContainer = document.createElement('div');
lottieContainer.id = 'lottieContainer';
lottieContainer.style.cssText = `
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// Append the elements to the body
overlay.appendChild(lottieContainer);
document.body.appendChild(overlay);
console.log('Overlay and Lottie container added to the DOM.');

// Initialize animation function with safety check
function initAnimation() {
    if (typeof lottie !== 'undefined') {
        try {
            const animation = lottie.loadAnimation({
                container: lottieContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'https://alfadesmeta.github.io/still-preloader/Animation-AI.json',
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                }
            });
            
            animation.addEventListener('DOMLoaded', () => {
                console.log('Lottie animation loaded successfully.');
            });
            
            animation.addEventListener('error', (error) => {
                console.error('Lottie animation error:', error);
            });
        } catch (error) {
            console.error('Error initializing Lottie animation:', error);
        }
    } else {
        console.error('Lottie library not found. Make sure it is loaded before this script.');
    }
}

// Function to hide the overlay
function hideOverlay() {
    if (overlay && overlay.style && overlay.style.display !== 'none') {
        overlay.style.display = 'none';
        console.log('Overlay hidden');
    }
}

// Make hideOverlay available globally so it can be called from HTML
window.hideOverlay = hideOverlay;

// Initialize animation when document is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    initAnimation();
    
    // Don't hide overlay here, wait for Flutter
});

// Hide overlay when Flutter renders its first frame
window.addEventListener('flutter-first-frame', () => {
    console.log('Flutter first frame rendered');
    hideOverlay();
});

// Fallback: If Flutter event doesn't fire, hide after a timeout
window.addEventListener('load', () => {
    console.log('Window load event fired');
    // Use a longer timeout to give Flutter more time to initialize
    setTimeout(() => {
        console.log('Fallback timeout triggered');
        hideOverlay();
    }, 15000); // 15 seconds fallback
});

// Initialize animation immediately in case script runs after DOM is already loaded
initAnimation();
