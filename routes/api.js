const ex = require('express');
const { fileRouter } = require('./file');
const { exampleRouter } = require('./example');


const apiRouter = ex.Router();

apiRouter.use('/files', fileRouter);
apiRouter.use('/examples', exampleRouter);


module.exports = {
    apiRouter
}