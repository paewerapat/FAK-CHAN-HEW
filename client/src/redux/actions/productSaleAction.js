import { imageDestroy, imageUpload } from '../../utils/imageUpload'
import { GLOBALTYPES } from './globalTypes'
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'


export const PRODUCTSALE_TYPES = {
    CREATE_PRODUCTSALE: 'CREATE_PRODUCTSALE',
    GET_PRODUCTSALE: 'GET_PRODUCTSALE',
    UPDATE_PRODUCTSALE: 'UPDATE_PRODUCTSALE',
    DELETE_PRODUCTSALE: 'DELETE_PRODUCTSALE'
}

export const createProductSale = ({saleData, images, auth}) => async (dispatch) => {

    let media = []
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: true } })

        if(images) media = await imageUpload(images)
        const res = await postDataAPI("product-sale", {...saleData, images: JSON.stringify(media) }, auth.token)

        dispatch({
            type: PRODUCTSALE_TYPES.CREATE_PRODUCTSALE,
            payload: {...saleData, Images: media, sale_id: res.data.IdproductSale, updated: new Date().toLocaleString() + ""}
        })
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: false }})
        dispatch({type: GLOBALTYPES.ALERT, payload: { success: res.data.msg}})

    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const getProductSale = () => async (dispatch) => {
    try {
        const res = await getDataAPI("product-sale?page=1")
        dispatch({
            type: PRODUCTSALE_TYPES.GET_PRODUCTSALE,
            payload: res.data
        })
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const updateProductSale = ({saleData, auth}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await patchDataAPI(`my-product-sale/${saleData.sale_id}`, saleData, auth.token)
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
        dispatch({type: PRODUCTSALE_TYPES.UPDATE_PRODUCTSALE, payload: saleData})
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
        window.history.back()
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const deleteProductSale = ({saleData, images, auth}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: true }})
        imageDestroy(images)
        const res = await deleteDataAPI(`my-product-sale/${saleData.sale_id}`, auth.token)
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: false }})
        window.location.reload()
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const outStockProductSale = ({saleData, auth}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: true }})
        const res = await patchDataAPI('stock-product-sale', saleData.sale_id, auth.token)
        dispatch({type: GLOBALTYPES.ALERT, payload: { success: res.data.msg }})
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: false }})

    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}