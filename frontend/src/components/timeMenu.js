import React from 'react'
import { format } from 'date-fns'
import Box from '@mui/material/Box'
import { CustomSelect } from './formControls'

const TimeMenu = ({ handleChange, step, values, error, available }) => {

  if (step !== 2) {
    return null
  }
  
  const options = available.find(d => d.date === values.date).times

  return (
    <Box sx={{
      '& .MuiFormControl-root': {
        width: '100%'
      }
    }}>
      <CustomSelect 
        name={'time'}
        label={'Time'}
        value={values.time} 
        onChange={handleChange}
        options={options.map(t => format(t, 'h:mm a'))}
        error={error}>
      </CustomSelect>
    </Box>
  )
}

export default TimeMenu