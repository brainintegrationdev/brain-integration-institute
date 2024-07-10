const ex = require('express');
const { processFile } = require('../middleware/cdn');
const { getAllFilesByOwner, createFile } = require('../services/file');

const fileRouter = ex.Router();

// fetches user's file metadata collection:
fileRouter.get('/', async (req, res, next) => {
    try {
        const files = await getAllFilesByOwner(req.auth.payload.sub);
        res.status(200).send({ success: true, files })
    } catch (err) {
        console.error(err);
        res.status(500);
        next(err)
    }
})

// Uploads a single file from the 'file' field on request body form-data:
fileRouter.post('/', processFile('file'), async (req, res, next) => {
    try {
        const file = await createFile({
            filename: req.body.filename,
            owner: req.auth.payload.sub,
            file: req.file
        })
        res.status(200).send({ success: true, file })
    } catch (err) {
        console.error(err);
        res.status(500);
        next(err)
    }
})


module.exports = {
    fileRouter
}