import { postDataAPI, getDataAPI, patchDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from './globalTypes'


export const NOTIFY_TYPES = {
    GET_NOTIFIES: "GET_NOTIFIES",
    CREATE_NOTIFY: "CREATE_NOTIFY",
    REMOVE_NOTIFY: "REMOVE_NOTIFY",
    UPDATE_NOTIFY: "UPDATE_NOTIFY",
    UPDATE_SOUND: "UPDATE_SOUND",
    DELETE_ALL_NOTIFIES: "DELETE_ALL_NOTIFIES"
}

export const createNotify = ({msg, auth, socket}) => async (dispatch) => {
    try {
        const res = await postDataAPI('notify', msg, auth.token)
        socket.emit('createNotify', {
            ...msg,
            id: res.data.notifies,
            readed: 'false',
            full_name: auth.user.full_name,
            user: auth.user.villagers_id,
            avatar: auth.user.avatar
        })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg}
        })
    }
}

export const removeNotify = ({msg, auth, socket}) => async (dispatch) => {
    try {
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg}
        })
    }
}

export const getNotifies = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI("notify", token)
        dispatch({
            type: NOTIFY_TYPES.GET_NOTIFIES,
            payload: res.data
        })
    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: { error: err.response.data.msg }
        })
    }
}

export const isReadNotify = ({msg, auth}) => async (dispatch) => {
    try {
        dispatch({type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: {...msg, readed: 1}})
        await patchDataAPI(`notify/${msg.id}`, {}, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const deleteAllNotifies = (token) => async (dispatch) => {
    try {
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}