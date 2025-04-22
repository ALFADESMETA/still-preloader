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
    background-color: black;
    z-index: 999;
`;

// Create the Lottie animation container with LARGER size
const lottieContainer = document.createElement('div');
lottieContainer.id = 'lottieContainer';
lottieContainer.style.cssText = `
    width: 300px;  /* Increased from 150px */
    height: 300px; /* Increased from 150px */
    display: flex;
    justify-content: center;
    align-items: center;
`;

// Append the elements to the body
overlay.appendChild(lottieContainer);
document.body.appendChild(overlay);

// Log for debugging
console.log('Overlay and Lottie container added to the DOM.');

// Load the Lottie animation
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

// Function to hide the overlay
function hideOverlay() {
    if (overlay.style.display !== 'none') {
        overlay.style.display = 'none';
        console.log('Overlay hidden');
    }
}

// Make hideOverlay available globally
window.hideOverlay = hideOverlay;

// Add an event listener to hide the overlay after a delay
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    setTimeout(hideOverlay, 10000); // Increased to 10 seconds for more visibility
});

// Fallback: If DOMContentLoaded doesn't fire, hide on window load
window.addEventListener('load', () => {
    setTimeout(hideOverlay, 2000); // Additional 2 second buffer after load
});
