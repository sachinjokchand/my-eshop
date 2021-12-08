import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

export const Product = ({ match }) => {


    return (
        <Card border="secondary" variant="top" className="my-3 rounded" style={{ minWidth: '30ch' }}>
            <Link to={'/product/' + match._id} className='border mx-3' style={{ height: "30vh", display: 'flex', justifyContent: 'center' }} >
                <Card.Img src={match.image} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: 'contain' }} />
            </Link>
            <Card.Body>
                <Link to={'/product/' + match._id}>
                    <Card.Title>
                        <strong>{match.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <div>
                        <Rating value={match.rating} text={' ' + match.numReviews + ' reviews'} />
                    </div>
                </Card.Text>
                <Card.Text as='h3'>
                    ${match.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
