const mg = require('mongoose');
const Schema = mg.Schema;

const ApprovalMessageSchema = require('./approvalMessages'); 

const UploadStatus = {
    WAITINGFORUPLOAD: 'waiting for upload',
    PENDINGAPPROVAL: 'pending approval',
    APPROVED: 'approved',
    DECLINED: 'declined',
};

// User Model Blueprint
const UserSchema = new mg.Schema({
    // User's Email
    userEmail: {
        type: String,
        required: true,
    },
    // User Profile Picture which a custom hook on the profile side will
    // use the userId to pull the user's file from Cloudinary in a generated
    // AdvanceImage.
    userProfilePicture: {
        type: String,
        default: '',
    },
    // User's username
    userName: {
        type: String,
        required: true,
        unique: true,
        default: '', // first and last name
    },

    firstName: {
        type: Schema.Types.ObjectId,
        ref: 'ProfileModel',
    },

    lastName: {
        type: Schema.Types.ObjectId,
        ref: 'ProfileModel',
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
    // User's password

    userUploadProgress: {
        type: Number,
        required: true,
        default: 0,
    },
    //all user statuses set to waiting for upload by default.  As users upload docs, this toggles to pending, and once admin approves/denies, the status is updated from there

    certListUploadStatus: {
        brainIntegrationTraining: {
            type: String,
            enum: [
                UploadStatus.WAITINGFORUPLOAD,
                UploadStatus.PENDINGAPPROVAL,
                UploadStatus.APPROVED,
                UploadStatus.DECLINED,
            ],
            default: UploadStatus.WAITINGFORUPLOAD,
            required: true,
        },
        clinicalHours: {
            type: String,
            enum: [
                UploadStatus.WAITINGFORUPLOAD,
                UploadStatus.PENDINGAPPROVAL,
                UploadStatus.APPROVED,
                UploadStatus.DECLINED,
            ],
            default: UploadStatus.WAITINGFORUPLOAD,
            required: true,
        },
        firstAidTraining: {
            type: String,
            enum: [
                UploadStatus.WAITINGFORUPLOAD,
                UploadStatus.PENDINGAPPROVAL,
                UploadStatus.APPROVED,
                UploadStatus.DECLINED,
            ],
            default: UploadStatus.WAITINGFORUPLOAD,
        },
        cprCert: {
            type: String,
            enum: [
                UploadStatus.WAITINGFORUPLOAD,
                UploadStatus.PENDINGAPPROVAL,
                UploadStatus.APPROVED,
                UploadStatus.DECLINED,
            ],
            default: UploadStatus.WAITINGFORUPLOAD,
        },
        videoPresentation: {
            type: String,
            enum: [
                UploadStatus.WAITINGFORUPLOAD,
                UploadStatus.PENDINGAPPROVAL,
                UploadStatus.APPROVED,
                UploadStatus.DECLINED,
            ],
            default: UploadStatus.WAITINGFORUPLOAD,
        },
        insurance: {
            type: String,
            enum: [
                UploadStatus.WAITINGFORUPLOAD,
                UploadStatus.PENDINGAPPROVAL,
                UploadStatus.APPROVED,
                UploadStatus.DECLINED,
            ],
            default: UploadStatus.WAITINGFORUPLOAD,
        },
    },

    approvalMessages: {
        brainIntegrationTraining: [ApprovalMessageSchema],
        clinicalHours: [ApprovalMessageSchema],
        firstAidTraining: [ApprovalMessageSchema],
        cprCert: [ApprovalMessageSchema],
        videoPresentation: [ApprovalMessageSchema],
        insurance: [ApprovalMessageSchema],
    },
    // After the Stripe API confirms the successful payment for the Study Guide
    studyGuideAccess: {
        type: Boolean,
        default: false,
    },
    // Once all required documents have been passed by the Administrator, another hook will switch the Assessment Access
    // to "true" and rerender the page with an active 'Take Assessment' button
    assessmentAccess: {
        type: Boolean,
        default: false,
    },
    // Stripe will switch the boolean on the User's subscription to generate their link with a button on the Administrator's
    // dashboard that can switch the link's 'Active' status from 'false' to "true" with an automatic switch if they do not make their payment within
    // a pre-determined timeframe.
    subscriptionActiveStatus: {
        type: Boolean,
        required: false,
    },
});

const UserModel = mg.model('User', UserSchema);

module.exports = {
    UserModel,
};
