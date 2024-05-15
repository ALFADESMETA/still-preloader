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

// Load the Lottie animation
const animation = lottie.loadAnimation({
    container: lottieContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://alfadesmeta.github.io/still-preloader/animation.json', // Path to your Lottie animation JSON file
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

// Add an event listener to hide the overlay when all external JS files are loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    setTimeout(hideOverlay, 500); // Adjust the time as needed for testing
});

// Fallback: If all external resources are loaded and the DOMContentLoaded event doesn't fire,
// we'll still hide the overlay when the window's load event is triggered.
window.addEventListener('load', hideOverlay);
