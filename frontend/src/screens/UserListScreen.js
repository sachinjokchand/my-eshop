import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import { LinkContainer } from 'react-router-bootstrap'
//reducer
import { deleteUsers, listUsers } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const UserListScreen = ({history}) => {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success:successDelete } = userDelete

    

    useEffect(() => {
        if(userInfo && userInfo.isAdmin ){
            dispatch(listUsers())
        }else{
            history.push('/')
        }
    }, [dispatch , userInfo , history , successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteUsers(id))
        }
    }

    return (

        <>
            <h1>USERS</h1>
            <Meta title='User List' />
            {loading ?
                <Loader /> 
                : error ? <Message varient='danger' >{error}</Message> 
                : (
                    <Table striped hover responsive bordered className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ?
                                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        :
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    }</td>
                                    <td>
                                        <LinkContainer to={`/user/${user._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}


        </>
    )
}

export default UserListScreen
