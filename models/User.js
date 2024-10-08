const mg = require('mongoose');

// User Model Blueprint
const UserSchema = new mg.Schema({
    // User's Email
    userEmail: {
        type: String,
        required: true
    },
    // User Profile Picture which a custom hook on the profile side will
    // use the userId to pull the user's file from Cloudinary in a generated
    // AdvanceImage.
    userProfilePicture: {
        type: String,
        default: ''
    },
    // User's username
    userName: {
        type: String,
        required: true,
        unique: true,
        default: ''// userEmail
    },
    // User's password


    userUploadProgress: {
        type: Number,
        required: true,
        default: 0
    },
    // List of predetermined booleans for each user's certification upload status
    //  - When each document is uploaded to Cloudinary the Admin will see a status that their document is uploaded
    //      - If the Admin clicks on the pass radio check box then the child boolean will switch from 'false' to 'true'
    //        via a custom hook on the frontend.
    certListUploadStatus: {
        brainIntegrationTraining: {
            type: Boolean,
            default: false
        },
        clinicalHours: {
            type: Boolean,
            default: false
        },
        firstAidTraining: {
            type: Boolean,
            default: false
        },
        cprCert: {
            type: Boolean,
            default: false
        },
        videoPresentation: {
            type: Boolean,
            default: false
        },
        insurance: {
            type: Boolean,
            default: false
        }
    },
    // After the Stripe API confirms the successful payment for the Study Guide
    studyGuideAccess: {
        type: Boolean,
        default: false
    },
    // Once all required documents have been passed by the Administrator, another hook will switch the Assessment Access
    // to "true" and rerender the page with an active 'Take Assessment' button
    assessmentAccess: {
      type: Boolean,
      default: false  
    },
    // Stripe will switch the boolean on the User's subscription to generate their link with a button on the Administrator's
    // dashboard that can switch the link's 'Active' status from 'false' to "true" with an automatic switch if they do not make their payment within 
    // a pre-determined timeframe. 
    subscriptionActiveStatus: {
        type: Boolean,
        required: false
    },
});

const UserModel = mg.model('User', UserSchema);

module.exports = {
    UserModel
}

