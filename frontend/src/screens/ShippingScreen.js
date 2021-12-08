import React, { useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps'
import Meta from '../components/Meta'

const ShippingScreen = ({history}) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const userInfo = useSelector(state => state.userLogin.userInfo)
    if(!userInfo){
        history.push('/login')
    }

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address , city , postalCode , country}))
        history.push('/payment')
    }

    return (
        <>
        <CheckOutSteps step1 step2 />
        <FormContainer>
        <Meta title='Address' />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </FormGroup>
                <FormGroup controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter City'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </FormGroup><FormGroup controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Postal Code'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </FormGroup><FormGroup controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Country'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </FormGroup>
                <Button type='submit' varient='primary'>Continue</Button>
            </Form>
        </FormContainer>
        </>
    )
}

export default ShippingScreen
