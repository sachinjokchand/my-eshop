import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import fs from 'fs'
import path from 'path'


const __dirname = path.resolve()

//@route /api/product
//@desc send all product
const getProducts = asyncHandler(async (req, res) => {
    try {
        const pageSize = 8
        const page = Number(req.query.pageNumber) || 1
        const keyword = req.query.keyword ? { name: { '$regex': req.query.keyword, '$options': 'i' } } : {}
        const price = req.query.price ? { price: { '$lt': Number(req.query.price) } } : {}
        const rating = req.query.rating ? { rating: { '$gt': Number(req.query.rating) } } : {}
        const brand = req.query.brand ? { brand: { '$regex': req.query.brand, '$options': 'i' } } : {}
        const category = req.query.category ? { category: { '$regex': req.query.category, '$options': 'i' } } : {}

        const count = await Product.countDocuments({
            ...keyword,
            ...price,
            ...rating,
            ...brand,
            ...category
        })
        const products = await Product.find({
            ...keyword,
            ...price,
            ...rating,
            ...brand,
            ...category
        }).limit(pageSize).skip(pageSize*(page-1))
        res.json({products , page , pages : Math.ceil(count/pageSize)})
    } catch (error) {
        console.log(error);
    }


})


//@route /api/product/:id
//@desc  send one product by ID
const getProductByID = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product)
        } else {
            res.status(404)
            throw new Error('product Not Found')
        }
    } catch (error) {
        res.status(404)
        throw new Error('product Not Found')
    }
})

//@route DELETE /api/product/:id
//@desc DELETE product by product
const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        console.log(product.image);
        fs.unlink( path.join(__dirname  , product.image) , (err)=>{
            if(err){
                console.log(err);
            }
        })
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('product Not Found')
    }
})

//@route PUT /api/product/:id
//@desc update product
const updateProduct = asyncHandler(async (req, res) => {
    const { brand, category, price, countInStock, description, name, image } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.category = category
        product.price = price
        product.brand = brand
        product.countInStock = countInStock
        product.description = description
        product.image = image

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('product Not Found')
    }
})

//@route POST /api/product/create
//@desc create product
const createProduct = asyncHandler(async (req, res) => {
    const { user, brand, category, price, countInStock, description, name, image } = req.body

    const product = await Product.create({
        user,
        brand,
        category,
        price,
        countInStock,
        description,
        name,
        image
    })

    if (product) {

        res.json({ message: 'Product Created' })
    } else {
        res.status(404)
        throw new Error('product Not Created')
    }
})


//@route POST /api/product/:id/reviews
//@desc create review
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Already reviewed on product')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@route GET /api/product/top
//@desc get top products
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).limit(4).sort({ rating: -1 })

    res.json(products)
})

export {
    getProducts,
    getProductByID,
    deleteProduct,
    updateProduct,
    createProduct,
    createProductReview,
    getTopProducts
}