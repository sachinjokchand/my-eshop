import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import mongoose from 'mongoose'


//@route POST  /api/order
//@desc create order in db
const addOrderItems = asyncHandler(async (req, res) => {

    const { orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        totalPrice,
        itemsPrice,
        shippingPrice } = req.body

    if (orderItems.length === 0) {
        res.status(400)
        throw new Error('No items in order')
        return
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            taxPrice,
            totalPrice,
            itemsPrice,
            shippingPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }

})


//@route GET  /api/order/:ID
//@desc get order from DB by ORDER'S ID
const getOrderByID = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate('user' , 'name email')
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not Found')
    }

})

//@route GET  /api/order/:ID/delivered
//@desc get order from DB
const updateOrderToDelivered = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)

    if(order){
        order.isDelivered = true
        order.deliveredAt = new Date()
        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not Found')
    }
})


//@route GET  /api/order/:ID/pay
//@desc get order from DB
const updateOrderToPaid = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.paidAt = new Date()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not Found')
    }
})


//@route GET  /api/order/listmyorder
//@desc get My order from DB from USER'S ID
const getOrdersByID = asyncHandler(async (req, res) => {
    const orders = await Order.find({user : req.body.id})

    res.send(orders)
})

//@route GET  /api/order
//@desc get all orders
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user' , 'id name')
    res.send(orders)
})


export {
    addOrderItems,
    getOrderByID,
    updateOrderToPaid,
    getOrdersByID,
    getOrders,
    updateOrderToDelivered
}