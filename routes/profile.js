const ex = require('express');
// const { processFile } = require('../middleware/cdn');
const { createProfileData } = require('../services/profile');
const { ProfileModel } = require('../models/profile');
const { UserModel } = require('../models/User');

const profileRouter = ex.Router();

//create get request to get profile info by user (eg, email)
//call get request in useEffect in the profile page
//if !profileData - render text to create profile - post request is submitted on form submit
//if profileData -  render text to edit profile - put request is submitted on form submit

//create put request for profile data

profileRouter.get('/:email', async (req, res) => {
    const { email } = req.params;
    console.log('Received email param:', email);
    try {
        const user = await UserModel.findOne({ userEmail: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const profileData = await ProfileModel.findOne({ userId: user._id });
        if (!profileData) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(profileData);
    } catch (error) {
        console.error('Error fetching profile data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// userRouter.get('/:email', async (req, res) => {
//     const { email } = req.params;
//     console.log('Received email param:', email);
//     try {
//         const userMetaData = await getUserMetaData(email);
//         if (!userMetaData) {
//             return res.status(404).json({ message: 'user not found' });
//         }
//         return res.status(200).json(userMetaData);
//     } catch (error) {
//         console.error('Error fetching user metadata', error);
//         res.status(500).json({ error: 'Failed to send user metadata' });
//     }
// });

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
        zip,
        country,
        bio,
    } = req.body;
    
    console.log(req.body);
    try {
        // Find the user by their email to get the userId
        const user = await UserModel.findOne({ userEmail: email }); // Assuming the userEmail is used to find the user
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the profile already exists for the user
        let profileData = await ProfileModel.findOne({ userId: user._id });
        if (!profileData) {
            // Create the profile with the userId from the User model
            profileData = new ProfileModel({
                userId: user._id, // Set the userId here
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
                zip,
                country,
                bio,
            });
            await profileData.save();
            return res.status(201).json({
                success: true,
                message: 'User profile created',
                profileData,
            });
        }
        return res.status(200).json({ success: true, profileData });
    } catch (error) {
        console.error('Error creating profile data:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});


module.exports = {
    profileRouter,
};
