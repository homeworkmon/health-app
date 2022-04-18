import React from 'react'
import Box from '@mui/material/Box'
import { CustomSelect } from './formControls'


const DateMenu = ({ handleChange, step, values, error, available }) => {

  if (step !== 1) {
    return null
  }

  return (
    <Box sx={{
      '& .MuiFormControl-root': {
        width: '100%'
      }
    }}>
      <CustomSelect 
        name={'date'}
        label={'Date'}
        value={values.date} 
        onChange={handleChange}
        options={available.map(i => i.date)}
        error={error}>
      </CustomSelect>
    </Box>
  )
}

export default DateMenu