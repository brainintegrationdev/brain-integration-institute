const mg = require('mongoose');
const Schema = mg.Schema;

const ApprovalMessageSchema = new mg.Schema({
    message: {
        type: [String],
        required: true
    },
    admin: {
        type: String,  
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// const ApprovalModel = mg.model('approvalMessages', ApprovalMessageSchema);

module.exports = {
    ApprovalMessageSchema
}


