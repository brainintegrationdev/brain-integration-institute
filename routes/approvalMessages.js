const ex = require('express');
// const { processFile } = require('../middleware/cdn');
const { getAllApprovalMessagesByUser, createMessage } = require('../services/approvalMessages');
const ApprovalModel  = require('../models/approvalMessages');


const approvalMessagesRouter = ex.Router();


//create get all messages route by user with :email param

//  api/approvalMessages/:email



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
//create post message route

// message: {
//     type: [String],
//     required: true,
// },
// admin: {
//     type: String,
//     required: true,
// },
// timestamp: {
//     type: Date,
//     default: Date.now,
// },
// user: { type: Schema.Types.String, ref: 'User', required: true },
// });

// fileRouter.post('/', async (req, res) => {
//     try {
//         const { publicId, url, uploadDate, filename, sectionName } = req.body;

//         if (!publicId || !url || !uploadDate || !filename) {
//             return res.status(400).json({ error: 'Missing required fields' });
//         }

//         const fileMetadata = await createFile({
//             filename,
//             user: req.auth.payload.sub,
//             publicId,
//             url,
//             uploadDate,
//             isApproved: false,
//             sectionName
//         });

//         res.status(201).json({ success: true, fileMetadata  });
//     } catch (error) {
//         console.error('Error processing request:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// const ApprovalModel = require('../models/approvalMessages');
const { UserModel } = require('../models/User'); // Import your user model

approvalMessagesRouter.post('/', async (req, res) => {
    try {
        const { message, userEmail } = req.body;
        console.log('JWT sub:', req.auth.payload.sub);

        // Make sure message and userEmail are provided
        if (!message ) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Fetch the admin (authenticated user) from the user model
        const admin = await UserModel.findOne({  sub: req.auth.payload.sub  });
        console.log(admin, "admin")
        const adminEmail = admin ? admin.userEmail : 'Admin not found';
        console.log('Admin Email:', adminEmail);


        // Check if admin exists (authentication check)
        if (!admin) {
            return res.status(401).json({ error: 'Admin user not found' });
        }

        // Use the admin's email from the user model
       

        // Create the message
        const messageMetadata = await createMessage({
            message,
            admin: adminEmail,  // Store the email of the authenticated user as admin
            timestamp: Date.now(),
            userEmail,  // Send the userEmail from the request body
        });

        // Respond with success and the created message
        res.status(201).json({ success: true, messageMetadata });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});





module.exports = {
    approvalMessagesRouter,
};