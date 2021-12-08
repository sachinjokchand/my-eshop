import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_GET_BY_ID_REQUEST,
    USER_GET_BY_ID_SUCCESS,
    USER_GET_BY_ID_FAIL,
    USER_MAKE_ADMIN_REQUEST,
    USER_MAKE_ADMIN_SUCCESS,
    USER_MAKE_ADMIN_FAIL
} from '../constants/userConstants'
import {
    ORDER_MY_ORDERS_RESET
} from '../constants/orderConstants'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/user/login',
            { email, password },
            config
        )
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('YourEshop-userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('YourEshop-userInfo')
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: ORDER_MY_ORDERS_RESET
    })
    dispatch({
        type: USER_LIST_RESET
    })
}

export const register = (name, email, password) => async (dispatch) => {

    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/user',
            { name, email, password },
            config
        )
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('YourEshop-userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })
        const userInfo = getState().userLogin.userInfo

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/user/${id}`,
            config
        )
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })
        const userInfo = getState().userLogin.userInfo

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/user/profile`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        localStorage.setItem('YourEshop-userInfo', JSON.stringify(data))
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })
        const userInfo = getState().userLogin.userInfo

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/user`,
            config
        )

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


export const deleteUsers = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })
        const userInfo = getState().userLogin.userInfo

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(
            `/api/user/${id}`,
            config
        )

        dispatch({
            type: USER_DELETE_SUCCESS
        })

    } catch (error) {

        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


export const getUserDetailsByID = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_GET_BY_ID_REQUEST
        })
        const userInfo = getState().userLogin.userInfo
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/user/${id}`,
            config
        )
        dispatch({
            type: USER_GET_BY_ID_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: USER_GET_BY_ID_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const makeUserAdminByID = (id) => async ( dispatch, getState ) => {

    try {
        dispatch({
            type: USER_MAKE_ADMIN_REQUEST
        })
        const userInfo = getState().userLogin.userInfo

        const config = {
            headers: {
                "Content_Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = axios.post(
            '/api/user/profile',
            id,
            config
        )

        dispatch({
            type: USER_MAKE_ADMIN_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: USER_MAKE_ADMIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }


}