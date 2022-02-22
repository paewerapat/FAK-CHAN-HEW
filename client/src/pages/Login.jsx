import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { login } from '../redux/actions/authAction'
import {
    AntDesignOutlined,
    RollbackOutlined
} from '@ant-design/icons'
import { useDispatch } from 'react-redux';

function Login() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);

    const [villagers_id, setVillagers_id] = useState('');
    const [password, setPassword] = useState('');

    const submitHandle = (e) => {
        e.preventDefault();
        const values = {
            villagers_id,
            password
        }
        dispatch(login(values))
    }

    useEffect(() => {
        if(auth.token){
            history.push('/');
        }
    })


    return (
        <div className="container mt-5">
            
            <div className="row mb-3">
                <form className="card col-md-4 mx-auto" onSubmit={submitHandle}>
                    <div className="m-3">

                        <div className="text-center mt-4">
                            <h3><i className="fas fa-sign-in-alt text-primary"/> เข้าสู่ระบบ</h3>
                            <h6>ระบบจะลบข้อมูลการเข้าสู่ระบบเมื่อครบ 14 วัน<br/>เพื่อความปลอดภัยของผู้ใช้งาน</h6>
                        </div>    
                        <hr className="mx-auto w-75" />

                        <label class="form-label mt-4">เบอร์โทรศัพท์</label>
                            <input type="text" className="form-control mb-2"
                            value={villagers_id} onChange={(e) => setVillagers_id(e.target.value)}/>

                        <label class="form-label">รหัสผ่าน</label>
                            <input type="password" className="form-control mb-4" 
                            value={password} onChange={(e) => setPassword(e.target.value)}/>

                        <div className="d-grid gap-2 col-md-6 mx-auto mb-3">
                            <button className="btn btn-primary" type="submit">
                                <AntDesignOutlined/> ล็อคอิน
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

export default Login
