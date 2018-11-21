import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    required: true,
    enum: ['active', 'completed', 'pastdue']
  },
  due: {
    type: Date,
    required: true,
    default: Date.now
  },
  repeats: {
    type: Boolean,
    required: true,
    default: false
  },
  repeatSchedule: {
    type: String,
    required() {
      return this.repeats
    },
    enum: ['daily', 'weekday', 'week']
  },
  repeatUntil: Date
})

export const Task = mongoose.model('task', taskSchema)
