import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import restApi from './routes'
import { signup, signin } from './auth'
import { connect } from './db'

export const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signup', signup)
app.post('/signin', signin)
app.use('/api', restApi)

app.get('/', (req, res) => res.send('hello'))

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`API on http://localhost:${config.port}`)
    })
  } catch (e) {
    console.error(e)
  }
}
