const ex = require('express');
// const { processFile } = require('../middleware/cdn');
const { createProfileData } = require('../services/profile');
const { ProfileModel } = require('../models/profile');

const profileRouter = ex.Router();

profileRouter.post('/create-profile', async (req, res) => {
    const {
        firstName,
        middleName,
        lastName,
        suffix,
        phoneNumber,
        email,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
    } = req.body;
    try {
        let profileData = await ProfileModel.findOne({ email });
        if (!profileData) {
            profileData = new ProfileModel({
                firstName,
                middleName,
                lastName,
                suffix,
                phoneNumber,
                email,
                addressLine1,
                addressLine2,
                city,
                state,
                country,
            });
            await profileData.save();
            return res
                .status(201)
                .json({ message: 'User profile created', profileData });
        }
        return res.status(200).json({ userMetaData });
    } catch (error) {
        console.error('Error creating profile data:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = {
    profileRouter,
};




