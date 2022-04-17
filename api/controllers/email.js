const emailsRouter = require('express').Router()
const { sendVerificationRequestEmail, sendVerificationConfirmationEmail } = require('../middleware/emailNotifications')
const userExtractor = require('../middleware/userExtractor')

emailsRouter.post('/verification-request', userExtractor, (request, response) => {
  const { userId, email } = request.body
  sendVerificationRequestEmail('carmencgu3@gmail.com', 'Carmen', email, 'https://etrustapp.com/verify/' + userId)
})

emailsRouter.post('/verification-confirmed', userExtractor, (request, response) => {
  const { receiverName, receiverEmail } = request.body
  sendVerificationConfirmationEmail(receiverEmail, receiverName)
})

module.exports = emailsRouter
