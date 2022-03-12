import React, { useState } from 'react'
import { 
  Route,
  Routes
} from 'react-router-dom'

// components
import Appointments from './pages/appointments'
import Profile from './pages/profile'
import Login from './pages/login'
import MenuDrawer from './components/drawer'


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  // const [login, setLogin] = useState(false)

  /* const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    // setLogin(false)
  } */

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

  if (!token) {
    return (
      <Login setToken={setToken} />
    )
  }

  return (
    <div className="base" style={baseStyle}>
      <MenuDrawer /> 
      <Routes>
        <Route path="/profile" element={<Profile pageStyle={pageStyle} />} />
        <Route path="/appointments" element={<Appointments pageStyle={pageStyle} />} />
        <Route path="/" element={<Login setToken={setToken} pageStyle={pageStyle}/>} />
      </Routes>
    </div>
  )
}

export default App