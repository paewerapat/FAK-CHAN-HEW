import { GLOBALTYPES } from './globalTypes'
import { postDataAPI } from '../../utils/fetchData'
import { valid } from '../../utils/valid'

export const login = (data) => async (dispatch) => {
    try {

        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await postDataAPI('login', data)
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.token,
                user: res.data.payload
            }
        })
        localStorage.setItem("authToken", res.data.token)
        window.location.reload();
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                info: res.data.msg
            }
        })
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const register = (data) => async (dispatch) => {

    const checkData = valid(data)
    if(checkData.errLength > 0) return dispatch({type: GLOBALTYPES.ALERT, payload: checkData.errMsg})

    try {

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const res = await postDataAPI('register', data)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg
            }
        })
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: false} })
        window.location.href = '/login'
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const currentUser = (authToken) => async (dispatch) => {
    if(authToken) {
        try {
            const res = await postDataAPI('current-user', {}, authToken)
            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    token: authToken,
                    user: res.data.user
                }
            })
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('authToken')
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {}
        })
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                info: "คุณออกจากระบบเรียบร้อยแล้ว!"
            }
        })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}
