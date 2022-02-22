import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    AntDesignOutlined,
    RollbackOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
} from '@ant-design/icons'
import { register } from '../redux/actions/authAction';


function Register() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { auth, alert } = useSelector(state => state)
    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)

    const initialState = {
        villagers_id: '', password: '', cf_password: '', full_name: '', house_number: '', alley: ''
    }

    const [userData, setUserData] = useState(initialState);
    const { villagers_id, password, cf_password, full_name, house_number, alley } = userData

    const handleChangeInput = (e) => {
        const {name, value} = e.target
        setUserData({...userData, [name]:value })
    }

    const submitHandle = (e) => {
        e.preventDefault();
        dispatch(register(userData))
    }

    useEffect(() => {
        if(auth.token) history.push("/")
    }, [auth.token, history])


    return (
        <div className="container mt-5">
            
            <div className="row mb-3">
                <form className="card col-md-4 mx-auto" onSubmit={submitHandle}>
                    <div className="m-md-3">

                    <div className="text-center mt-4">
                        <h3><i className="fas fa-user-plus text-success"/> สมัครสมาชิก</h3>
                        <h6>กรุณากรอกข้อมูลให้ตรงกับความเป็นจริงเพื่อความรวดเร็วในการยืนยันตัวตน</h6>
                    </div>
                    <hr className="mx-auto w-75"/>

                        <div className="mb-2">
                            <label className="form-label mt-4">เบอร์โทรศัพท์</label>
                                <input type="text" className="form-control" name="villagers_id"
                                onChange={handleChangeInput} value={villagers_id} 
                                style={{background: `${alert.villagers_id ? 'crimson' : ''}`}} />

                                <small className="form-text text-danger">
                                    {alert.villagers_id ? alert.villagers_id : ''}
                                </small>
                        </div>
                        
                        <div className="mb-2">
                        <label className="form-label">ชื่อ-สกุล</label>
                            <input type="text" className="form-control" name="full_name"
                            value={full_name} onChange={handleChangeInput}
                            style={{background: `${alert.full_name ? 'crimson' : ''}`}} />

                            <small className="form-text text-danger">
                                {alert.full_name ? alert.full_name : ''}
                            </small>
                        </div>

                        <div className="mb-2">
                        <label className="form-label">บ้านเลขที่</label>
                            <input type="text" className="form-control" name="house_number"
                            value={house_number} onChange={handleChangeInput}
                            style={{background: `${alert.house_number ? 'crimson' : ''}`}} />

                            <small className="form-text text-danger">
                                {alert.house_number ? alert.house_number : ''}
                            </small>
                        </div>

                        <label className="form-label">ซอย</label>
                            <input type="text" className="form-control mb-2" name="alley"
                            value={alley} onChange={handleChangeInput}/>


                        <div className="mb-2">
                        <label className="form-label">รหัสผ่าน</label>
                            <div className="pass">
                                <input type={typePass ? "text" : "password"} className="form-control" name="password"
                                value={password} onChange={handleChangeInput}
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
                        <label className="form-label">ยืนยันรหัสผ่าน</label>
                            <div className="cf_pass">
                                <input type={typeCfPass ? "text" : "password"} className="form-control"name="cf_password"
                                    value={cf_password} onChange={handleChangeInput}
                                    style={{background: `${alert.cf_password ? 'crimson' : ''}`}} />

                                <small onClick={() => setTypeCfPass(!typeCfPass)}>
                                    {typeCfPass ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                </small>
                            </div>
                            <small className="form-text text-danger">
                                {alert.cf_password ? alert.cf_password : ''}
                            </small>
                        </div>


                        <div className="d-grid gap-2 col-md-6 mx-auto my-3">
                            <button className="btn btn-success" type="submit">
                                <AntDesignOutlined/> สมัครสมาชิก
                            </button>
                            <button className="btn btn-secondary" type="reset">
                                <RollbackOutlined /> รีเซ็ต
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
