import { GLOBALTYPES } from './globalTypes'
import { postDataAPI, getDataAPI } from '../../utils/fetchData'


export const PRODUCT_BY_LOCATION_TYPES = {
    CREATE_PRODUCT_BY_LOCATION: 'CREATE_PRODUCT_BY_LOCATION',
    GET_PRODUCT_BY_LOCATION: 'GET_PRODUCT_BY_LOCATION'
}

export const createProductByLocation = ({productByLocation, auth}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await postDataAPI("product-by-location", productByLocation, auth.token)
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
        
        dispatch({
            type: PRODUCT_BY_LOCATION_TYPES.CREATE_PRODUCT_BY_LOCATION,
            payload: {...res.data.values, product_by_location_id: res.data.id}
        })
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const getProductByLocation = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI("product-by-location", token)
        dispatch({
            type: PRODUCT_BY_LOCATION_TYPES.GET_PRODUCT_BY_LOCATION,
            payload: res.data.productByLocation
        })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}