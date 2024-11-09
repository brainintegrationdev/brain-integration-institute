

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

//get unread messages only
// const unreadMessages = await ApprovalModel.find({ userEmail: user.email, hasBeenRead: false });

//mark messages as read
// const markAsRead = await ApprovalModel.updateMany(
//     { userEmail: user.email, hasBeenRead: false },
//     { hasBeenRead: true, readTimestamp: new Date() }

    // To archive messages older than a certain period,  add an archived boolean or move older messages to a separate collection for archival.



module.exports = {
    getAllApprovalMessagesByUser,
    createMessage,
};
