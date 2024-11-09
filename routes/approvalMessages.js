const ex = require('express');
// const { processFile } = require('../middleware/cdn');
const {
    getAllApprovalMessagesByUser,
    createMessage,
} = require('../services/approvalMessages');
const ApprovalModel = require('../models/approvalMessages');
const { UserModel } = require('../models/User');

const approvalMessagesRouter = ex.Router();

//these routes are for messages sent by admin as to whether a docment is approved or denied

approvalMessagesRouter.get('/:useremail', async (req, res) => {
    try {
        const { userEmail } = req.params;
        const messages = await getAllApprovalMessagesByUser(userEmail);
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

//post new message to user
approvalMessagesRouter.post('/', async (req, res) => {
    try {
        const { message, userEmail } = req.body;
        console.log('JWT sub:', req.auth.payload);
        if (!message || !userEmail) {
            return res
                .status(400)
                .json({ error: 'Message and userEmail are required fields' });
        }
        const admin = await UserModel.findOne({ sub: req.auth.payload.sub });
        const adminEmail = admin ? admin.userEmail : 'Admin not found';
        console.log('Admin Email:', adminEmail);
        if (!admin || !admin.userEmail) {
            return res.status(401).json({ error: 'Admin not found' });
        }

        const messageMetadata = await createMessage({
            message,
            admin: adminEmail,
            timestamp: Date.now(),
            userEmail,
        });
        res.status(201).json({ success: true, messageMetadata });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = {
    approvalMessagesRouter,
};
