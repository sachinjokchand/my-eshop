import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
//REDUX
import { listProductsDetails, updateProduct } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET, PRODUCT_DETAILS_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ location, history, match }) => {
    const productID = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDesciption] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successProduct } = productUpdate

    const userLogin = useSelector(state => state.userLogin)
    const userInfo = userLogin.userInfo



    useEffect(() => {

        if (successProduct) {
            dispatch({ type: PRODUCT_DETAILS_RESET })
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!userInfo && !userInfo.isAdmin) {
                history.push('/login')
            } else {
                if (product._id !== productID) {
                    dispatch(listProductsDetails(productID))
                } else {
                    setName(product.name)
                    setPrice(product.price)
                    setBrand(product.brand)
                    setCountInStock(product.countInStock)
                    setCategory(product.category)
                    setImage(product.image)
                    setDesciption(product.description)
                }
            }

        }

    }, [dispatch, userInfo, product, history, productID, successProduct])


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = { 
                headers: { 'Content-Type': 'multipart/form-data' } 
            };
console.log('here');
            const { data } = await axios.post('/api/upload', formData, config)
            console.log(data);
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error);
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productID,
            price,
            brand,
            category,
            countInStock,
            name,
            description,
            image
        }))
    }
    return (
        <>
            <FormContainer>
                <h2>Edit Product</h2>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <FormGroup controlId='name'>
                            <FormLabel>Name</FormLabel>
                            <FormControl
                                required
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup controlId='price'>
                            <FormLabel>Price</FormLabel>
                            <FormControl
                                required
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup controlId='name'>
                            <FormLabel>Image</FormLabel>
                            <FormControl
                                required
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></FormControl>
                            <Form.File
                                id="image-file"
                                label="Choose File"
                                onChange={uploadFileHandler}
                                custom
                            />
                            {uploading && <Loader />}
                        </FormGroup>
                        <FormGroup controlId='brand'>
                            <FormLabel>Brand</FormLabel>
                            <FormControl
                                required
                                type='text'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup controlId='countInStock'>
                            <FormLabel>Count in Stock</FormLabel>
                            <FormControl
                                required
                                type='number'
                                placeholder='Enter count in Stock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup controlId='category'>
                            <FormLabel>Category</FormLabel>
                            <FormControl
                                required
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup controlId='category'>
                            <FormLabel>Description</FormLabel>
                            <FormControl
                                required
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDesciption(e.target.value)}
                            ></FormControl>
                        </FormGroup>

                        <Button type='submit' variant='primary'>
                            Update
                            </Button>

                    </Form>
                )}

            </FormContainer>
        </>
    )
}

export default ProductEditScreen
