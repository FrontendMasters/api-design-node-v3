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

app.get('/', (req, res) => {
  res.send({ message: 'hello' })
})

app.get('/todos', (req, res) => {
  res.send({ message: 'todo just checked' })
  console.log(req.body)
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send({ message: 'ok' })
})

app.post('/todos', (req, res) => {
  const todo = req.body
  console.log(todo)
  res.send({ message: 'new todo added' })
})

export const start = () => {
  app.listen(3000, () => {
    console.log('sever is on 3000')
  })
}
