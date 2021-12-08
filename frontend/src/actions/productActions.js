import {
    PRODUCT_LIST_FAILS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_FAILS,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAILS,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAILS,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAILS,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAILS,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAILS
} from '../constants/productConstants'
import axios from 'axios'


export const listProducts = (keyword = '' , price='' , brand='' , category='' ,rating='' ,pageNumber='') => async (dispatch) => {
    try {
        
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`/api/product?keyword=${keyword}&price=${price}&brand=${brand}&category=${category}&rating=${rating}&pageNumber=${pageNumber}`)

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })

    } catch (error) {
        console.log('here');
        dispatch({ type: PRODUCT_LIST_FAILS, payload: error })
    }
}

export const listProductsDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/product/${id}`)

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAILS,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })
        const userInfo = getState().userLogin.userInfo

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(
            `/api/product/${id}`,
            config
        )
        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })
    } catch (error) {

        dispatch({
            type: PRODUCT_DELETE_FAILS,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    console.log(product);
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const userInfo = getState().userLogin.userInfo

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(
            `/api/product/${product._id}`,
            product,
            config
        )
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: PRODUCT_UPDATE_FAILS,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const userInfo = getState().userLogin.userInfo

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.post(
            `/api/product/createproduct`,
            product,
            config
        )
        dispatch({
            type: PRODUCT_CREATE_SUCCESS
        })
    } catch (error) {

        dispatch({
            type: PRODUCT_CREATE_FAILS,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const createProductReview = (productId , review) => async (dispatch, getState) => {

    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const userInfo = getState().userLogin.userInfo

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
         await axios.post(
            `/api/product/${productId}/reviews`,
            review,
            config
        )
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS
        })
    } catch (error) {

        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAILS,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST })

        const { data } = await axios.get(`/api/product/top`)

        dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data })

    } catch (error) {
        console.log('here');
        dispatch({ type: PRODUCT_TOP_FAILS, payload: error })
    }
}
