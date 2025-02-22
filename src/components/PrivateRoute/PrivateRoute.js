// ** React Imports
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => {
  // ** Check if the user is logged in by verifying the localStorage key
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  return isAuthenticated ? children : <Navigate to='/login' /> // ** If not logged in, redirect to login
}

export default PrivateRoute
