const axios = require('axios');
const Certificate = require('../models/certificate');

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

const getCertificateFromCloudinary = async () => {
    try {
        const requestURL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`;
        console.log('Requesting from URL:', requestURL);

        const searchParams = {
            expression: `folder=certificate`,
        };

        const cloudinaryResponse = await axios.post(requestURL, searchParams, {
            headers: {
                Authorization: `Basic ${authHeader}`,
                'Content-Type': 'application/json',
            },
        });

        const resource = cloudinaryResponse.data.resources;

        return resource;
    } catch (error) {
        console.error(
            'Error fetching certificate from Cloudinary:',
            error.response?.data || error.message,
        );
        throw new Error('Failed to fetch images');
    }
};

const createCertificate = async (certificateData) => {
    const certificate = new Certificate(certificateData);
    await certificate.save();
    return certificate;
};

module.exports = {
    getImagesFromCloudinary,
    getCertificateFromCloudinary,
    createCertificate,
};
