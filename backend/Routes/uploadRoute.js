const express = require('express');
const router = express.Router();
const { upload } = require('../Config/cloudinary');

router.post('/resume', upload.single('resume'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        res.status(200).json({
            message: 'Upload successful',
            url: req.file.path,
        });
    } catch (error) {
        console.error('Error in resume upload:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
