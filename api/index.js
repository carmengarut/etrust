require('dotenv').config()
require('./mongo.js') // Esto ejecuta el fichero de mongo.js

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware')
const app = express()
const Deal = require('./models/Deal')
const User = require('./models/User.js')

const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const userExtractor = require('./middleware/userExtractor')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())
app.use(logger)

app.use(express.static('../app/build'))

Sentry.init({
  dsn: 'https://d67d64d4595c432683cc5e9ade2e8a5a@o1037870.ingest.sentry.io/6006005',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

// const app = http.createServer((request, response) =>  {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
// })

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

app.get('/api/deals', async (request, response) => {
  const deals = await Deal.find({})
    .populate('createdBy', {
      username: 1,
      name: 1
    })
    .populate('signedBy', {
      username: 1,
      name: 1
    })

  response.json(deals)
})

app.get('/api/deals/:id', (request, response, next) => {
  const id = request.params.id
  Deal.findById(id)
    .populate('createdBy', {
      username: 1,
      name: 1
    })
    .populate('signedBy', {
      username: 1,
      name: 1
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

app.delete('/api/deals/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  await Deal.findByIdAndDelete(id)

  try {
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

// en el siguiente post, primerto ejecuta el user extractor y luego la funcion async
app.post('/api/deals', userExtractor, async (request, response, next) => {
  const { content } = request.body

  const { userId } = request

  const user = await User.findById(userId)
  if (!content) {
    return response.status(400).json({
      error: 'Deal content is missing'
    })
  }

  const newDeal = new Deal({
    content: content,
    date: new Date().toISOString(),
    status: 'New',
    createdBy: user._id,
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

  //     .then(savedNote => {
  //         response.status(201).json(savedNote)
  //     })
  //     .catch(err => next(err))
})

app.put('/api/deals/:id', userExtractor, (request, response) => {
  const { id } = request.params
  const { content } = request.body
  const newDeal = {
    content
  }
  Deal.findByIdAndUpdate(id, newDeal, { new: true }).then(result =>
    response.json(result))
})

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(notFound)

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

app.use(handleErrors)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
