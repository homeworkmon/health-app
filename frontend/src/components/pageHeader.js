// CODE FROM https://github.com/CodAffection/Material-UI-Form-Design-and-Validation/blob/master/src/components/PageHeader.js
import React from 'react'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

const PageHeader = ({ title, subtitle, icon}) => {

  const divStyle = {
    padding: '24px',
    marginBottom: '18px',
    display: 'flex'
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
          color: '#3c44b1'
        }}>
          {icon}
        </Card>
        <div style={textDivStyle}>
          <Typography
            variant="h6"
            component="div">
            {title}</Typography>
          <Typography
            variant="subtitle2"
            component="div"
            className="subtitle">
            {subtitle}</Typography>
        </div>
      </div>
    </Paper>
  )
}

export default PageHeader