const mg = require('mongoose');
const Schema = mg.Schema;

const ProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },

    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
    },
    suffix: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
    },
    country: {
        type: String,
    },
    bio: {
        type: String,
    },
});

const ProfileModel = mg.model('Profile', ProfileSchema);

module.exports = {
    ProfileModel,
};
