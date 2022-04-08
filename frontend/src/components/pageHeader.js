// COMPONENT DESIGN FROM https://github.com/CodAffection/Material-UI-Form-Design-and-Validation/
import React from 'react'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

const PageHeader = ({ title, subtitle, icon}) => {

  const divStyle = {
    padding: '16px',
    display: 'flex',
    marginTop: '5px',
    alignItems: 'center'
  }

  const textDivStyle = {
    paddingLeft: '24px',
    '.subtitle': {
      opacity: '0.6'
    }
  }

  return (
    <Paper elevation={0} square>
      <div style={divStyle}>
        <Card sx={{
          display: 'inline-block',
          padding: '18px',
          color: '#81C784'
        }}
        >
          {icon}
        </Card>
        <div style={textDivStyle}>
          <Typography
            variant="h6"
            component="div">
            {title}</Typography>
          <Typography
            variant="subtitle1"
            component="div"
            className="subtitle">
            {subtitle}</Typography>
        </div>
      </div>
    </Paper>
  )
}

export default PageHeader