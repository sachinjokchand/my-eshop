import React, { useEffect } from 'react'
import { Row,  CardDeck } from 'react-bootstrap'
import { Product } from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'
//REDUX
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

export default function HomeScreen({ match }) {

    const keyword = match.params.keyword
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <div>
            <Meta />
            {!keyword && <ProductCarousel />}
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger' >{error}</Message>
                ) : (
                    <>
                        {products.length === 0 && <Row className='text-center'><h1>No product Found</h1></Row>}
                        {products.length !== 0 && <Row>
                            <CardDeck>
                                {products.map(product => (
                                    <Product match={product} key={product._id} />
                                ))}
                            </CardDeck>
                        </Row>}
                    </>
                )
            }

        </div >
    )
}
