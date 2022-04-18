import React, { useState } from 'react'
import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Appointments from './pages/appointments'
import CreateAccount from './pages/createAccount'
import Profile from './pages/profile'
import Login from './pages/login'
import MenuDrawer from './components/drawer'

const drawerWidth = '200px'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const baseStyle = {
    display: 'flex',
    height: '100%',
    width: '100%'
  }

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  }

  if (!token && location.pathname==='/signup') {
    return (
      <>
        <CreateAccount pageStyle={pageStyle} />
      </>
    )
  }

  else if (!token && location.pathname==='/') {
    return (
      <>
        <Login setToken={setToken} pageStyle={pageStyle}/>
      </>
    )
  }

  return (
    <div className="base" style={baseStyle}>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, display: { xs: 'none', sm:'block' } }}
        aria-label='navigation menu'
      >
        <MenuDrawer setToken={setToken} variant='permanent' drawerWidth={drawerWidth}/>
      </Box>

      <Paper
        elevation={12}
        sx={{
          position: 'absolute',
          zIndex: 1,
          borderRadius: '50%',
          bottom: '20px',
          left: '20px'
        }}
      >
        <IconButton
          aria-label="open-drawer"
          onClick={handleDrawerToggle}
          color='primary'
          size='large'
        >
          <MenuIcon />
        </IconButton>
      </Paper>

      <MenuDrawer
        setToken={setToken}
        mobileOpen={mobileOpen}
        variant='temporary'
        drawerWidth={drawerWidth}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', sm:'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}/>

      <Routes>
        <Route path="/appointments" element={<Appointments pageStyle={pageStyle} />} />
        <Route path="/" element={<Profile pageStyle={pageStyle} />} />
      </Routes>
    </div>
  )
}

export default App