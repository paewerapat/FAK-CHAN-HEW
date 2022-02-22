import { GLOBALTYPES } from './globalTypes'
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'

export const CATEGORY_TYPES = {
    CREATE_CATEGORY: 'CREATE_CATEGORY',
    GET_CATEGORY: 'GET_CATEGORY',
    UPDATE_CATEGORY: 'UPDATE_CATEGORY',
    DELETE_CATEGORY: 'DELETE_CATEGORY'
}

export const createCategory = ({values, auth}) => async (dispatch) => {
    try {

        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true} })
        const res = await postDataAPI("category", values, auth.token);
        dispatch({
            type: CATEGORY_TYPES.CREATE_CATEGORY,
            payload: {...values, category_id: res.data.newCategory}
        })
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg} })
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false} })
        
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const getCategory = (token) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await getDataAPI("category", token)

        dispatch({type: CATEGORY_TYPES.GET_CATEGORY, payload: res.data.category})
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const updateCategory = ({categoryData, auth}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true} })
        const res = await patchDataAPI("category", categoryData, auth.token)
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
        dispatch({
            type: CATEGORY_TYPES.UPDATE_CATEGORY,
            payload: categoryData
        })
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false} })
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const deleteCategory = ({categoryData, auth}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true} })
        const res = await deleteDataAPI(`category/${categoryData.category_id}`, auth.token)
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
        dispatch({
            type: CATEGORY_TYPES.DELETE_CATEGORY,
            payload: categoryData
        })
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false} })
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}