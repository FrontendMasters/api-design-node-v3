import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
        maxLength: 50
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'complete', 'pastdue'],
        default: 'active'
    },
    notes: String,
    due: Date,
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'user'
    },
    list: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'list',
        required: true
    }
}, { timestamps: true })
export const Item = mongoose.model('item', itemSchema)
