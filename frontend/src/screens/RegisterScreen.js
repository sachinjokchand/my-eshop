import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import Loader from '../components/Loader'
import FromContainer from '../components/FormContainer'
import Message from '../components/Message'
import Meta from '../components/Meta'
//REDUX
import { register } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const RegisterScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userRegister
    const userInfo2 = userLogin.userInfo
    console.log(location.search);

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo || userInfo2) {
            history.push(redirect)
        }

    }, [history, userInfo, redirect , userInfo2])


    const submitHandler = (e) => {
        e.preventDefault()
        
        timer()
        if(password !== confirmPassword){
            setMessage('Password do not match')
        }else{
            dispatch(register(name, email, password))
        }
        
    }
    const timer =()=>{
        setTimeout(()=> {
            setMessage('')
        } , 5000)
    }
    return (
        <FromContainer>
        <Meta title='Registration' />
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
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
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row>
        </FromContainer>
    )
}

export default RegisterScreen
