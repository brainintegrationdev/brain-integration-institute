const axios = require('axios');

// Function to get user specific images from Cloudinary
const getImagesFromCloudinary = async (folder) => {
    const allAssets = [];

    try {
        const requestURL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`;
        console.log('Requesting from URL:', requestURL);
        console.log('Folder path:', folder);

        const authHeader = Buffer.from(
            `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`,
        ).toString('base64');

      
        const searchParams = {
            expression: `folder=${folder} AND resource_type:image`,
        };

        const cloudinaryResponse = await axios.post(requestURL, searchParams, {
            headers: {
                Authorization: `Basic ${authHeader}`,
                'Content-Type': 'application/json',
            },
        });

        const resources = cloudinaryResponse.data.resources;
        console.log('Fetched resources count:', resources.length);

        allAssets.push(...resources);
        return allAssets;
    } catch (error) {
        console.error(
            'Error fetching images from Cloudinary:',
            error.response?.data || error.message,
        );
        throw new Error('Failed to fetch images');
    }
};

const deleteImageFromCloudinary = async (folder) => {
    const { publicId } = req.body

}



module.exports = { getImagesFromCloudinary };
