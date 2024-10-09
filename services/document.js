const axios = require('axios');

// Function to get images from Cloudinary
const getImagesFromCloudinary = async (folder) => {
    const allAssets = [];

    try {
        const requestURL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`;
        console.log('Requesting from URL:', requestURL);
        console.log('Folder path:', folder);

        const authHeader = Buffer.from(
            `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`,
        ).toString('base64');

        // Search parameters to only get images from the specific folder
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

//delete one request
//https://api.cloudinary.com/v1_1/:cloud_name/image/destroy endpoint
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;

function generateSignature(publicId, timestamp) {
    const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
    return crypto.createHash('sha1').update(paramsToSign).digest('hex');
}

module.exports = { getImagesFromCloudinary };
