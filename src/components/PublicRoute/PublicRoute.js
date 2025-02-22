// ** React Imports
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  return isAuthenticated ? <Navigate to='/' /> : children // Redirect to home if logged in
}

export default PublicRoute
