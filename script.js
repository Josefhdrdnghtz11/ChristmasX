const scenes = [
    {
        poem: "In the hush of winter's night,\nLove's warmth glows, a soft delight.\nUnderneath the stars so bright,\nMerry Christmas, my heart takes flight.",
        image: "https://source.unsplash.com/featured/?winter,night"
    },
    {
        poem: "In a cabin snug, with hearts aglow,\nTogether we share the warmth of snow.\nWith every laugh, our spirits grow,\nMerry Christmas, let love flow.",
        image: "https://source.unsplash.com/featured/?cabin,christmas"
    },
    {
        poem: "Among the lights, our laughter rings,\nIn every gift, a love that sings.\nMerry Christmas, my heart it clings,\nTo you, my dear, the joy it brings.",
        image: "https://source.unsplash.com/featured/?christmas,market"
    },
    {
        poem: "Underneath the starlit sky,\nI make a wish, just you and I.\nMerry Christmas, let love fly,\nTogether, forever, you and I.",
        image: "https://source.unsplash.com/featured/?starry,night"
    },
    {
        poem: "As this journey comes to an end,\nKnow that you are my dearest friend.\nMerry Christmas, my heart will send,\nA wish for love that will never bend.",
        image: "https://source.unsplash.com/featured/?love,christmas"
    }
];

let currentScene = 0;

const cardContent = document.querySelector('.card-content');
const cardHeader = document.querySelector('.card-header');
const cardImage = document.querySelector('.card-image');
const cardPoem = document.querySelector('.card-poem');
const nextButton = document.querySelector('#nextButton');
const card = document.querySelector('.card');
const backgroundMusic = document.getElementById('backgroundMusic');

function updateCard() {
    cardHeader.textContent = `Scene ${currentScene + 1}`;
    cardPoem.textContent = scenes[currentScene].poem;
    cardImage.src = scenes[currentScene].image;
    cardContent.classList.add('fade-in');
    setTimeout(() => {
        cardContent.classList.remove('fade-in');
    }, 1000);
}

function createSnowflakes() {
    const snowflakeCount = 50;
    const sizes = ['small', 'medium', 'large'];
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        snowflake.classList.add('snowflake', `snowflake-${size}`);
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDelay = `${Math.random() * 10}s`;
        document.body.appendChild(snowflake);
    }
}

card.addEventListener('click', () => {
    card.classList.toggle('open'); // Toggle the open class
    backgroundMusic.play().catch(error => console.log("Audio play failed:", error));
    setTimeout(() => {
        cardContent.classList.add('active');
    }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    updateCard();
    createSnowflakes();
});

nextButton.addEventListener('click', () => {
    currentScene = (currentScene + 1) % scenes.length;
    updateCard();
});

// Camera functionality
const santaPhotoBtn = document.querySelector('.santa-photo-btn');
const cameraModal = document.querySelector('.camera-modal');
const cameraView = document.getElementById('cameraView');
const photoCanvas = document.getElementById('photoCanvas');
const takePhotoBtn = document.getElementById('takePhotoBtn');
const retakePhotoBtn = document.getElementById('retakePhotoBtn');
const savePhotoBtn = document.getElementById('savePhotoBtn');
const closeCameraBtn = document.getElementById('closeCameraBtn');

let stream = null;

const santaBtn = document.getElementById('santaBtn');
const templateOverlay = document.getElementById('templateOverlay');
const previewContainer = document.querySelector('.preview-container');
const previewImage = document.getElementById('previewImage');

santaBtn.addEventListener('click', async () => {
    cameraModal.style.display = 'flex';
    try {
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: "user",
                width: { ideal: 1280 },
                height: { ideal: 720 }
            } 
        });
        cameraView.srcObject = stream;
        
        // Set template size to match camera view
        setTimeout(() => {
            templateOverlay.style.width = cameraView.offsetWidth + 'px';
            templateOverlay.style.height = cameraView.offsetHeight + 'px';
        }, 100);
    } catch (err) {
        console.error('Camera error:', err);
        alert('Unable to access camera');
    }
});

takePhotoBtn.addEventListener('click', () => {
    const context = photoCanvas.getContext('2d');
    photoCanvas.width = cameraView.videoWidth;
    photoCanvas.height = cameraView.videoHeight;
    
    // Draw the video frame
    context.drawImage(cameraView, 0, 0, photoCanvas.width, photoCanvas.height);

    // Delay drawing overlay
    setTimeout(() => {
        context.drawImage(templateOverlay, 0, 0, photoCanvas.width, photoCanvas.height);
        // Show preview
        previewImage.src = photoCanvas.toDataURL();
        // ...existing code...
        previewContainer.style.display = 'block';
    
        // Update UI
        takePhotoBtn.style.display = 'none';
        retakePhotoBtn.style.display = 'inline';
        savePhotoBtn.style.display = 'inline';
        cameraView.style.display = 'none';
        photoCanvas.style.display = 'block';
    }, 100);
});

retakePhotoBtn.addEventListener('click', () => {
    cameraView.style.display = 'block';
    photoCanvas.style.display = 'none';
    savePhotoBtn.style.display = 'none';
});

savePhotoBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'santa-photo.png';
    link.href = photoCanvas.toDataURL();
    link.click();
});

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    cameraView.srcObject = null;
    photoCanvas.style.display = 'none';
    cameraView.style.display = 'block';
    takePhotoBtn.style.display = 'inline';
    retakePhotoBtn.style.display = 'none';
    savePhotoBtn.style.display = 'none';
    previewContainer.style.display = 'none';
}

// Clean up when the page is unloaded
window.addEventListener('beforeunload', stopCamera);