const { ProfileModel } = require('../models/profile');

const createProfileData = async (data) => {
    const profile = new ProfileModel(data);
    await profile.save();
    return profile;
};


module.exports = {
    createProfileData
};
