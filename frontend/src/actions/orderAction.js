import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_MY_ORDERS_REQUEST,
    ORDER_MY_ORDERS_SUCCESS,
    ORDER_MY_ORDERS_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL
} from '../constants/orderConstants'
import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        const userInfo = getState().userLogin.userInfo

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/order`,
            order,
            config
        )
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
        const userInfo = getState().userLogin.userInfo

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/order/${id}`, config
        )
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


export const payOrder = (orderID, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })
        const userInfo = getState().userLogin.userInfo

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(
            `/api/order/${orderID}/pay`,
            paymentResult,
            config
        )
        dispatch({
            type: ORDER_PAY_SUCCESS,
            success: true
        })
    } catch (error) {

        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })
        const userInfo = getState().userLogin.userInfo
        
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(
            `/api/order/${order._id}/delivered`,
            {},
            config
        )
        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            success: true
        })
    } catch (error) {

        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const getMyOrderList = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_MY_ORDERS_REQUEST
        })
        const userInfo = getState().userLogin.userInfo

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            '/api/order/listmyorder',
             config
        )
        dispatch({
            type: ORDER_MY_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: ORDER_MY_ORDERS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const getOrderListByID = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_MY_ORDERS_REQUEST
        })
        const userInfo = getState().userLogin.userInfo

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            '/api/order/listmyorder',
             id,
             config
        )
        dispatch({
            type: ORDER_MY_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: ORDER_MY_ORDERS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })
        const userInfo = getState().userLogin.userInfo

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            '/api/order',
             config
        )
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}