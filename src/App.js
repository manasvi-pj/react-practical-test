// ** React Imports
import React from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'

// ** MUI Imports
import { Button, Container } from '@mui/material'
import { Box } from '@mui/material'

// ** Constant Imports
import { strings } from './constants/strings'
import { routes } from './constants/routes'

// ** Components Imports
import Navbar from './components/Navbar/Navbar'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import PublicRoute from './components/PublicRoute/PublicRoute'

// ** Pages Imports
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Charts from './pages/Charts'

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
      <Box width={'100%'} height={'100%'}>
        <Container>
          {shouldShowNavbar && (
            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
              <Button variant={location.pathname === '/' ? 'contained' : 'outlined'} component={Link} to='/'>
                {strings.products}
              </Button>
              <Button
                variant={location.pathname === '/orders' ? 'contained' : 'outlined'}
                component={Link}
                to='/orders'
              >
                {strings.orders}
              </Button>
              <Button
                variant={location.pathname === '/charts' ? 'contained' : 'outlined'}
                component={Link}
                to='/charts'
              >
                {strings.charts}
              </Button>
            </Box>
          )}
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
              path={routes.orders}
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path={routes.charts}
              element={
                <PrivateRoute>
                  <Charts />
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
        </Container>
      </Box>
    </>
  )
}

export default App
