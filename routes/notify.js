const ex = require('express');

//this router is intended to have post endpoint so that Google Apps Script function can make post request with assessment results
//this router will only be enabled on the deployment branch since Apps Script requires a public (deployed) URL for the API endpoint
//this is just a test component on dev branch


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
