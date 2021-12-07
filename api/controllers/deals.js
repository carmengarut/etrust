const dealsRouter = require('express').Router()
const Deal = require('../models/Deal')
const User = require('../models/User.js')
const Rating = require('../models/Rating')
const userExtractor = require('../middleware/userExtractor')

dealsRouter.get('/', async (request, response) => {
  const deals = await Deal.find({})
    .populate('createdBy', {
      email: 1,
      name: 1,
      surname: 1
    })
    .populate('members', {
      email: 1,
      name: 1,
      surname: 1
    })
    .populate('signedBy', {
      email: 1,
      name: 1,
      surname: 1
    })
    .populate('ratings', {
      fulfilled: 1,
      content: 1,
      recipient: 1
    })

  response.json(deals)
})

dealsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  Deal.findById(id)
    .populate('createdBy', {
      email: 1,
      name: 1,
      surname: 1
    })
    .populate('members', {
      email: 1,
      name: 1,
      surname: 1
    })
    .populate('signedBy', {
      email: 1,
      name: 1,
      surname: 1
    })
    .populate('ratings', {
      fulfilled: 1,
      content: 1,
      recipient: 1
    })
    .then(deal => {
      if (deal) {
        return response.json(deal)
      } else {
        response.status(404).end()
      }
    })
    .catch(err => {
      next(err)
    })
})

dealsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  await Deal.findByIdAndDelete(id)

  try {
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

// en el siguiente post, primerto ejecuta el user extractor y luego la funcion async
dealsRouter.post('/', userExtractor, async (request, response, next) => {
  const { title, content, memberEmail } = request.body

  if (!content) {
    return response.status(400).json({
      error: 'Deal content is missing'
    })
  }

  const member = await User.findOne({ email: memberEmail })
  if (!member) {
    return response.status(400).json({
      error: 'Please, add a valid member email'
    })
  }

  const { userId } = request
  console.log(userId)
  const user = await User.findById(userId)
  if (!user) {
    return response.status(400).json({
      error: 'User does´t exist, please login and try again'
    })
  }

  const newDeal = new Deal({
    title,
    content,
    date: new Date().toISOString(),
    status: 'New',
    createdBy: user._id,
    members: [member._id],
    signedBy: [user.id]
  })

  try {
    const savedDeal = await newDeal.save()
    user.deals = user.deals.concat(savedDeal._id)
    await user.save()

    response.status(201).json(savedDeal)
  } catch (error) {
    next(error)
  }
})

dealsRouter.put('/:id', userExtractor, (request, response) => {
  const { id } = request.params
  const { content } = request.body
  const newDeal = {
    content
  }
  Deal.findByIdAndUpdate(id, newDeal, { new: true }).then(result =>
    response.json(result))
})

dealsRouter.put('/:id', userExtractor, (request, response) => {
  const { id } = request.params
  const { content } = request.body
  const newDeal = {
    content
  }
  Deal.findByIdAndUpdate(id, newDeal, { new: true }).then(result =>
    response.json(result))
})

dealsRouter.put('/:id/sign', userExtractor, async (request, response) => {
  const { id } = request.params
  const { users } = request.body

  const deal = await Deal.findById(id).populate('signedBy', {
    email: 1,
    name: 1,
    surname: 1
  })

  deal.signedBy = users

  if (deal.signedBy.length >= 2) {
    deal.status = 'Signed'
  }

  await deal.save()
  const savedDeal = await Deal.findById(id).populate('signedBy', {
    email: 1,
    name: 1,
    surname: 1
  })
  response.json(savedDeal)
})

dealsRouter.post('/:id/rate', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const { fulfilled, content, recipientId } = request.body

  const { userId } = request

  const deal = await Deal.findById(id)

  if (deal.status !== 'Signed') {
    return response.status(400).json({
      error: 'The deal should be signed by all members before submitting a rating'
    })
  }

  const newRating = new Rating({
    fulfilled,
    content,
    date: new Date().toISOString(),
    status: 'New',
    createdBy: userId,
    recipient: recipientId
  })

  try {
    const savedRating = await newRating.save()
    console.log(savedRating)
    deal.ratings = deal.ratings.concat(savedRating._id)
    await deal.save()

    response.status(201).json(savedRating)
  } catch (error) {
    next(error)
  }
})

module.exports = dealsRouter
