import { getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData"
import { GLOBALTYPES } from "./globalTypes"
import { createNotify } from "./notifyAction"


export const ORDER_TYPES = {
    ADD_ORDER_PRODUCTSALE: 'ADD_ORDER_PRODUCTSALE',
    GET_ORDER_PRODUCTSALE: 'GET_ORDER_PRODUCTSALE',
    UPDATE_ORDER_PRODUCTSALE: 'UPDATE_ORDER_PRODUCTSALE'
}

export const getOrderProductSale = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI("order-product-sale", token)
        dispatch({type: ORDER_TYPES.GET_ORDER_PRODUCTSALE, payload: res.data})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: err.response.data.msg})
    }
}

export const addOrderBuyProduct = ({orderData, seller, auth, socket}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

        const res = await postDataAPI("order-buy-product", orderData, auth.token)
        dispatch({
            type: ORDER_TYPES.ADD_ORDER_PRODUCTSALE, 
            payload: {
                ...orderData,
                order_date: new Date().toLocaleString() + ""
            }
        })

        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})

        // Notify
        const msg = {
            text: `${auth.user.full_name} สั่งซื้อสินค้าของคุณ!`,
            recipients: seller,
            url: '/sale-order'
        }
        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: err.response.data.msg})
    }
}

export const updateOrderSale = ({data, auth, socket}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await patchDataAPI("order-product-sale", data, auth.token)

        dispatch({
            type: ORDER_TYPES.UPDATE_ORDER_PRODUCTSALE, payload: data
        })
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})

        // Notify
        const msg = {
            text: `ออเดอร์การสั่งซื้อของคุณ ผู้ขาย${data.values}แล้ว`,
            recipients: data.buyer_id,
            url: '/buy-order-status'
        }
        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: err.response.data.msg})
    }
}

export const updateBuyOrderStatus = (token) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await patchDataAPI("order-buy-product", {}, token)
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: err.response.data.msg})
    }
}