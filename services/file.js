const { FileModel } = require("../models/file");
const { upload } = require("./cdn");

const getAllFilesByOwner = async (owner) => await FileModel.find({
    owner
});

const createFile = async ({ filename, owner, file }) => {
    const metadata = await upload(filename, file);
    const doc = new FileModel({
        filename,
        public_id: metadata.public_id,
        url: metadata.secure_url,
        owner
    })

    return await doc.save()
}

module.exports = {
    getAllFilesByOwner,
    createFile
}