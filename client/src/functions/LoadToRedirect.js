import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { LinearProgress } from '@mui/material';

const LoadToRedirect = () => {

    const history = useHistory();
    const [count, setCount] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000)

        // Redirect To
        count === 0 && history.push('/');
        return () => clearInterval(interval);
    }, [count, history])

    return (
        <div className=''>
            <LinearProgress />
            <div className="container mt-5 text-center">
                <p>คุณไม่มีสิทธิ์ในการใช้งาน กรุณาเข้าสู่ระบบหรือรอการยืนยันตัวตนหากเข้าสู่ระบบแล้ว.</p>
                <h6>กำลังเปลี่ยนเส้นทางใน {count}...</h6>
            </div>
        </div>
    )
}

export default LoadToRedirect
