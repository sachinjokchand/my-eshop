import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap'
//reducer
import { listOrders } from '../actions/orderAction'
import { useDispatch, useSelector } from 'react-redux'

const OrderListScreen = ({ history }) => {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/')
        }
    }, [dispatch, userInfo, history])

    return (

        <>
            <h1>Order List</h1>


            {loading ?
                <Loader />
                : error ? <Message varient='danger' >{error}</Message>
                    : (<>
                        { orders.length === 0 && <Message>Not orders</Message>}
                        <Table striped responsive hover bordered className='table-sm' >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
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
                                        <td>{order.user && order.user.name}</td>
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
                    )
            }


        </>
    )
}

export default OrderListScreen
