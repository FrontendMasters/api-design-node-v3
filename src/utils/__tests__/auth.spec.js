import { newToken, verifyToken, signup, signin, protect } from '../auth'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../../config'
import { User } from '../../resources/user/user.model'

describe('Authentication:', () => {
  describe('newToken', () => {
    test('creates new jwt from user', () => {
      const id = 123
      const token = newToken({ id })
      const user = jwt.verify(token, config.secrets.jwt)

      expect(user.id).toBe(id)
    })
  })

  describe('verifyToken', () => {
    test('validates jwt and returns payload', async () => {
      const id = 1234
      const token = jwt.sign({ id }, config.secrets.jwt)
      const user = await verifyToken(token)
      expect(user.id).toBe(id)
    })
  })

  describe('signup', () => {
    test('requires email and password', async () => {
      expect.assertions(2)

      const req = { body: {} }
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      }

      await signup(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith({ message: expect.any(String) })
    })

    test('creates user and and sends new token from user', async () => {
      expect.assertions(3)

      const req = { body: { email: 'hello@hello.com', password: '293jssh' } }
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      }

      await signup(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.send).toHaveBeenCalledWith({ token: expect.any(String) })

      const [[{ token }]] = res.send.mock.calls
      let user = await verifyToken(token)
      user = await User.findById(user.id).exec()
      expect(user.email).toBe('hello@hello.com')
    })
  })

  describe('signin', () => {
    test('requires email and password', async () => {
      expect.assertions(2)

      const req = { body: {} }
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      }

      await signin(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith({ message: expect.any(String) })
    })

    test('user must be real', async () => {
      expect.assertions(2)

      const req = { body: { email: 'hello@hello.com', password: '293jssh' } }
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      }

      await signin(req, res)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.send).toHaveBeenCalledWith({ message: expect.any(String) })
    })

    test('passwords must match', async () => {
      expect.assertions(2)

      await User.create({
        email: 'hello@me.com',
        password: 'yoyoyo'
      })

      const req = { body: { email: 'hello@me.com', password: 'wrong' } }
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      }

      await signin(req, res)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.send).toHaveBeenCalledWith({ message: expect.any(String) })
    })

    test('creates new token', async () => {
      expect.assertions(3)

      const fields = {
        email: 'hello@me.com',
        password: 'yoyoyo'
      }

      const savedUser = await User.create(fields)

      const req = { body: fields }
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }

      await signin(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.send).toHaveBeenCalledWith({ token: expect.any(String) })

      const [[{ token }]] = res.send.mock.calls
      let user = await verifyToken(token)
      user = await User.findById(user.id)
        .lean()
        .exec()

      expect(user._id.toString()).toBe(savedUser._id.toString())
    })
  })

  describe('protect', () => {
    test('looks for Bearer token in headers', async () => {
      expect.assertions(3)

      const req = { headers: {} }
      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn()
      }
      const next = jest.fn()

      await protect(req, res, next)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.end).toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })

    test('token must have correct prefix', async () => {
      expect.assertions(3)

      let req = { headers: { authorization: newToken({ id: '123sfkj' }) } }
      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn()
      }
      const next = jest.fn()

      await protect(req, res, next)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.end).toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })

    test('must be a real user', async () => {
      const token = `Bearer ${newToken({ id: mongoose.Types.ObjectId() })}`
      const req = { headers: { authorization: token } }
      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn()
      }
      const next = jest.fn()

      await protect(req, res, next)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.end).toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })

    test('finds user form token and passes on', async () => {
      const user = await User.create({
        email: 'hello@hello.com',
        password: '1234'
      })
      const token = `Bearer ${newToken(user)}`
      const req = { headers: { authorization: token } }
      const next = jest.fn()

      await protect(req, {}, next)

      expect(req.user._id.toString()).toBe(user._id.toString())
      expect(req.user).not.toHaveProperty('password')
      expect(next).toHaveBeenCalled()
    })
  })
})
