const axios = require('axios');

// Function to get images from Cloudinary
const getImagesFromCloudinary = async (folder) => {
    console.log('Fetching images from Cloudinary in folder:', folder);
    try {
        // Create Basic Auth header
        const authHeader = Buffer.from(
            `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`,
        ).toString('base64');

        // Make GET request to Cloudinary API to get images in the specified folder
        const response = await axios.get(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/upload`,
            {
                params: {
                    prefix: folder, // Folder path to fetch images from
                },
                headers: {
                    Authorization: `Basic ${authHeader}`,
                },
            },
        );
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error(
            'Error fetching images:',
            error.response?.data || error.message,
        );
        res.status(500).json({ error: 'Failed to fetch images' });
    }
};

module.exports = { getImagesFromCloudinary };
