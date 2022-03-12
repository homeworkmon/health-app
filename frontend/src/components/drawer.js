import React from 'react'
import {
  useNavigate
} from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LogoutIcon from '@mui/icons-material/Logout'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'


const MenuDrawer = () => {
  let navigate = useNavigate()


  const menuItems = [
    {
      text: 'Profile',
      icon: <AccountCircleIcon />,
      onClick: () => navigate('/profile')
    },
    {
      text: 'Appointments',
      icon: <CalendarMonthIcon />,
      onClick: () => navigate('/appointments')
    },
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      onClick: () => navigate('/')
    }
  ]

  return (
    <Drawer sx={{
      width: 200,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 200,
        boxSizing: 'border-box',
      },
    }}
    variant="permanent" 
    anchor="left"
    >
      <Typography variant="h5" align="center">
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