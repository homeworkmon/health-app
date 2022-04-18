import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LogoutIcon from '@mui/icons-material/Logout'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'


const MenuDrawer = ({ setToken, mobileOpen, drawerWidth, ...other }) => {
  const client = useApolloClient()
  let navigate = useNavigate()

  const menuItems = [
    {
      text: 'Profile',
      icon: <AccountCircleIcon />,
      onClick: () => navigate('/')
    },
    {
      text: 'Appointments',
      icon: <CalendarMonthIcon />,
      onClick: () => navigate('/appointments')
    },
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      onClick: () => handleLogout()
    }
  ]

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
    navigate('/')
  }

  return (
    <Drawer sx={{
      width: 200,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      }
    }}
    anchor="left"
    open={mobileOpen}
    {...other}
    >
      <Typography variant="h5" align="center" sx={{ m: 2 }}>
            Health App
      </Typography>
      <List>
        {menuItems.map((item) => {
          const { text, icon, onClick } = item
          return (
            <ListItem button key={text} onClick={onClick}>
              {<ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}

export default MenuDrawer