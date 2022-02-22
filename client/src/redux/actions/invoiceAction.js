import { getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from './globalTypes'
import { createNotify } from './notifyAction'


export const INVOICE_TYPES = {
    CREATE_INVOICE: 'CREATE_INVOICE',
    GET_INVOICE: 'GET_INVOICE',
}

export const getInvoice = () => async (dispatch) => {
    try {
        const res = await getDataAPI("invoice?page=1")
        dispatch({
            type: INVOICE_TYPES.GET_INVOICE,
            payload: res.data.invoice
        })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const createInvoice = ({data, auth}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await postDataAPI("invoice", data, auth.token)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {success: res.data.msg}
        })
        dispatch({
            type: INVOICE_TYPES.CREATE_INVOICE,
            payload: {...data, invoice_id: res.data.invoice}
        })
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const acceptInvoice = ({data, auth, socket}) => async (dispatch) => {
    try {
        const values = {
            rider_id: data.rider_id,
            invoice_id: data.invoice_id
        }

        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await patchDataAPI(`accept-invoice`, values, auth.token)
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {loading: false}
        })

        const msg = {
            text: `${auth.user.full_name} รับออเดอร์ใบฝากซื้อของคุณแล้ว`,
            recipients: data.client_id,
            url: '/my-invoice'
        }
        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const alreadyShipped = ({data, auth, socket}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await patchDataAPI("invoice-shipped", {}, auth.token)
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})

        const msg = {
            text: `${auth.user.full_name} ใบฝากซื้อของคุณถูกจัดส่งแล้ว`,
            recipients: data.client_id,
            url: '/my-invoice'
        }
        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}