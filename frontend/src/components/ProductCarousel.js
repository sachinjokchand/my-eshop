import React, { useEffect } from 'react'
import Loader from './Loader'
import Message from './Message'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { listTopProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'

const ProductCarousel = () => {

    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])
    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover' className='bg-dark' fade >
            {products.map(product =>
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`} style={{ height: "60vh", display: 'flex', justifyContent: 'center' }}>
                        <Image src={product.image}
                            alt={product.name}
                            roundedCircle
                            style={{
                                maxHeight: "80%",
                                maxWidth: "80%",
                                objectFit: 'contain'
                            }} />
                        <Carousel.Caption className='carousel-caption'>
                            <h2 className='carouselCaption' style={{ color: 'white' }}>{product.name} ($ {product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            )}
        </Carousel>
    )
}

export default ProductCarousel
