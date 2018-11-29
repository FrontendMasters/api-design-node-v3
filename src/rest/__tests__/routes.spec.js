import request from 'supertest'
import { app } from '../../server'
import { User } from '../../models'
import { newToken } from '../auth'
import mongoose from 'mongoose'

describe('rest routes', () => {
  let token
  beforeEach(async () => {
    const user = await User.create({ email: 'a@a.com', password: 'hello' })
    token = newToken(user)
  })

  describe('api auth', () => {
    test('api should be locked down', async () => {
      const response = await request(app).get('/api/task')
      expect(response.statusCode).toBe(401)
    })

    test('passes with JWT', async () => {
      const jwt = `Bearer: ${token}`
      const id = mongoose.Types.ObjectId()
      const results = await Promise.all([
        request(app)
          .get('/api/task')
          .set('Authorization', jwt),
        request(app)
          .get(`/api/task/${id}`)
          .set('Authorization', jwt),
        request(app)
          .post('/api/task')
          .set('Authorization', jwt),
        request(app)
          .put(`/api/task/${id}`)
          .set('Authorization', jwt),
        request(app)
          .delete(`/api/task/${id}`)
          .set('Authorization', jwt)
      ])

      results.forEach(res => expect(res.statusCode).not.toBe(404))
    })
  })

  // test('crud routes for list', async () => {})
})
