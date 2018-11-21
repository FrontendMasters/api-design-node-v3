import mongoose from 'mongoose'
import cuid from 'cuid'
import models from './src/models'
import _ from 'lodash'

const url =
  process.env.MONGODB_URI ||
  process.env.DB_URL ||
  'mongodb://localhost:27017/tipe-devapi-testing'

global.newId = () => {
  return mongoose.Types.ObjectId()
}

const remove = collection =>
  new Promise((resolve, reject) => {
    collection.remove(err => {
      if (err) return reject(err)
      resolve()
    })
  })

beforeEach(async done => {
  const db = cuid()
  function clearDB() {
    return Promise.all(_.map(mongoose.connection.collections, c => remove(c)))
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(
        url + db,
        {
          useNewUrlParser: true,
          autoIndex: true
        }
      )
      await clearDB()
      await Promise.all(Object.keys(models).map(name => models[name].init()))
    } catch (e) {
      console.log('connection error')
      throw e
    }
  } else {
    await clearDB()
  }
  done()
})
afterEach(async done => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
  return done()
})
afterAll(done => {
  return done()
})
