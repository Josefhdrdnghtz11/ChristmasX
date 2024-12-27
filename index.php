<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Poetic Christmas Card</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://josefhdeindonesienboi.cloud/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
    <div class="animated-background"></div>
    <div class="card">
        <div class="card-front">
            <!-- Empty front page with just the Christmas card background -->
        </div>
        <div class="card-back">
            <div class="santa-button">
                <img src="asset/OtherCardBackgroundExceptFrontPage.png" alt="Take Santa Photo" id="santaBtn">
            </div>
            <div class="card-background"></div>
            <div class="card-content-wrapper">
                <div class="card-content">
                    <h1 class="card-header">Welcome to Your Poetic Christmas Adventure!</h1>
                    <img id="sceneImage" class="card-image img-fluid" src="" alt="Christmas Scene">
                    <p id="poem" class="card-poem mt-3"></p>
                    <div class="card-footer">
                        <button id="nextButton" class="btn btn-success btn-lg mt-4">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add preview container -->
    <div class="preview-container">
        <img id="previewImage" src="" alt="Preview">
    </div>

    <!-- Add upload button and container for uploaded image -->
    <div class="upload-button">
        <img src="asset/SantaWithAFactPlaceHolder.png" alt="Upload Your Picture">
    </div>

    <div class="uploaded-image-container" style="display: none;">
        <img class="uploaded-image" src="" alt="Uploaded Image">
        <img class="overlay" src="asset/TwibbonTemplate.png" alt="Overlay">
    </div>

    <div class="christmas-tree"></div>
    <div class="gift"></div>
    <audio id="backgroundMusic" loop>
        <source src="asset/Merry Christmas Darling!.mp3" type="audio/mpeg">
    </audio>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/snowfall-js/dist/snowfall.min.js"></script>
    <script src="https://josefhdeindonesienboi.cloud/script.js"></script>
    <script>
        $(document).ready(function() {
            $('#backgroundMusic')[0].play();
            $('#startMusicButton').on('click', function() {
                $('#backgroundMusic')[0].play();
                $(this).hide();
            });
            $(document).snowfall({ round: true, minSize: 1, maxSize: 5 });
        });
    </script>
</body>
</html>