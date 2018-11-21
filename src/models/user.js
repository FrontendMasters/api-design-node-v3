import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  settings: {
    firstDayOfWeek: {
      type: String,
      enum: ['monday', 'sunday'],
      default: 'monday',
      required: true
    },
    theme: {
      type: String,
      required: true,
      enum: ['light', 'dark'],
      default: 'dark'
    }
  }
})

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err)
    }

    this.password = hash
    next()
  })
})

userSchema.methods.checkPassword = function(password) {
  const hash = this.password
  return new Promise((resolve, reject) => {
    console.log(this, hash, password)
    bcrypt.compare(password, hash, (err, same) => {
      if (err) {
        return reject(err)
      }

      resolve(same)
    })
  })
}

export const User = mongoose.model('user', userSchema)
