const { UserModel } = require('../models/User'); // Destructure to get UserModel



const createUserMetaData = async (metadata) => {
    const user = new UserModel(metadata)
    await user.save()
    return user
}

const getUserMetaData = async (email) => {
    
    const user = await UserModel.findOne({ 
     userEmail: email 
    });
    console.log(user, "user")
    return user; 
};

const editUserMetaData = async (email) => {
    const user = await UserModel.findOne({
        userEmail: email
    })
}

module.exports = {
    getUserMetaData,
    createUserMetaData,
    editUserMetaData
};