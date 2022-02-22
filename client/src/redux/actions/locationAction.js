import { getDataAPI, postDataAPI } from "../../utils/fetchData"
import { GLOBALTYPES } from "./globalTypes"


export const LOCATION_TYPES = {
    CREATE_LOCATION: "CREATE_LOCATION",
    GET_LOCATION: "GET_LOCATION"
}


export const createLocation = ({locationData, auth}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await postDataAPI("location", locationData, auth.token)
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
        dispatch({
            type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}
        })

        dispatch({
            type: LOCATION_TYPES.CREATE_LOCATION,
            payload: {...locationData, location_id: res.data.location}
        })
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}


export const getLocation = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI("location", token)
        dispatch({type: LOCATION_TYPES.GET_LOCATION, payload: res.data.location})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}