const ex = require('express');
// const { processFile } = require('../middleware/cdn');
const {
    getUserMetaData,
    createUserMetaData,
    editUserMetaData,
} = require('../services/user');
const { UserModel } = require('../models/User');

const userRouter = ex.Router();


//route which creates user metadata post request on first sign in by new user
userRouter.post('/createuser', async (req, res) => {
    const { userEmail, userName, userProfilePicture } = req.body;

    try {
        let userMetaData = await UserModel.findOne({ userEmail });

        if (!userMetaData) {
            userMetaData = new UserModel({
                userEmail,
                userName,
                userProfilePicture: userProfilePicture || '',
                userUploadProgress: 0,
            
            });

            await userMetaData.save();

            return res
                .status(201)
                .json({ message: 'User metadata created', userMetaData });
        }

        return res
            .status(200)
            .json({ message: 'User metadata exists', userMetaData });
    } catch (error) {
        console.error('Error checking or creating user metadata:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

userRouter.get('/:email', async (req, res) => {
    const { email } = req.params;
    console.log('Received email param:', email);
    try {
        const userMetaData = await getUserMetaData(email);
        if (!userMetaData) {
            return res.status(404).json({ message: 'user not found' });
        }
        return res.status(200).json(userMetaData);
    } catch (error) {
        console.error('Error fetching user metadata', error);
        res.status(500).json({ error: 'Failed to send user metadata' });
    }
});

// Route to update user progress
userRouter.put('/:email/progress', async (req, res) => {
    const { userUploadProgress } = req.body;
    const { email } = req.params; // Extracting email from request parameters
    console.log('Request body:', req.body);
    console.log('Email to find:', email); // Log the email being searched

    if (
        userUploadProgress === undefined ||
        typeof userUploadProgress !== 'number'
    ) {
        return res.status(400).json({
            error: 'userUploadProgress is required and must be a number',
        });
    }

    try {
        const user = await UserModel.findOneAndUpdate(
            { userEmail: email }, // Updated to match the correct field name
            {  userUploadProgress  }, // Increment the userUploadProgress field
            { new: true, runValidators: true },
        );

        console.log('User found:', user); // Log the found user (or null if not found)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error); // Log error details
        res.status(500).json({ error: error.message });
    }
});

module.exports = userRouter;

module.exports = {
    userRouter,
};
