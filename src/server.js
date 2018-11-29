import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import rest from './rest/routes'
import { signup, signin, protect } from './auth'
import { connect } from './db'

const app = express()
app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signup', signup)
app.post('/signin', signin)
app.use('/api', protect, rest)

const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`API on http://localhost:${config.port}`)
    })
  } catch (e) {
    console.error(e)
  }
}

export { app, start }
