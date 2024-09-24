const ex = require('express');
const { processFile } = require('../middleware/cdn');
const { getAllFilesByOwner, createFile } = require('../services/file');

const fileRouter = ex.Router();

// fetches user's file metadata collection:
fileRouter.get('/', async (req, res, next) => {
    try {
        const files = await getAllFilesByOwner(req.auth.payload.sub);
        res.status(200).send({ success: true, files })
    } catch (err) {
        console.error(err);
        res.status(500);
        next(err)
    }
})

// Uploads a single file from the 'file' field on request body form-data:
// fileRouter.post('/', processFile('file'), async (req, res, next) => {
//     try {
//         const file = await createFile({
//             filename: req.body.filename,
//             owner: req.auth.payload.sub,
//             file: req.file
//         })
//         res.status(200).send({ success: true, file })
//     } catch (err) {
//         console.error(err);
//         res.status(500);
//         next(err)
//     }
// })

fileRouter.post('/', async (req, res, next) => {
    try {
        console.log('Request Headers:', req.headers);
        console.log('Request Body:', req.body);
        console.log('Uploaded file metadata:', req.file);

        const { publicId, url, uploadDate, filename, isApproved } = req.body;

        if (!publicId || !url || !uploadDate || !filename) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Continue with saving the file metadata
        const file = new File({
            publicId,
            url,
            uploadDate,
            filename,
            isApproved,
        });

        await file.save();
        res.status(201).json({ message: 'File metadata saved.' });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Server error' });
        next(error);
    }
});



module.exports = {
    fileRouter
}