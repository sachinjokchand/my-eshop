import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, ListGroup, Row, FormControl, Button, Image, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Meta from '../components/Meta'
//REDUX
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, remoneFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
    const productID = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productID) {
            dispatch(addToCart(productID, qty))
        }
    }, [dispatch, productID, qty])

    const proceedToPaymentHandler = () => {
        history.push('/login?redirect=shipping')
    }
    const removeFromCartHandler = (productID) => {
        dispatch(remoneFromCart(productID))
    }


    return (
        <Row>
            <Meta title='E-Cart' />
            <Col md={8}>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty <Link to='/'>Let's fill it</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            //here product means id
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                                    <Col md={4}> <Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                                    <Col md={2}>$ {item.price}/-</Col>
                                    <Col md={2}>
                                        <FormControl as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))
                                            }
                                        </FormControl>

                                    </Col>
                                    <Col md={2}>
                                        <Button variant='light' type='button' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            Total {cartItems.reduce((acc, item) => acc + item.qty, 0)} Items in cart
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Total Amount $ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}/-
                        </ListGroup.Item>
                        <ListGroup.Item className='text-center'>
                            <Button className='btn-black'
                                style={{ width: '100%' }}
                                type='Button'
                                onClick={proceedToPaymentHandler}
                                disabled={cartItems.length === 0}>
                                Proceed To Payment
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
