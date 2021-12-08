import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//REDUCERS
import {
    productListReducers,
    productDetailReducers,
    productTopRatedReducer,
    productDeleteReducers,
    productUpdateReducer,
    productCreateReducer,
    productReviewCreateReducer
} from './reducers/productsReducers'
import { cartReducer } from './reducers/cartReducer'
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderMyListReducer,
    orderByIDReducer,
    orderListReducer,
    orderDeliverReducer
} from './reducers/orderReducer'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userListReducer,
    updateUserDetailsReducer,
    userDeleteReducer,
    userByIDReducer,
    makeUserAdminReducer
} from './reducers/userReducer'
//ACTIONS

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailReducers,
    productDelete:productDeleteReducers,
    productTopRated:productTopRatedReducer,
    productUpdate:productUpdateReducer,
    productCreate:productCreateReducer,
    productReviewCreate:productReviewCreateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userList : userListReducer,
    userDelete : userDeleteReducer,
    makeUserAdmin : makeUserAdminReducer,
    updateUserDetails: updateUserDetailsReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay:orderPayReducer,
    orderList: orderListReducer,
    orderDeliver:orderDeliverReducer,
    orderMyList:orderMyListReducer,
    orderByID : orderByIDReducer,
    userByID : userByIDReducer
    
})

const cartItemFromLocalStorage = localStorage.getItem('YourEshop-cartItem') ?
    JSON.parse(localStorage.getItem('YourEshop-cartItem')) :
    []

const userInfoFromLocalStorage = localStorage.getItem('YourEshop-userInfo') ?
    JSON.parse(localStorage.getItem('YourEshop-userInfo')) :
    null

const shippingAddressFromLocalStorage = localStorage.getItem('YourEshop-shippingAddress') ?
    JSON.parse(localStorage.getItem('YourEshop-shippingAddress')) :
    {}

const initialState = {
    cart: { cartItems: cartItemFromLocalStorage, shippingAddress: shippingAddressFromLocalStorage },
    userLogin: { userInfo: userInfoFromLocalStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store