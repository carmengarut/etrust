const dealsRouter = require('express').Router()
const Deal = require('../models/Deal')
const User = require('../models/User.js')
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
    }).then(deal => {
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

  const member = await User.findOne({ email: memberEmail })

  if (!member) {
    return response.status(400).json({
      error: 'Please, add a valid member email'
    })
  }

  const { userId } = request

  const user = await User.findById(userId)
  if (!content) {
    return response.status(400).json({
      error: 'Deal content is missing'
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

dealsRouter.put('/:id/sign', userExtractor, (request, response) => {
  const { id } = request.params
  const { users } = request.body
  const newDeal = {
    signedBy: users
  }
  Deal.findByIdAndUpdate(id, newDeal, { new: true })
    .populate('signedBy', {
      email: 1,
      name: 1,
      surname: 1
    })
    .then(result => response.json(result))
})

module.exports = dealsRouter
