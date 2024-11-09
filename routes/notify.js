const ex = require('express');
// const { processFile } = require('../middleware/cdn');
// const { getAllFilesByOwner, createFile } = require('../services/file');
// const File  = require('../models/file');
// const cloudinary = require('cloudinary').v2; 


//this router is to receive post request 
//from google apps script function upon user assessment completion (google form)
//since it has to be reached from a third party api
//this endpoint will only be accessible on deployed branch
//this file is for testing purposes

const notifyRouter = ex.Router();

notifyRouter.get('/', async (req, res, next) => {
    try {
      
        console.log('test route')
        res.status(200).send({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500);
        next(err);
    }
 });
 



module.exports = {
    notifyRouter
};
