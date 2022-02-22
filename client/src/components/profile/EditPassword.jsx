import React, { useState } from 'react'
import {
    RollbackOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    CheckOutlined,
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { updatePasswordProfile } from '../../redux/actions/profileAction'

const EditPassword = () => {

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch();
    const [typePass, setTypePass] = useState(false)
    const [typeNewPass, setTypeNewPass] = useState(false)
    const [typeCfNewPass, setTypeCfNewPass] = useState(false)

    // Password State
    const initialPasswordState = {
        oldPassword: '', newPassword: '', cfNewPassword: ''
    }
    const [userPass, setUserPass] = useState(initialPasswordState);
    const { oldPassword, newPassword, cfNewPassword} = userPass
    
    const handleChangePassword = (e) => {
        const {name, value} = e.target
        setUserPass({...userPass, [name]:value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePasswordProfile({userPass, auth}))
    }

    return (
        <form onSubmit={handleSubmit}>

            <small className='text-danger'>**การเปลี่ยนรหัสผ่าน คุณจะออกจากระบบโดยอัติโนมัติ</small>
            <div className="mb-2 mt-3">
                <label className="form-label">รหัสผ่านเก่า</label>
                    <div className="pass">
                        <input type={typePass ? "text" : "password"} className="form-control" name="oldPassword"
                        value={oldPassword} onChange={handleChangePassword}
                        style={{background: `${alert.password ? 'crimson' : ''}`}} />

                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </small>
                    </div>

                    <small className="form-text text-danger">
                        {alert.password ? alert.password : ''}
                    </small>
                </div>

                <div className="mb-2">
                <label className="form-label">รหัสผ่านใหม่</label>
                    <div className="cf_pass">
                        <input type={typeNewPass ? "text" : "password"} className="form-control"name="newPassword"
                            value={newPassword} onChange={handleChangePassword}
                            style={{background: `${alert.cf_password ? 'crimson' : ''}`}} />

                        <small onClick={() => setTypeNewPass(!typeNewPass)}>
                            {typeNewPass ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </small>
                    </div>
                    <small className="form-text text-danger">
                        {alert.cf_password ? alert.cf_password : ''}
                    </small>
                </div>

                <div className="mb-3">
                <label className="form-label">ยืนยันรหัสผ่านใหม่</label>
                    <div className="cf_pass">
                        <input type={typeCfNewPass ? "text" : "password"} className="form-control"name="cfNewPassword"
                            value={cfNewPassword} onChange={handleChangePassword}
                            style={{background: `${alert.cf_password ? 'crimson' : ''}`}} />

                        <small onClick={() => setTypeCfNewPass(!typeCfNewPass)}>
                            {typeCfNewPass ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </small>
                    </div>
                    <small className="form-text text-danger">
                        {alert.cf_password ? alert.cf_password : ''}
                    </small>
                </div>
            
            <div className="d-grid mt-4 gap-2 col-md-6 mx-auto my-3">
                <button className="btn btn-primary" type="submit">
                    <CheckOutlined /> อัพเดทข้อมูล
                </button>
                <button className="btn btn-secondary" type="reset">
                    <RollbackOutlined /> รีเซ็ต
                </button>
            </div>

        </form>
    )
}

export default EditPassword
