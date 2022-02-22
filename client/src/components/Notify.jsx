import { LinearProgress } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { GLOBALTYPES } from '../redux/actions/globalTypes';

const Notify = () => {

    const { alert } = useSelector(state => state)
    const dispatch = useDispatch();

    useEffect(() => {
        if(alert.error) toast.error(`${alert.error}`)
        if(alert.warning) toast.warning(`${alert.warning}`)
        if(alert.success)toast.success(`${alert.success}`)
        if(alert.info) toast.info(`${alert.info}`)
        return dispatch({type: GLOBALTYPES.ALERT, payload: {}}) 
    }, [alert.error, alert.warning, alert.success, alert.info, dispatch])


    return (
        <div className='fixed-top'>
            {alert.loading && <LinearProgress />}
        </div>
    )
}

export default Notify
