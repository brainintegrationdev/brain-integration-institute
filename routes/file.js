const ex = require('express');
// const { processFile } = require('../middleware/cdn');
const { getAllFilesByOwner, createFile } = require('../services/file');
const { File } = require('../models/file');

const fileRouter = ex.Router();

//fetches user's file metadata collection:
// fileRouter.get('/', async (req, res, next) => {
//     try {
//         const files = await getAllFilesByOwner(req.auth.payload.sub);
//         res.status(200).send({ success: true, files });
//     } catch (err) {
//         console.error(err);
//         res.status(500);
//         next(err);
//     }
// });

// const axios = require('axios');
// const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
// const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}resources/image`;

// //CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dpbf9gwjq
// const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
// const CLOUDINARY_API_SECRET =  process.env.CLOUDINARY_API_SECRET

// // const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`;

// const getCloudinaryFiles = async () => {
//   try {
//     const response = await axios.get(CLOUDINARY_URL, {
//       auth: {
//         username: apiKey,   // Cloudinary API Key
//         password: apiSecret// Cloudinary API Secret
//       }
//     });
//     console.log('Files:', response.data.resources);  // Log files
//     return response.data.resources;
//   } catch (error) {
//     console.error('Error fetching Cloudinary files:', error.response.data);
//     throw error;
//   }
// };

// getCloudinaryFiles()

// fileRouter.get('/api/files', async (req, res) => {
//     try {
      
//       const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image`;
  
     
//       const response = await axios.get(url, {
//         auth: {
//           username: CLOUDINARY_API_KEY,
//           password: CLOUDINARY_API_SECRET,
//         },
//       });
  
    
//       res.status(200).json(response.data.resources);
//     } catch (error) {
//       console.error('Error fetching files from Cloudinary:', error);
//       res.status(500).json({ message: 'Failed to fetch files from Cloudinary' });
//     }
//   });

// // fileRouter.get('/api/cloudinary/files', async (req, res) => {
// //     try {
// //       const response = await axios.get(CLOUDINARY_URL, {
// //         params: {
// //           prefix: 'your-folder-name',
// //           max_results: 500,
// //         },
// //         auth: {
// //           username: CLOUDINARY_API_KEY,
// //           password: CLOUDINARY_API_SECRET,
// //         },
// //       });
  
// //       res.json(response.data.resources); // Return the file data from Cloudinary
// //     } catch (error) {
// //       console.error('Error fetching files from Cloudinary:', error);
// //       res.status(500).json({ error: 'Error fetching files' });
// //     }
// //   });
  

// //will need to create GET route to get all files by user ID
// //will need to create GET route to get all files (for admin)
// //will need to create DELETE route to delete by public ID - will also need to perform callback to delete 
// //the associated metadata once the file itself is deleted
// //add delete event to the blue button on accordion section
// //disable upload button on each section if a doc is already uploaded, except Brain Integration Training section

// // Uploads a single file from the 'file' field on request body form-data:
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

// // fileRouter.post('/',processFile('file'),  async (req, res, next) => {

// //     try {
// //               // Check if file was uploaded
// //               if (!req.file) {
// //                 return res.status(400).json({ error: 'No file uploaded' });
// //             }

// //             // Log the uploaded file
// //             console.log('Uploaded file:', req.file);

// //             // Extract file data from req.file (stored in memory)
// //             const { buffer, originalname } = req.file;
// //         console.log('Request Headers:', req.headers);
// //         console.log('Request Body:', req.body);

// //         const { publicId, url, uploadDate, filename, isApproved } = req.body;

// //         if (!publicId || !url || !uploadDate || !filename) {
// //             return res.status(400).json({ error: 'Missing required fields' });
// //         }
// //         // Continue with saving the file metadata
// //         createFile()
// //         res.status(201).json({ message: 'File metadata saved.' });
// //     } catch (error) {
// //         console.error('Error processing request:', error);
// //         res.status(500).json({ error: 'Server error' });

// //     }
// // });
// //get files by userID
// fileRouter.get('/api/files', async (req, res) => {
//     const userId = req.auth.payload.sub
//     console.log(userId)
//     try {
//         const result = await cloudinary.api.resources({
//             type: 'upload',
//             prefix: `users/${userId}/`,
//             resource_type: 'auto'
//         });
//         res.status(200).json(result.resources);
//     } catch (error) {
//         res.status(500).send('Error fetching files');
//     }
// });


// //creates metadata upon successful cloudinary upload

fileRouter.post('/', async (req, res) => {
    try {
        const { publicId, url, uploadDate, filename, isApproved, sectionName } = req.body;

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
