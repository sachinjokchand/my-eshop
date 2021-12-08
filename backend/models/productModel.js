import mongoose from 'mongoose'
import User from './userModel.js'

const reviewSchema = mongoose.Schema({
    name: { type: String, require: true },
    rating: { type: Number, require: true },
    comment: { type: String, require: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: User.modelName
    }
}, {
    timestamps: true,
    versionKey: false
})

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: User.modelName
    },
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        require: true,
        default: 0
    },
    numReviews: {
        type: Number,
        require: true,
        default: 0
    },
    price: {
        type: Number,
        require: true,
        default: 0
    },
    countInStock: {
        type: Number,
        require: true,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
})

const Product = mongoose.model('Products', productSchema);

export default Product