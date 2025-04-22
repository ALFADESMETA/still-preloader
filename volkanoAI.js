// Create the overlay element
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
    background-color: #000000;
    z-index: 999;
`;

// Create logo image element
const logoImage = document.createElement('img');
logoImage.id = 'logoImage';
logoImage.src = 'https://firebasestorage.googleapis.com/v0/b/volkano-ai-project.appspot.com/o/only_logo_transparent.png?alt=media&token=8fd5374d-0e7e-4692-b6ec-4f340be4fdd5';
logoImage.style.cssText = `
    width: 200px;
    height: auto;
    object-fit: contain;
`;

// Create loading animation
const loadingAnimation = document.createElement('div');
loadingAnimation.style.cssText = `
    position: absolute;
    bottom: 30%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const loadingDots = document.createElement('div');
loadingDots.style.cssText = `
    display: flex;
    gap: 8px;
`;

// Create three loading dots
for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
        width: 12px;
        height: 12px;
        background-color: white;
        border-radius: 50%;
        animation: pulse 1.5s infinite ease-in-out;
        animation-delay: ${i * 0.2}s;
    `;
    loadingDots.appendChild(dot);
}

// Add keyframe animation for dots
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        50% {
            transform: scale(1.2);
            opacity: 1;
        }
    }
`;
document.head.appendChild(styleSheet);

// Append the elements
loadingAnimation.appendChild(loadingDots);
overlay.appendChild(logoImage);
overlay.appendChild(loadingAnimation);
document.body.appendChild(overlay);

// Log for debugging
console.log('Overlay and logo added to the DOM.');

// Function to hide the overlay when Flutter is ready
function hideOverlay() {
    overlay.style.display = 'none';
    console.log('Loader hidden');
}

// Make hideOverlay available globally
window.hideOverlay = hideOverlay;

// Add an event listener to hide the overlay after Flutter is initialized
// This needs to be called by your Flutter initialization code
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    // In a real implementation, this would be called by Flutter when ready
    // For testing, we'll use setTimeout
    setTimeout(hideOverlay, 5000);
});

// Fallback: If Flutter doesn't initialize properly
window.addEventListener('load', () => {
    console.log('Window load event fired');
    // Add a long timeout as a fallback
    setTimeout(() => {
        if (overlay.style.display !== 'none') {
            console.log('Fallback: Hiding overlay after timeout');
            hideOverlay();
        }
    }, 10000); // 10 seconds as a fallback
});
