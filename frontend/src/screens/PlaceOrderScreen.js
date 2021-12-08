import React  , { useEffect } from 'react'
import { Button, Col, ListGroup, Row, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckOutSteps from '../components/CheckOutSteps'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderAction'
import Meta from '../components/Meta'

const PlaceOrderScreen = ({ history }) => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const userInfo = useSelector(state => state.userLogin.userInfo)
    if (!userInfo) {
        history.push('/login')
    }

    if (!cart.shippingAddress) {
        history.push('/shipping')
    }
    if (!cart.paymentMethod) {
        history.push('/payment')
    }

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    //Calculate Price
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty
        , 0
    )
    cart.shippingPrice = addDecimals(cart.itemsPrice > 1000 ? 0 : 200)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice)).toFixed(2)

    const createOrders = useSelector(state => state.orderCreate)
    const {error , success , order} = createOrders

    useEffect(()=>{
        if(success){
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    } , [history , success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
            taxPrice: cart.taxPrice,
            itemsPrice: cart.itemsPrice,
            paymentMethod: cart.paymentMethod
        }))
    }
    return (
        <>
            <CheckOutSteps step1 step2 step3 step4 />
            <Meta title='Place Order' />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address} , {cart.shippingAddress.city} ({cart.shippingAddress.postalCode}), {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your Cart is empty <Link to='/'>Let fill it</Link></Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
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
                                    <Col>$ {cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>$ {cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>$ {cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>$. {cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-black'
                                    style={{ width: '100%' }}
                                    type='Button'
                                    onClick={placeOrderHandler}
                                    disabled={cart.cartItems.length === 0}>
                                    Proceed To Payment
                            </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
