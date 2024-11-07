

const ApprovalModel = require('../models/approvalMessages.js');

const getAllApprovalMessagesByUser = async (user) =>
    await ApprovalModel.find({
        user
    });

const createMessage = async (metadata) => {
    const message = new ApprovalModel(metadata);
    await message.save();
    return message;
};

module.exports = {
    getAllApprovalMessagesByUser,
    createMessage,
};
