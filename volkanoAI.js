// Create the overlay element
const loaderOverlay = document.createElement('div');
loaderOverlay.id = 'volkanoLoader';
loaderOverlay.style.cssText = `
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
const loaderLogo = document.createElement('img');
loaderLogo.id = 'volkanoLoaderLogo';
loaderLogo.src = 'https://firebasestorage.googleapis.com/v0/b/volkano-ai-project.appspot.com/o/only_logo_transparent.png?alt=media&token=8fd5374d-0e7e-4692-b6ec-4f340be4fdd5';
loaderLogo.style.cssText = `
    width: 200px;
    height: auto;
    object-fit: contain;
`;

// Create loading animation
const loaderAnimation = document.createElement('div');
loaderAnimation.style.cssText = `
    position: absolute;
    bottom: 30%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const loaderDots = document.createElement('div');
loaderDots.style.cssText = `
    display: flex;
    gap: 8px;
`;

// Create three loading dots
for (let i = 0; i < 3; i++) {
    const loaderDot = document.createElement('div');
    loaderDot.style.cssText = `
        width: 12px;
        height: 12px;
        background-color: white;
        border-radius: 50%;
        animation: volkanoLoaderPulse 1.5s infinite ease-in-out;
        animation-delay: ${i * 0.2}s;
    `;
    loaderDots.appendChild(loaderDot);
}

// Add keyframe animation for dots
// Use a unique name for the style element to avoid conflicts
const loaderStyleSheet = document.createElement('style');
loaderStyleSheet.id = 'volkanoLoaderStyles';
loaderStyleSheet.textContent = `
    @keyframes volkanoLoaderPulse {
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
document.head.appendChild(loaderStyleSheet);

// Append the elements
loaderAnimation.appendChild(loaderDots);
loaderOverlay.appendChild(loaderLogo);
loaderOverlay.appendChild(loaderAnimation);
document.body.appendChild(loaderOverlay);

// Log for debugging
console.log('Volkano loader overlay and logo added to the DOM.');

// Function to hide the overlay when Flutter is ready
function hideVolkanoLoader() {
    const loaderElement = document.getElementById('volkanoLoader');
    if (loaderElement) {
        loaderElement.style.display = 'none';
        console.log('Volkano loader hidden');
    }
}

// Make hideOverlay available globally
window.hideVolkanoLoader = hideVolkanoLoader;

// Add an event listener to hide the overlay after Flutter is initialized
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired in Volkano loader');
    // In a real implementation, this would be called by Flutter when ready
    // For testing, we'll use setTimeout
    setTimeout(hideVolkanoLoader, 5000);
});

// Fallback: If Flutter doesn't initialize properly
window.addEventListener('load', () => {
    console.log('Window load event fired in Volkano loader');
    // Add a long timeout as a fallback
    setTimeout(() => {
        hideVolkanoLoader();
    }, 10000); // 10 seconds as a fallback
});
