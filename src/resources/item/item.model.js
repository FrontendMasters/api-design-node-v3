import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({ item: "item's here" }, { timestamps: true })
export const Item = mongoose.model('item', itemSchema)
