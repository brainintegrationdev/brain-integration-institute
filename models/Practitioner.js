const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    publicId: { type: String, required: true },
    url: { type: String, required: true },
    uploadDate: { type: Date, required: true },
    filename: { type: String, required: true },
    isApproved: { type: Boolean, default: false }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
