import React from 'react'
import LoadToRedirect from './LoadToRedirect'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'

export const GuestRoute = ({ children, ...rest }) => {
    const { auth } = useSelector(state => state)
    return auth.user && auth.token
    ? <Route {...rest} />
    : <LoadToRedirect />
}

export default GuestRoute