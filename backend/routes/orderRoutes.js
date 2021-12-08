import express from 'express'
import {
    addOrderItems,
    getOrderByID,
    updateOrderToPaid,
    getOrdersByID,
    getOrders,
    updateOrderToDelivered
} from '../controllers/orderController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const routes = express.Router()


routes.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders)
routes.route('/listmyorder').post(protect, getOrdersByID)
routes.route('/:id').get(protect, getOrderByID)
routes.route('/:id/pay').put(protect, updateOrderToPaid)
routes.route('/:id/delivered').put(protect , isAdmin, updateOrderToDelivered)


export default routes;