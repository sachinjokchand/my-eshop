import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl, Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap'
//REDUX
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { getOrderListByID } from '../actions/orderAction'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'

const ProfileScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const userInfo = userLogin.userInfo

    const updateUserDetails = useSelector(state => state.updateUserDetails)
    const { success } = updateUserDetails

    const orderDetails = useSelector(state => state.orderMyList)
    const { orderError, orderLoading, orders } = orderDetails


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user) {
                dispatch(getUserDetails('profile'))
                dispatch(getOrderListByID({id:userInfo.id}))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }

    }, [dispatch, history, user, userInfo])


    const submitHandler = (e) => {
        e.preventDefault()

        timer()
        if (password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }

    }
    const timer = () => {
        setTimeout(() => {
            setMessage('')
        }, 5000)
    }
    return (
        <Row>
        <Meta title='Profile' />
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}


                <Form onSubmit={submitHandler}>
                    <FormGroup controlId='name'>
                        <FormLabel>Name</FormLabel>
                        <FormControl
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId='email'>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl
                            disabled
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId='password'>
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId='ConfirmPassword'>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                        </FormControl>
                    </FormGroup>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Order</h2>

                {orderLoading ? <Loader /> : orderError ? (
                    <Message varient='danger'>Something is wrong</Message>
                ) : (<>
                    {orders.length === 0 && <Message>Not orders</Message>}
                    <Table striped responsive hover bordered className='table-sm' >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) =>

                                <tr key={order._id} >
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? (<>{order.paidAt.substring(0, 10)}</>) :
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>}
                                    </td>
                                    <td>{order.isDelivered ? (<>{order.deliveredAt.substring(0, 10)}</>) :
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`} >
                                            <Button variant='light' size='sm'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </>
                )}
            </Col>

        </Row>
    )
}

export default ProfileScreen
