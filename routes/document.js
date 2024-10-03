//routes for docs on cloudinary (not metadata)
const ex = require('express');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const { validateAuthToken } = require('../middleware/auth.js'
)
const { getImagesFromCloudinary } = require('../services/document');
const documentRouter = ex.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary credentials", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing',
  });

  documentRouter.get('/:nickname', validateAuthToken, async (req, res) => {
    const nickname = req.params.nickname;
    const folder = `users/${nickname}`;
    console.log('Fetching images from folder:', folder);
    try {
        const images = await getImagesFromCloudinary(folder);
        console.log('fetching images')
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch images from Cloudinary' });
    }
});




module.exports = {
    documentRouter,
};

