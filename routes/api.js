const ex = require('express');
const { fileRouter } = require('./file');
const { documentRouter } = require('./document');
const { userRouter } = require('./user');
const { checkoutRouter } = require('./checkout');
// const { exampleRouter } = require('./example');


const apiRouter = ex.Router();

apiRouter.use('/files', fileRouter);
apiRouter.use('/files/:user', fileRouter);
apiRouter.use('/images', documentRouter)
apiRouter.use('/user', userRouter)
apiRouter.use('/', checkoutRouter)



module.exports = {
    apiRouter
}