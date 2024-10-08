const ex = require('express');
// const { processFile } = require('../middleware/cdn');
const { getAllFilesByOwner, createFile } = require('../services/file');
const { File } = require('../models/file');

const fileRouter = ex.Router();

// fileRouter.get('/health', (req, res) => {
//     res.status(200).json({ message: 'API is working!' });
// });

fileRouter.get('/files/:user', async (req, res) => {
    try {
        const { user } = req.params; // Expecting the userId to be passed as a route parameter
        const files = await getAllFilesByOwner(user); // Call the modified function
        res.json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ error: 'Failed to fetch files' });
    }
});

fileRouter.get('/', async (req, res, next) => {
    try {
        const files = await getAllFilesByOwner(req.auth.payload.sub);
        res.status(200).send({ success: true, files });
    } catch (err) {
        console.error(err);
        res.status(500);
        next(err);
    }
 });
 







// //creates metadata upon successful cloudinary upload

fileRouter.post('/', async (req, res) => {
    try {
        const { publicId, url, uploadDate, filename, sectionName } = req.body;

        if (!publicId || !url || !uploadDate || !filename) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const fileMetadata = await createFile({
            filename,
            user: req.auth.payload.sub,
            publicId,
            url,
            uploadDate,
            isApproved: false,
            sectionName
        });

        res.status(201).json({ success: true, fileMetadata  });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = {
    fileRouter,
};
