const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

// Update CORS settings
app.use(cors({
    origin: 'https://josefhdeindonesienboi.cloud', // Updated to HTTPS
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'X-Requested-With']
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'jost6213_root',
    password: 'q!}R&HlVq($7', // Updated password
    database: 'jost6213_christmasx' // Ensure this matches the correct database name
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/save-image', (req, res) => {
    try {
        const imageData = req.body.image;
        if (!imageData) {
            throw new Error('No image data received');
        }

        const fileName = `photo_${Date.now()}.png`;
        // Use relative path from where server.js is located
        const photosDir = './asset/photos';
        const filePath = path.join(photosDir, fileName);

        // Debug logs
        console.log('Working directory:', process.cwd());
        console.log('Absolute path:', path.resolve(filePath));
        console.log('User:', process.getuid(), process.getgid());
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(photosDir)) {
            console.log('Photos directory does not exist. Creating...');
            fs.mkdirSync(photosDir, { recursive: true, mode: 0o755 });
            console.log('Photos directory created.');
        } else {
            console.log('Photos directory already exists.');
        }

        // Write file synchronously to catch any immediate errors
        try {
            console.log('Writing file to:', filePath);
            fs.writeFileSync(filePath, imageData, {
                encoding: 'base64',
                mode: 0o644
            });
            console.log('File written successfully');
        } catch (writeError) {
            console.error('Write error:', writeError);
            throw writeError;
        }

        // Verify file was created
        if (!fs.existsSync(filePath)) {
            throw new Error('File was not created');
        } else {
            console.log('File exists at:', filePath);
        }

        // Database operation
        const query = 'INSERT INTO uploaded_images (image_data) VALUES (?)';
        db.query(query, [fileName], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            res.json({ 
                success: true, 
                fileName: fileName,
                absolutePath: path.resolve(filePath),
                fileSize: fs.statSync(filePath).size
            });
        });

    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            stack: error.stack,
            cwd: process.cwd()
        });
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

const PORT = process.env.PORT || 8080; // Change to a different port

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    console.error('Server error:', err);
    // If port is in use, try the next port
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is busy, trying port ${PORT + 1}`);
        app.listen(PORT + 1);
    }
});

// Ensure the server is running and accessible at http://yourdomain.com
