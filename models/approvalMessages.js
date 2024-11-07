const mg = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = {
    ApprovalMessageSchema
}


