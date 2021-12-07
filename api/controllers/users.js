const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('deals', {
    content: 1,
    date: 1,
    status: 1,
    createdBy: 1,
    signedBy: 1
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  try {
    const { body } = request
    const { email, name, surname, password } = body

    const saltRounds = 10 // coste de generar el hash, mientras mas alto mas seguro
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      email,
      name,
      surname,
      passwordHash
    })

    const savedUser = await user.save()

    const userForToken = {
      id: user._id,
      email: user.email
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      {
        expiresIn: 60 * 60 * 24 * 7
      }
    )

    const userReturned = {
      email: savedUser.email,
      name: savedUser.name,
      surname: savedUser.surname,
      deals: savedUser.deals,
      id: savedUser._id,
      token
    }

    response.status(201).json(userReturned)
  } catch (error) {
    response.status(400).json(error)
  }
})

module.exports = usersRouter
