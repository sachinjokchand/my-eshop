import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

export default function Header({ history }) {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>

            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand ><i class="fas fa-store fa-2x"></i> YourEShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/products'>
                                <Nav.Link><i class="fas fa-gifts fa-2x"></i>Product</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/cart'>
                                <Nav.Link><i class="fas fa-shopping-cart fa-2x"></i> Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (

                                <Dropdown>
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                        <i class="fas fa-user fa-2x"></i> {userInfo.name}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <LinkContainer to='/profile'><Dropdown.Item><i class="fas fa-address-card"></i>To Profile</Dropdown.Item></LinkContainer>
                                        <Dropdown.Item onClick={logoutHandler}><i class="fas fa-sign-out-alt"></i> Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                //--------------------------

                            ) : (
                                <LinkContainer to='/login' >
                                    <Nav.Link><i class="fas fa-user fa-2x"></i> Sign In</Nav.Link>
                                </LinkContainer>
                            )}

                            {userInfo && userInfo.isAdmin && (
                                <Dropdown>
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                        <i class="fas fa-user-cog fa-2x"></i> Admin
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <LinkContainer to='/admin/userlist'><Dropdown.Item>Users</Dropdown.Item></LinkContainer>
                                        <LinkContainer to='/admin/productlist'><Dropdown.Item>Products</Dropdown.Item></LinkContainer>
                                        <LinkContainer to='/admin/orderlist'><Dropdown.Item>Orders</Dropdown.Item></LinkContainer>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
