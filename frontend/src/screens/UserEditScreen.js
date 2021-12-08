import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl, Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap'
import Meta from '../components/Meta'
//REDUX
import { getUserDetailsByID, makeUserAdminByID } from '../actions/userActions'
import { getOrderListByID } from '../actions/orderAction'
import { useDispatch, useSelector } from 'react-redux'

const UserEditScreen = ({ location, history, match }) => {
    const [email, setEmail] = useState()
    const [name, setName] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userByID = useSelector(state => state.userByID)
    const { error, loading, user } = userByID

    const userLogin = useSelector(state => state.userLogin)
    const userInfo = userLogin.userInfo



    const orderDetails = useSelector(state => state.orderMyList)
    const { orderError, orderLoading, orders } = orderDetails

    useEffect(() => {
        dispatch(getUserDetailsByID(match.params.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log(user);
        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch(getOrderListByID({ id: match.params.id }))
            if (user) {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, history, match.params.id, user, userInfo])


    const submitHandler = (e) => {
        e.preventDefault()
        if(window.confirm(`Please Confirm to make ${name} ADMIN -`)){
            dispatch(makeUserAdminByID({id:match.params.id}))
        }


    }
    return (
        <Row>
            <Col md={3}>
            
            <Meta title='User Edit' />
                <h2>User Profile</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {!loading && (


                    <Form onSubmit={submitHandler}>
                        <FormGroup controlId='id'>
                            <FormLabel>ID</FormLabel>
                            <FormControl
                                disabled
                                type='name'
                                placeholder='Enter name'
                                value={match.params.id}>
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='name'>
                            <FormLabel>Name</FormLabel>
                            <FormControl
                                disabled
                                type='name'
                                placeholder='Enter name'
                                value={name}>
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId='email'>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl
                                disabled
                                type='email'
                                placeholder='Enter Email'
                                value={email}>
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId='isAdmin'>
                            <FormLabel>Admin</FormLabel>
                            <FormControl
                                disabled
                                type='email'
                                placeholder='Enter Email'
                                value={isAdmin ? 'Admin' : 'Not Admin' }>
                            </FormControl>
                        </FormGroup>

                        {!isAdmin && (
                            <Button type='submit' variant='primary'>
                                Make this user ADMIN
                            </Button>
                        )}

                    </Form>
                )}
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

export default UserEditScreen
