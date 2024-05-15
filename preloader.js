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
    width: 100px;
    height: 100px;
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
    path: 'https://raw.githubusercontent.com/ALFADESMETA/still-preloader/main/Animation%20-%201715722968325.json', // Path to your Lottie animation JSON file
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
});

animation.addEventListener('DOMLoaded', () => {
    console.log('Lottie animation loaded successfully.');
});

// Function to hide the overlay
function hideOverlay() {
    console.log('Hiding overlay');
    overlay.style.display = 'none';
}

// Add an event listener to hide the overlay when all external JS files are loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    // Replace the following lines with the actual code that loads your external JS files
    // For demonstration purposes, we'll use a setTimeout to simulate loading external JS files.
    setTimeout(hideOverlay, 5000); // Replace with your actual loading code.
});

// Fallback: If all external resources are loaded and the DOMContentLoaded event doesn't fire,
// we'll still hide the overlay when the window's load event is triggered.
window.addEventListener('load', hideOverlay);
