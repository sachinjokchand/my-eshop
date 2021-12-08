import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const CheckOutSteps = ({step1 , step2 , step3 , step4}) => {
    return (
        <Nav className='justify-content-center mb-4'> 
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link><i class="fas fa-sign-in-alt"></i> Sign In</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled><i class="fas fa-sign-in-alt"></i> Sign In</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                    <Nav.Link><i class="fas fa-shipping-fast"></i> Shipping</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled><i class="fas fa-shipping-fast"></i> Shipping</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payments'>
                        <Nav.Link><i class="fab fa-cc-paypal"></i> Payments</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled><i class="fab fa-cc-paypal"></i> Payments</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/palceorder'>
                        <Nav.Link><i class="fas fa-check-circle"></i> Place Order</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled><i class="fas fa-check-circle"></i> Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckOutSteps
