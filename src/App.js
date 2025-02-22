// ** React Imports
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

// ** Constant Imports
import { routes } from './constants/routes'

// ** Components Imports
import Navbar from './components/Navbar/Navbar'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import PublicRoute from './components/PublicRoute/PublicRoute'

// ** Pages Imports
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard'

// ** Styles Imports
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  // ** Vars
  const location = useLocation()

  // ** Conditionally render Navbar if the path is not "/login"
  const shouldShowNavbar = location.pathname !== '/login'

  return (
    <>
      {shouldShowNavbar && <Navbar />} {/* Show Navbar if not on the login page */}
      <Routes>
        <Route
          path={routes.dashboard}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.login}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
