const axios = require('axios');

// Function to get images from Cloudinary
const getImagesFromCloudinary = async (folder) => {
    const allAssets = [];
    let nextCursor = null;

    try {
        // Create Basic Auth header
        const authHeader = Buffer.from(
            `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`,
        ).toString('base64');

        do {
            // Make GET request to Cloudinary API to get images in the specified folder
            const response = await axios.get(
                `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/upload`,
                {
                    params: {
                        prefix: folder, // Folder path to fetch images from
                        max_results: 100, // Increase to 100 for maximum results per call
                        next_cursor: nextCursor, // Use next_cursor for pagination if present
                    },
                    headers: {
                        Authorization: `Basic ${authHeader}`,
                    },
                },
            );

            // Collect the resources returned in this batch
            allAssets.push(...response.data.resources);

            // If there's a next_cursor in the response, use it for the next request
            nextCursor = response.data.next_cursor || null;
        } while (nextCursor); // Continue fetching while there's a next_cursor

        console.log('All assets:', allAssets);
        return allAssets;
    } catch (error) {
        console.error('Error fetching assets from Cloudinary:', error);
        throw error;
    }
};

module.exports = { getImagesFromCloudinary };
