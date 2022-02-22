import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    RollbackOutlined,
    CheckOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { imageCheck } from '../../utils/imageUpload'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { updateInformationProfile } from '../../redux/actions/profileAction'


const EditInformation = () => {

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch();
    const params = useParams()
    const [avatar, setAvatar] = useState(false)

    // Information
    const initialInformationState = {
        villagers_id: '', full_name: '', house_number: '', alley: '', avatar: ''
    }
    const [userData, setUserData] = useState(initialInformationState);
    const { villagers_id, full_name, house_number, alley } = userData;

    const changeAvatar = (e) => {
        const file = e.target.files[0];
        const err = imageCheck(file)
        if(err) return dispatch({
            type: GLOBALTYPES.ALERT, payload: {error: err}
        })
        setAvatar(file)
    }
    
    const handleChangeInformation = (e) => {
        const {name, value} = e.target
        setUserData({...userData, [name]:value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateInformationProfile({userData, avatar, auth}));
    }
    
    useEffect(() => {
        if(params.id){
            dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
            getDataAPI(`profile-user/${params.id}`, auth.token)
            .then(res => {
                setUserData({...res.data.profile, avatar: JSON.parse(res.data.profile.avatar)[0]})
                dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
            }).catch(err => {
                dispatch({type: GLOBALTYPES.ALERT, payload: err.response.data.msg})
            })
        } else {
            setUserData({...auth.user, avatar: JSON.parse(auth.user.avatar)[0]})
        }
    }, [auth.user, params.id, auth.token, dispatch])

    return (
        <form onSubmit={handleSubmit}>
            <fieldset disabled={auth.user.villagers_id === params.id ? '' : !params.id ? '' : 'disabled'}>
                <div className="profile_avatar">
                    <img src={avatar ? URL.createObjectURL(avatar) : userData.avatar.url} alt="profile" />
                    <span>
                    <i className="fas fa-camera" />
                        <p>Change</p>
                        <input type="file" name="file" id="file_up"
                        accept="image/*" onChange={changeAvatar}/>
                    </span>
                </div>

                <div className="mb-2">
                    <label className="form-label mt-3">เบอร์โทรศัพท์</label>
                        <input type="text" className="form-control" name="villagers_id"
                        onChange={handleChangeInformation} value={villagers_id} 
                        style={{background: `${alert.villagers_id ? 'crimson' : ''}`}} />

                        <small className="form-text text-danger">
                            {alert.villagers_id ? alert.villagers_id : ''}
                        </small>
                </div>
                
                <div className="mb-2">
                <label className="form-label">ชื่อ-สกุล</label>
                    <input type="text" className="form-control" name="full_name"
                    value={full_name} onChange={handleChangeInformation}
                    style={{background: `${alert.full_name ? 'crimson' : ''}`}} />

                    <small className="form-text text-danger">
                        {alert.full_name ? alert.full_name : ''}
                    </small>
                </div>

                <div className="mb-2">
                <label className="form-label">บ้านเลขที่</label>
                    <input type="text" className="form-control" name="house_number"
                    value={house_number} onChange={handleChangeInformation}
                    style={{background: `${alert.house_number ? 'crimson' : ''}`}} />

                    <small className="form-text text-danger">
                        {alert.house_number ? alert.house_number : ''}
                    </small>
                </div>

                <label className="form-label">ซอย</label>
                    <input type="text" className="form-control mb-2" name="alley"
                    value={alley} onChange={handleChangeInformation}/>
                
                <div className="d-grid mt-4 gap-2 col-md-6 mx-auto my-3">
                {
                    auth.user !== userData || avatar !== false
                    ?
                    <button className="btn btn-primary" type="submit">
                        <CheckOutlined /> อัพเดทข้อมูล
                    </button>
                    :
                    <button className="btn btn-primary" disabled type="submit">
                        <CheckOutlined /> อัพเดทข้อมูล
                    </button>
                }
                    <button className="btn btn-secondary" type="reset">
                        <RollbackOutlined /> รีเซ็ต
                    </button>
                </div>
            </fieldset>
        </form>
    )
}

export default EditInformation
