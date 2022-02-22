import React from 'react'
import LoadToRedirect from './LoadToRedirect'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'

export const MemberRoute = ({ children, ...rest }) => {
    const { auth } = useSelector(state => state)
    return (auth?.user?.role === 1 || auth?.user?.role === 2)
    ? <Route {...rest} />
    : <LoadToRedirect />
}

export default MemberRoute