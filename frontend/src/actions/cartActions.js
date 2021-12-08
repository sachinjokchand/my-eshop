import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM , CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS} from '../constants/cartConstants'

export const addToCart = (id , qty) => async(dispatch , getState)=>{
    const {data} = await axios.get(`/api/product/${id}`)
    console.log("IN ACTION");
    dispatch({
        type:CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image : data.image,
            price:data.price,
            countInStock : data.countInStock,
            qty
        }
    })

    localStorage.setItem('YourEshop-cartItem' , JSON.stringify(getState().cart.cartItems))
}

export const remoneFromCart = (id) => (dispatch , getState)=>{
    dispatch({
        type : CART_REMOVE_ITEM , 
        payload : id
    })

    localStorage.setItem( 'YourEshop-cartItem' , JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch , getState)=>{
    dispatch({
        type : CART_SAVE_SHIPPING_ADDRESS , 
        payload : data
    })

    localStorage.setItem( 'YourEshop-shippingAddress' , JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch , getState)=>{
    dispatch({
        type : CART_SAVE_PAYMENT_METHOD , 
        payload : data
    })

    localStorage.setItem( 'YourEshop-paymentMethod' , JSON.stringify(data))
}