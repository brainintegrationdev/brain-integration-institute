const { File } = require("../models/file");
const { upload } = require("./cdn");

const getAllFilesByOwner = async (owner) => await File.find({
    owner
});

const createFile = async ({ filename, owner, file }) => {
    const metadata = await upload(filename, file);
    const doc = new File({
        filename,
        public_id: metadata.public_id,
        url: metadata.url,
        owner
    })

    return await doc.save()
}

module.exports = {
    getAllFilesByOwner,
    createFile
}