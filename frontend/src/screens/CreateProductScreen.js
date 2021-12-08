import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import Message from '../components/Message'
//REDUX
import { createProduct } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const CreateProductScreen = ({ location, history, match }) => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState()
    const [description, setDesciption] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productCreate = useSelector(state => state.productCreate)
    const { error, loading, success } = productCreate


    const userLogin = useSelector(state => state.userLogin)
    const userInfo = userLogin.userInfo



    useEffect(() => {

        if (success) {
            dispatch({ type: PRODUCT_CREATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!userInfo && !userInfo.isAdmin) {
                history.push('/login')
            }

        }

    }, [dispatch, userInfo, history, success])


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
        dispatch(createProduct({
            user: userInfo.id,
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
            <Meta title='Add Product' />
            <FormContainer>
                <h2>Create Product</h2>
                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}

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
                            name='image'
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
                        Create
                        </Button>

                </Form>

            </FormContainer>
        </>
    )
}

export default CreateProductScreen
