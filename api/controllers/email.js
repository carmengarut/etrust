const emailsRouter = require('express').Router()
const { sendVerificationRequestEmail } = require('../middleware/emailNotifications')
const userExtractor = require('../middleware/userExtractor')

emailsRouter.post('/verification-request', userExtractor, (request, response) => {
  const { userId, email } = request.body
  sendVerificationRequestEmail('carmencgu3@gmail.com', 'Carmen', email, 'https://etrustapp.com/verify/' + userId)
})

module.exports = emailsRouter
