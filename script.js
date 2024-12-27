const scenes = [
    {
        poem: "In the quiet of the night,\nSnowflakes fall, pure and white.\nWishing you peace and light,\nMerry Christmas, all is right.",
        image: "https://source.unsplash.com/featured/?winter,night"
    },
    {
        poem: "By the fire's gentle glow,\nMemories of joy we sow.\nIn this season, love will grow,\nMerry Christmas, warmth we know.",
        image: "https://source.unsplash.com/featured/?cabin,christmas"
    },
    {
        poem: "Amidst the twinkling lights,\nHope and cheer reach new heights.\nMerry Christmas, hearts take flight,\nIn this season, all feels right.",
        image: "https://source.unsplash.com/featured/?christmas,market"
    },
    {
        poem: "Under stars so clear and bright,\nDreams and wishes take their flight.\nMerry Christmas, pure delight,\nIn this moment, all is light.",
        image: "https://source.unsplash.com/featured/?starry,night"
    },
    {
        poem: "As the year comes to a close,\nGratitude and love compose.\nMerry Christmas, joy bestows,\nIn our hearts, the warmth still glows.",
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
const christmasSong = new Audio('asset/All I Want for Christmas Is You.mp3');

function updateCard() {
    cardHeader.textContent = "Merry Christmas!";
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
    christmasSong.pause(); // Stop "All I Want for Christmas Is You"
    christmasSong.currentTime = 0; // Reset the song
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

// Image upload functionality
const uploadButton = document.querySelector('.upload-button');
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
const uploadedImageContainer = document.querySelector('.uploaded-image-container');
const uploadedImage = document.querySelector('.uploaded-image');

uploadButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw the uploaded image
                context.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Draw the overlay
                const overlay = new Image();
                overlay.src = 'asset/TwibbonTemplate.png';
                overlay.onload = () => {
                    context.drawImage(overlay, 0, 0, canvas.width, canvas.height);
                    uploadedImage.src = canvas.toDataURL();
                    uploadedImageContainer.style.display = 'block';
                    // Remove the overlay image element
                    const overlayImg = uploadedImageContainer.querySelector('.overlay');
                    if (overlayImg) {
                        overlayImg.remove();
                    }
                    // Play the song
                    backgroundMusic.pause(); // Stop "Merry Christmas Darling!"
                    backgroundMusic.currentTime = 0; // Reset the song
                    christmasSong.play().catch(error => console.log("Audio play failed:", error));

                    // Save the image to the database
                    saveImageToDatabase(canvas.toDataURL());
                };
            };
        };
        reader.readAsDataURL(file);
    }
});

function saveImageToDatabase(imageData) {
    // Ensure the base64 data is correctly formatted before sending it to the server
    const base64Data = imageData.split(',')[1];
    fetch('https://josefhdeindonesienboi.cloud/save-image', { // Updated URL to use HTTPS
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest' // Custom header to force HTTP/1.1
        },
        body: JSON.stringify({ image: base64Data })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Image saved successfully:', data.fileName);
        } else {
            console.log('Failed to save image:', data.message);
        }
    })
    .catch(error => console.log('Error:', error));
}