import { GLOBALTYPES } from "./globalTypes";
import { patchDataAPI } from '../../utils/fetchData'
import { imageUpload } from "../../utils/imageUpload";


export const updateInformationProfile = ({userData, avatar, auth}) => async (dispatch) => {

    if(!userData.villagers_id > 10)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "เบอร์โทรศัพท์มีความยาวเพียง 10 ตัวอักษรเท่านั้น!"}})

    if(!userData.full_name.length > 50)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "ชื่อ-นามสกุลต้องมีความยาวไม่เกิน 50 ตัวอักษร"}})

    if(!userData.house_number.length > 20)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "บ้านเลขที่ต้องมีความยาวไม่เกิน 20 ตัวอักษร!"}})

    try {
        let media;
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

        if(avatar) media = await imageUpload([avatar])

        const res = await patchDataAPI("update-profile", {
            ...userData, avatar: JSON.stringify(media)
        }, auth.token)

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user, ...userData,
                    avatar: avatar ? JSON.stringify(media)[0] : auth.user.avatar,
                }
            }
        })

        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: {error: err.response.data.msg}
        })
    }
}

export const updatePasswordProfile = ({userPass, auth}) => async (dispatch) => {
    try {

        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true} })

        if(userPass.oldPassword === userPass.newPassword)
        return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "รหัสผ่านเก่าซ้ำกับรหัสผ่านใหม่!"}})

        if(userPass.newPassword !== userPass.cfNewPassword)
        return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "การยืนยันรหัสผ่านใหม่ไม่ถูกต้อง!"}})

        const res = await patchDataAPI('update-password', userPass, auth.token)

        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg} })
        dispatch({type: GLOBALTYPES.ALERT, payload: {info: "กรุณาเข้าสู่ระบบใหม่ หลังจากเปลี่ยนรหัสผ่าน"} })
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false} })

        localStorage.removeItem('token')
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {}
        })

    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}