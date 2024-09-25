const ex = require('express');
// const { processFile } = require('../middleware/cdn');
const { getAllFilesByOwner, createFile } = require('../services/file');
const { File } = require('../models/file');

const fileRouter = ex.Router();

// fetches user's file metadata collection:
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

// Uploads a single file from the 'file' field on request body form-data:
// fileRouter.post('/', processFile('file'), async (req, res, next) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }
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

// fileRouter.post('/',processFile('file'),  async (req, res, next) => {

//     try {
//               // Check if file was uploaded
//               if (!req.file) {
//                 return res.status(400).json({ error: 'No file uploaded' });
//             }

//             // Log the uploaded file
//             console.log('Uploaded file:', req.file);

//             // Extract file data from req.file (stored in memory)
//             const { buffer, originalname } = req.file;
//         console.log('Request Headers:', req.headers);
//         console.log('Request Body:', req.body);

//         const { publicId, url, uploadDate, filename, isApproved } = req.body;

//         if (!publicId || !url || !uploadDate || !filename) {
//             return res.status(400).json({ error: 'Missing required fields' });
//         }
//         // Continue with saving the file metadata
//         createFile()
//         res.status(201).json({ message: 'File metadata saved.' });
//     } catch (error) {
//         console.error('Error processing request:', error);
//         res.status(500).json({ error: 'Server error' });

//     }
// });

fileRouter.post('/', async (req, res) => {
    try {
        const { publicId, url, uploadDate, filename, isApproved } = req.body;

        if (!publicId || !url || !uploadDate || !filename) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const fileMetadata = await createFile({
            filename,
            owner: req.auth.payload.sub,
            publicId,
            url,
            uploadDate,
            isApproved: false,
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
