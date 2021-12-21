const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const userExtractor = require('../middleware/userExtractor')
// const multer = require('multer')
// const  { v4: uuidv4 } = require('uuid')

// const DIR = './public/';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//       const fileName = file.originalname.toLowerCase().split(' ').join('-');
//       cb(null, uuidv4() + '-' + fileName)
//   }
// })

// let upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//       if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//           cb(null, true);
//       } else {
//           cb(null, false);
//           return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//       }
//   }
// })

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params
  const user = await User.findById(id)
  response.json(user)
})

// usersRouter.post('/', upload.single('profileImg'), async (request, response) => {
usersRouter.post('/', async (request, response) => {
  try {
    //const url = request.protocol + '://' + request.get('host')
    const { body } = request
    const { email, name, surname, password, profileImg } = body

    const saltRounds = 10 // coste de generar el hash, mientras mas alto mas seguro
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      email,
      name,
      surname,
      passwordHash,
      profileImg
      //profileImg: url + '/public/' + request.file.filename
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
      profileImg: savedUser.profileImg,
      deals: savedUser.deals,
      id: savedUser._id,
      token
    }

    response.status(201).json(userReturned)
  } catch (error) {
    console.log(error.name)
    console.log(error.message)
    response.status(400).json(error)
  }
})

usersRouter.put('/:id', userExtractor, async (request, response) => {
  const { id } = request.params
  const newObject  = request.body

  try{
    const result = await User.findByIdAndUpdate(id, newObject, { new: true })
    response.json(result)
  } catch(e) {
    console.error(e.name)
    console.error(e.message)
  }
})

module.exports = usersRouter
