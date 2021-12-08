import express from 'express'
import {
    deleteProduct,
    getProductByID,
    getProducts,
    updateProduct,
    createProduct,
    createProductReview,
    getTopProducts
} from '../controllers/productController.js'
import { isAdmin, protect } from '../middleware/authMiddleware.js'

const routes = express.Router()


routes.route('/').get(getProducts)
routes.route('/top').get(getTopProducts)
routes.route('/:id/reviews').post(protect , createProductReview)
routes.route('/createproduct').post(protect, isAdmin, createProduct)
routes.route('/:id').get(getProductByID).delete(protect, isAdmin, deleteProduct).put(protect, isAdmin, updateProduct)

export default routes;