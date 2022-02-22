import { deleteDataAPI, getDataAPI, putDataAPI, postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";


export const CART_TYPES = {
    ADD_CART: "ADD_CART",
    GET_CART: "GET_CART",
    UPDATE_CART: "UPDATE_CART",
    DELETE_CART: "DELETE_CART",
    DELETE_ALL_CART: "DELETE_ALL_CART",
    SUBMIT_CART: "SUBMIT_CART"
}


export const addCart = ({values, auth}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await postDataAPI("cart", {values: JSON.stringify(values)}, auth.token)
        dispatch({
            type: CART_TYPES.ADD_CART,
            payload: JSON.stringify(values)
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

export const updateCart = ({orderData, auth}) => async (dispatch) => {
    try {
        const res = await putDataAPI("cart", orderData, auth.token)
        dispatch({
            type: CART_TYPES.UPDATE_CART,
            payload: orderData
        })
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const deleteCart = (token) => async (dispatch) => {
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

