import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

const router = express.Router()
app.disable('x-powered-by')

// Middleware included before requests
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
// Morgan logs requests to log among other things.
app.use(morgan('dev'))

// next exectutes the next function in the middleware "chain"
const log = (req, res, next) => {
  console.log('Logging')
  next()
}

// Sub-routing through the use of a router
router.get('/me', (req, res) => {
  res.send({ me: 'hello' })
})

// movies . THis is a way of defining routes with verbs
const routes = ['get /movie', 'get /movie/:id', 'post /movie', 'put /movie/:id', 'delete /moive/:id']

// Or you can have it less verbose and more concise like this.
router.route('/movie')
  .get()
  .post()

router.route('/movie/:id')
  .get()
  .put()
  .delete()

// Register the router for the /api endpoint. For any request on /api it will get the router endpoint(s)
app.use('/api', router)

// uses log middleware for all requests
// app.use(log)

// Basic GET / endpoint for hello world. Routes are matched by endpoint and type of request.
// Uses log only for this endpoint
app.get('/secret', log, (req, res, next) => {
  res.send({ message: 'hello human, this is a succesful GET request' })
})

// Basic POST / endpoint for hello world. Same route different type of request.
app.post('/secret', (req, res, next) => {
  console.log(req.body)
  res.send({ message: 'Hello human, this a succesful POST request' })
})

// Start the server on specified port. WARNING its over 9000
export const start = () => {
  app.listen(9999, () => {
    console.log('Server is listening on port 9999')
  })
}
