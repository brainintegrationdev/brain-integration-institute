const mg = require('mongoose');


const ProfileSchema = new mg.Schema({
    firstName: { 
        type: String,
        required: true
    },

    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    suffix: {
        type: String,
        
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String
    }

});

const ProfileModel = mg.model('Profile', ProfileSchema);

module.exports = {
    ProfileModel
}
