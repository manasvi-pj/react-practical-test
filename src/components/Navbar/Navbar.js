// ** React Imports
import React from 'react'

// ** Constant Imports
import { strings } from '../../constants/strings'

// ** Component Imports
import ProfileDropdown from '../ProfileDropDown'

// ** MUI Imports
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Styles Imports
import * as styles from './NavbarStyles'

const Navbar = () => {
  return (
    <AppBar position='sticky' style={styles.appBar}>
      <Toolbar style={styles.toolBar}>
        <Box>
          <Typography variant='h6' flexGrow={1}>
            {strings.reactTestTitle}
          </Typography>
        </Box>

        <Box>
          <ProfileDropdown />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
