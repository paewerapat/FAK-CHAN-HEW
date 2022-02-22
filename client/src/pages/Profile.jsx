import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
    CheckCircleOutlined,
    FieldTimeOutlined,
    SettingOutlined,
    FormOutlined,
    SafetyOutlined
} from '@ant-design/icons'
import EditInformation from '../components/profile/EditInformation'
import EditPassword from '../components/profile/EditPassword'
import { getDataAPI } from '../utils/fetchData'
import { GLOBALTYPES } from '../redux/actions/globalTypes'

const Profile = () => {

    const { auth } = useSelector(state => state);
    const [changeType, setChangeType] = useState(false)
    const [userData, setUserData] = useState({})
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        if(params.id){
            dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
            getDataAPI(`profile-user/${params.id}`, auth.token)
            .then(res => {
                setUserData(res.data.profile)
                dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
            }).catch(err => {
                dispatch({type: GLOBALTYPES.ALERT, payload: err.response.data.msg})
            })
        } else {
            setUserData(auth.user)
        }
    }, [params.id, auth.token])

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h3 className="text-primary fw-bold">โปรไฟล์ส่วนตัว</h3>
                <h6>คุณสามารถแก้ไขข้อมูลส่วนตัวและอัพเดทรูปโปรไฟล์ได้ที่นี่</h6>
            </div>

            <div className="d-md-flex gap-2 mb-2 justify-content-center">
                    สถานะการเป็นสมาชิก:
                    <div className={userData.role === 1 ? 'text-success' : userData.role === 0 ? 'text-secondary' : 'text-warning'}>
                    {
                        userData.role === 1 
                        ? <> <CheckCircleOutlined /> ยืนยันตัวตนแล้ว </>
                        : userData.role === 0
                        ? <> <FieldTimeOutlined /> กำลังรอการอนุมัติ...</>
                        : <><SafetyOutlined /> ผู้จัดการหมู่บ้าน</>
                    }
                    </div>
                </div>
            <hr/>

            {
                ((!params.id) || (params.id === auth.user.villagers_id)) &&
                <div className="my-3 row gap-2 justify-content-center">
                    <button type="button" className='btn btn-sm btn-outline-primary col-md-3'
                    onClick={() => setChangeType(false)}>
                        <FormOutlined /> แก้ไขข้อมูลส่วนตัว
                    </button>
                    <button type="button" className='btn btn-sm btn-outline-primary col-md-3'
                    onClick={() => setChangeType(true)}>
                        <SettingOutlined /> เปลี่ยนรหัสผ่าน
                    </button>
                </div>
            }
            
            <div className="row justify-content-center">
                <div className="col-6">
                
                    {
                        changeType
                        ? <EditPassword />
                        : <EditInformation />
                    }

                </div>
            </div>

        </div>
    )
}

export default Profile
