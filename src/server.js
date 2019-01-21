import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// Basic GET / endpoint for hello world. Routes are matched by endpoint and type of request.

app.get('/secret', (req, res, next) => {
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
