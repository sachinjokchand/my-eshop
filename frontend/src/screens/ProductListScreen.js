import React, { useEffect, useState } from 'react'
import { Button, Table, Row, Col, Card, Form, Accordion } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap'
import Paginate from '../components/Paginate'
//reducer
import { listProducts, deleteProduct } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'

const ProductListScreen = ({ history, match }) => {

    const dispatch = useDispatch()

    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [rating, setRating] = useState('')
    const [keyword, setKeyword] = useState('')

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            submitHandler(1)
        } else {
            history.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, userInfo, history, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(id))
        }
    }

    const submitHandler = (pageNumber = '1') => {
        if (price <= 1) {
            setPrice('')
        }
        dispatch(listProducts(keyword, price, brand, category, rating, Number(pageNumber)))
    }

    const resetHandler = () => {
        setBrand('')
        setCategory('')
        setRating('')
        setPrice('')
        setKeyword('')
    }

    const createProductHandler = () => {
        history.push('/admin/product/create')
    }

    return (

        <>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            <Row className='align-text-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                </Button>
                </Col>
                <Col sm={12}>
                    <Accordion >
                        <Card>
                            <Card.Header className='text-right'>
                                <Accordion.Toggle eventKey='0' as={Button} variant='outline-dark' className='btn-sm btn-secondary'>
                                    <i class="fas fa-filter"></i> Filter
                        </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey='0'>
                                <>
                                    <Card.Body>
                                        <Row>
                                            <Col sm={12} className='py-3'>
                                                <Form.Control type='text'
                                                    onChange={(e) => setKeyword(e.target.value)}
                                                    placeholder='Keyword'
                                                    value={keyword} />
                                            </Col>
                                            <Col lg={3} md={6} sm={12} >
                                                <Form.Group>
                                                    <Form.Label>
                                                        Brand
                                    </Form.Label>
                                                    <Form.Control as="select" value={brand} onChange={(e) => setBrand(e.target.value)}>
                                                        <option value=''>Select Brand</option>
                                                        <option value='dell'>Dell</option>
                                                        <option value='lg'>LG</option>
                                                        <option value='samsung'>Samsung</option>
                                                        <option value='apple'>Apple</option>
                                                    </Form.Control>
                                                </Form.Group>

                                            </Col>
                                            <Col lg={3} md={6} sm={12}>
                                                <Form.Group>
                                                    <Form.Label>
                                                        Category
                                    </Form.Label>
                                                    <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                                        <option value=''>Select Category</option>
                                                        <option value='phone'>Phone</option>
                                                        <option value='laptop'>Laptop</option>
                                                        <option value='watch'>Watch</option>
                                                        <option value='tv'>TV</option>
                                                        <option value='accessory'>Accessory</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={3} md={6} sm={6}>
                                                <Form.Group>
                                                    <Form.Label>
                                                        Category
                                    </Form.Label>
                                                    <Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
                                                        <option value=''>Select minimum Rating</option>
                                                        <option value='1'>1</option>
                                                        <option value='2'>2</option>
                                                        <option value='3'>3</option>
                                                        <option value='4'>4</option>
                                                        <option value='5'>5</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={3} md={6} sm={6}>
                                                <Form.Group>
                                                    <Form.Label>
                                                        Price
                                        </Form.Label>
                                                    <Form.Control type="number"
                                                        value={price}
                                                        placeholder='Maximum Price'
                                                        onChange={(e) => setPrice(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer className='text-right'>
                                        <Button onClick={resetHandler} variant='outline-dark' className='btn-sm btn-secondary outline-dark'>
                                            Reset
                                </Button>
                                        <Button onClick={submitHandler} variant='outline-dark' className='btn-sm btn-secondary outline-dark'>
                                            Apply
                                </Button>
                                    </Card.Footer>
                                </>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>
            </Row>
            {loading ?
                <Loader />
                : error ? <Message varient='danger' >{error}</Message>
                    : (<>
                        <Table striped hover responsive bordered className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>STOCK</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.countInStock}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>

                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Paginate pages={pages} page={page} submitHandler={submitHandler} />
                    </>
                    )}


        </>
    )
}

export default ProductListScreen
