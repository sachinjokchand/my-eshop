import React, { useState, useEffect } from 'react'
import { Card, Button, Accordion, Row, Col, Form, CardDeck } from 'react-bootstrap'
import queryString from 'query-string'
import { Product } from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

const ProductsScreen = ({ location }) => {

    const dispatch = useDispatch()
    const query = queryString.parse(location.search)

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [rating, setRating] = useState('')
    const [keyword, setKeyword] = useState('')




    useEffect(() => {
        query.keyword ? setKeyword(query.keyword) : setKeyword('')
        query.brand ? setBrand(query.brand) : setBrand('')
        query.category ? setCategory(query.category) : setCategory('')
        submitHandler(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const resetHandler = () => {
        setBrand('')
        setCategory('')
        setRating('')
        setPrice('')
        setKeyword('')
    }

    const submitHandler = (pageNumber = '1') => {
        if (price <= 1) {
            setPrice('')
        }
        dispatch(listProducts(keyword, price, brand, category, rating, Number(pageNumber)))
    }

    return (
        <div>
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
                                                Rating
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
            <div>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
                    {products.length === 0 && <Row className='text-center'><h1>No product Found</h1></Row>}
                    {products.length !== 0 && <Row>
                        <CardDeck>
                            {products.map(product => (
                                    <Product match={product} key={product._id} />
                            ))}
                        </CardDeck>
                    </Row>}

                    <Paginate pages={pages} page={page} submitHandler={submitHandler} />
                </>}


            </div>
        </div>
    )
}

export default ProductsScreen
