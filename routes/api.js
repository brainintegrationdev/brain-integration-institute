const ex = require('express');
const { fileRouter } = require('./file');
const { documentRouter } = require('./document');
const { userRouter } = require('./user');
const { checkoutRouter } = require('./checkout');
const signedUrlRouter = require('./signedUrl');
const { profileRouter } = require('./profile')
const { adminRouter } = require('./admin')
const { notifyRouter } = require('./notify')
const { approvalMessagesRouter } = require('./approvalMessages')



const apiRouter = ex.Router();

apiRouter.use('/files', fileRouter);
apiRouter.use('/files/:user', fileRouter);
apiRouter.use('/images', documentRouter)
apiRouter.use('/user', userRouter)
apiRouter.use('/', checkoutRouter)
apiRouter.use('/', signedUrlRouter)
apiRouter.use('/profile', profileRouter)
apiRouter.use('/admin', adminRouter)
apiRouter.use('/notify', notifyRouter)
apiRouter.use('/approvalmessages', approvalMessagesRouter)




module.exports = {
    apiRouter
}