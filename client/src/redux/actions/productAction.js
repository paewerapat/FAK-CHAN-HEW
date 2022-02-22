import { GLOBALTYPES } from './globalTypes'
import { getDataAPI, postDataAPI } from '../../utils/fetchData'
import { imageUpload } from '../../utils/imageUpload'


export const PRODUCT_TYPES = {
    CREATE_PRODUCT: 'CREATE_PRODUCT',
    LOADING_PRODUCT: 'LOADING_PRODUCT',
    GET_PRODUCTS: 'GET_PRODUCTS',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    GET_PRODUCT: 'GET_PRODUCT',
    DELETE_PRODUCT: 'DELETE_PRODUCT'
}

export const createProduct = ({productData, images, auth}) => async (dispatch) => {
    try {
        let media;
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: true } })
        media = await imageUpload([images])
        const res = await postDataAPI("products", {...productData, images: JSON.stringify(media[0])}, auth.token)

        dispatch({type: GLOBALTYPES.ALERT, payload: { success: res.data.msg}})
        dispatch({
            type: PRODUCT_TYPES.CREATE_PRODUCT,
            payload: {...productData, images: JSON.stringify(media[0]), product_id: res.data.newProduct}
        })
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: false }})

    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const getProducts = (token) => async (dispatch) => {
    try {
        
        const res = await getDataAPI("products", token)
        dispatch({
            type: PRODUCT_TYPES.GET_PRODUCTS,
            payload: res.data
        })

    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}