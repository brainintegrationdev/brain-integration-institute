const mg = require('mongoose');
const Schema = mg.Schema;

const ApprovalMessageSchema = new mg.Schema({
    message: {
        type: [String],
        required: true,
    },
    admin: {
        type: String,
       
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    userEmail: { type: Schema.Types.String, ref: 'User'},
});

// const ApprovalModel = mg.model('approvalMessages', ApprovalMessageSchema);

const ApprovalModel = mg.model('Approval', ApprovalMessageSchema);

module.exports = 
     ApprovalModel

