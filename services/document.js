const axios = require('axios');

// Function to get images from Cloudinary
const getImagesFromCloudinary = async (folder) => {
    const allAssets = [];
    let nextCursor = null;

    try {
        const requestURL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/upload`;
        console.log('Requesting from URL:', requestURL);
        console.log('Folder path (prefix):', folder);

        const authHeader = Buffer.from(
            `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
        ).toString('base64');
        console.log('Authorization Header:', `Basic ${authHeader}`);
        do {
            console.log('Entering the `do` block');

            const cloudinaryResponse = await axios.get(requestURL, {
                params: {
                    asset_folder: folder,
                    max_results: 100,
                    ...(nextCursor && { next_cursor: nextCursor })  // Pagination if needed
                },
                headers: {
                    Authorization: `Basic ${authHeader}`
                }
            });

            console.log('Inside `do` block - Cloudinary Response:', cloudinaryResponse.data);

            const { resources, next_cursor } = cloudinaryResponse.data;
            console.log('Fetched resources count:', resources ? resources.length : 0);
            console.log('Next cursor:', next_cursor);  // Log next cursor

            allAssets.push(...resources);
            nextCursor = next_cursor;

        } while (nextCursor);

        console.log('Total assets fetched:', allAssets.length);
        return allAssets;

    } catch (error) {
        console.error('Error fetching images from Cloudinary:', error.response?.data || error.message);
        throw new Error('Failed to fetch images');
    }
};

  


module.exports = { getImagesFromCloudinary };
