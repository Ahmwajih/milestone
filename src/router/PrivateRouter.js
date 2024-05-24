import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

function PrivateRouter() {
const currentUser  = sessionStorage.getItem('username')
if (!currentUser) {
    toast.error('Please login')
    return <Navigate to="/login" />
} else {
    return <Outlet />
}
 }

export default PrivateRouter