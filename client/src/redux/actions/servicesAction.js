import { patchDataAPI, getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";


export const SERVICES_TYPES = {
    UPDATE_DISTANCE_CHARGE: "CREATE_DISTANCE_CHARGE",
    UPDATE_SERVICE_CHARGE: "CREATE_SERVICE_CHARGE",
    GET_SERVICES_CHARGE: "GET_DISTANCE_CHARGE",
}

export const updateDistanceCharge = ({charge, auth}) => async (dispatch) => {
    try {

        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await patchDataAPI("distance-charge", charge, auth.token);
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
        dispatch({
            type: SERVICES_TYPES.UPDATE_SERVICE_CHARGE,
            payload: res.data.distanceService
        })
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const updateServiceCharge = ({charge, auth}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await patchDataAPI("service-charge", charge, auth.token);
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const getServicesCharge = (token) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await getDataAPI("services-charge", token);
        dispatch({
            type: SERVICES_TYPES.GET_SERVICES_CHARGE,
            payload: res.data
        })
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}