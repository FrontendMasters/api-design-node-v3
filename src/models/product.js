import mongoose from 'mongoose'
import validator from 'validator'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: true,
      trim: true,
      lowercase: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true,
      default: 'https://via.placeholder.com/150',
      validate: [v => validator.isURL(v), 'Not a valid image url']
    },
    type: {
      type: String,
      required: true,
      enum: ['gaming pc', 'bike', 'drone']
    },
    description: String,
    screenSize: {
      type: String,
      required() {
        return this.type === 'gaming pc'
      }
    },
    bikeType: {
      type: String,
      enum: ['kids', 'moutain', 'electric', 'beach'],
      requried() {
        return this.type === 'bike'
      }
    },
    range: {
      type: String,
      requried() {
        return this.type === 'drone'
      }
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'user'
    }
  },
  { timestamps: true }
)

export const Product = mongoose.model('product', productSchema)
