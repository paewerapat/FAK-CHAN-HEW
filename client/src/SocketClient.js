import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from './redux/actions/globalTypes'

import { toast } from 'react-toastify'
import audiobell from './audio/audioNotice.mp3'
import { NOTIFY_TYPES } from './redux/actions/notifyAction'


const spawnNotifications = (body, icon, url, title) => {
    let options = {
        body, icon 
    }
    let n = new Notification(title, options)

    n.onclick = e => {
        e.preventDefault()
        window.open(url, '_blank')
    }
}

const SocketClient = () => {

    const { auth, socket, notify, online } = useSelector(state => state)
    const dispatch = useDispatch()
    const audioRef = useRef()

    // join user
    useEffect(() => {
        socket.emit('joinUser', auth.user)
    }, [socket, auth.user])


    // Check User Online
    useEffect(() => {
        socket.emit('checkUserOnline', auth.user)
    }, [socket, auth.user])

    useEffect(() => {
        socket.on('checkUserOnlineToMe', data => {
            data.forEach(item => {
                if(!online.includes(item.id)){
                    dispatch({type: GLOBALTYPES.ONLINE, payload: item.id})
                }
            })
        })
        return () => socket.off('checkUserOnlineToMe')
    }, [socket, dispatch, online])

    useEffect(() => {
        socket.on('checkUserOnlineToClient', id => {
            if(!online.includes(id)){
                dispatch({type: GLOBALTYPES.ONLINE, payload: id})
            }
        })
        return () => socket.off('checkUserOnlineToClient')
    }, [socket, dispatch, online])


    // Check User Offline
    useEffect(() => {
        socket.on('CheckUserOffline', id => {
            dispatch({type: GLOBALTYPES.OFFLINE, payload: id})
        })
        return () => socket.off('CheckUserOffline')
    }, [socket, dispatch])


    // Notification
    useEffect(() => {
        socket.on('createNotifyToClient', msg => {
            dispatch({type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg})

            if(notify.sound) audioRef.current.play()
            spawnNotifications(
                msg.text,
                JSON.parse(msg.avatar)[0],
                msg.url,
                'FAK CHAN HEW'
            )

            toast(msg.text)
        })
        return () => socket.off('createNotifyToClient')
    }, [socket, dispatch, notify.sound])


    return (
        <>
            <audio controls ref={audioRef} style={{display: 'none'}} >
                <source src={audiobell} type="audio/mp3" />
            </audio>
        </>
    )

}

export default SocketClient
