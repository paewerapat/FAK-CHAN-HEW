import React from 'react'
import LoadToRedirect from './LoadToRedirect'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'

export const ManagerRoute = ({ children, ...rest }) => {
    const { auth } = useSelector(state => state)
    return auth.user && auth.user.role === 2
    ? <Route {...rest} />
    : <LoadToRedirect />
}

export default ManagerRoute