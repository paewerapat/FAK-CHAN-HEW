import { deleteDataAPI, getDataAPI, putDataAPI, postDataAPI } from "../../utils/fetchData";
import { addToCart } from "../reducers/cartReducer";
import { GLOBALTYPES } from "./globalTypes";

export const CART_TYPES = {
    CREATE_CART: "CREATE_CART",
    ADD_CART: "ADD_CART",
    GET_CART: "GET_CART",
    UPDATE_CART: "UPDATE_CART",
    DELETE_CART: "DELETE_CART",
    DELETE_ALL_CART: "DELETE_ALL_CART",
    SUBMIT_CART: "SUBMIT_CART"
}


export const addNewCart = ({values, auth}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await putDataAPI("cart", {values: JSON.stringify([values])}, auth.token)
        dispatch({
            type: CART_TYPES.CREATE_CART,
            payload: values
        })
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg }})
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const getCart = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI("cart", token)
        dispatch({
            type: CART_TYPES.GET_CART,
            payload: res.data.cart
        })
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const addCart = ({values, cart, auth}) => async (dispatch) => {
    const newCart = addToCart(cart.myCart, values.seller_id, values)
    console.log(newCart)
    // dispatch({
    //     type: CART_TYPES.ADD_CART,
    //     payload: newCart
    // })
    try {
        // const res = await putDataAPI("cart", {values: JSON.stringify(newCart)}, auth.token)
        // dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg }})
    } catch (err) {
        return dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const updateCart = (newCart, token) => async (dispatch) => {
    dispatch({
        type: CART_TYPES.ADD_CART,
        payload: newCart
    })
    try {
        // const res = await putDataAPI("cart", {values: JSON.stringify(newCart)}, token)
        // dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const deleteCart = ({orderData, auth}) => async (dispatch) => {
    try {
        await putDataAPI("cart", orderData, auth.token);
        dispatch({
            type: CART_TYPES.DELETE_CART,
            payload: orderData
        })
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const deleteAllCart = (token) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await deleteDataAPI("cart", token)
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
        dispatch({type: CART_TYPES.DELETE_ALL_CART, payload: []})
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const submitCart = ({myCart, auth}) => async (dispatch) => {
    try {
        
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

