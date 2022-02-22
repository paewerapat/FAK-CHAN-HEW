import { patchDataAPI } from "../../utils/fetchData"
import { GLOBALTYPES } from "./globalTypes"
import { createNotify } from "./notifyAction"

export const MEMBER_TYPES = {
    UPDATE_MEMBER: "UPDATE_MEMBER",
}



export const updateRoleMember = ({id, auth, socket}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await patchDataAPI("all-members", {villagers_id: id}, auth.token)
        dispatch({
            type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}
        })
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})

        // Notify
        const msg = {
            text: "คุณได้รับการยืนยันตัวตนจากผู้จัดการแล้ว!",
            recipients: id,
            url: '/profile',
        }
        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}