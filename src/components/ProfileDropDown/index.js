// ** React Imports
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ** Constant Imports
import { strings } from '../../constants/strings'

// ** MUI Imports
import { Menu, MenuItem, Avatar, IconButton, Typography } from '@mui/material'

// ** Redux Imports
import { useDispatch } from 'react-redux'
import { logout } from '../../features/authSlice'

const ProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Open Menu
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  // Close Menu
  const handleClose = () => {
    setAnchorEl(null)
  }

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
    handleClose()
  }

  return (
    <>
      {/* Avatar Button */}
      <IconButton onClick={handleClick} sx={{ p: 0 }}>
        <Avatar alt='Admin' src='/path-to-avatar.jpg' />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} sx={{ mt: 1 }}>
        <MenuItem>
          <Typography>{strings.viewProfile}</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>{strings.changePassword}</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography color='error'>{strings.logout}</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

export default ProfileDropdown
