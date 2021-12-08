import React, { useEffect, useState } from 'react'
import {  Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { getOrderDetails , payOrder , deliverOrder } from '../actions/orderAction'
import Meta from '../components/Meta'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET , ORDER_DELIVER_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
    const orderID = match.params.id
    const [SDKReady, setSDKReady] = useState(false)
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userLogin.userInfo)
    if (!userInfo) {
        history.push('/login')
    }

    const orderDetails = useSelector(state => state.orderDetails)
    const { error, loading, order } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    useEffect(()=>{
        dispatch(getOrderDetails(orderID))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: paypalID } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${paypalID}`
            script.async = true
            script.onload = () => {
                setSDKReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay || successDeliver) {
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderID))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSDKReady(true)
            }
        }

    }, [dispatch, orderID, order, successPay, successDeliver])


    if (!loading && !error) {

        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        //Calculate Price
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }

    const successPaymentHandler = (paymentResult)=>{
        console.log(paymentResult)
        dispatch(payOrder(orderID , paymentResult))
    }
    const deliverHandler= ()=>{
        dispatch(deliverOrder(order))
    }

    return loading ?
        <Loader /> :
        error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <>
                <Meta title='Order' />
                <h1>Order ID - {order._id} </h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong>{order.user.name}
                                </p>
                                <p>
                                    <strong>Email: </strong>{order.user.email}
                                </p>
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address} , {order.shippingAddress.city} ({order.shippingAddress.postalCode}), {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (
                                    <Message variant='success'>Delivered at {order.deliveredAt}</Message>
                                ) : (
                                    <Message variant='danger'>Not delivered</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <Message variant='success'>Paid on {order.paidAt}</Message>
                                ) : (
                                    <Message variant='danger'>Not Paid</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? (
                                    <Message>Your Cart is empty <Link to='/'>Let fill it</Link></Message>
                                ) : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={item.product}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x $ {item.price} = $ {item.qty * item.price}
                                        </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Item</Col>
                                        <Col>$ {order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>$ {order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>$ {order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>$ {order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {error && <Message variant='danger'>{error}</Message>}
                                </ListGroup.Item>
                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}
                                        {!SDKReady ?
                                            <Loader />
                                            : (
                                                <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                            )}
                                    </ListGroup.Item>
                                )}
                                {loadingDeliver && <Loader />}
                                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                            Mark as Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
        )



}

export default OrderScreen
