const mg = require('mongoose');

const FileSchema = new mg.Schema({
    filename: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true,
    },
});

const FileModel = mg.model('File', FileSchema);

module.exports = {
    FileModel
}

