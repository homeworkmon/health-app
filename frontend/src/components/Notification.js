import React from 'react'
import Alert from '@mui/material/Alert'

const Notification = ({ message, severity, display, ...other }) => {
  if (display===false) {
    return null
  }

  return (
    <Alert severity={severity} {...other}>
      {message}
    </Alert>
  )
}

export default Notification