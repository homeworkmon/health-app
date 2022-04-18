import React from 'react'
import Box from '@mui/material/Box'
import { CustomSelect } from './formControls'

const providers = [
  'Dr. Snap',
  'Dr. Crackle',
  'Dr. Pop'
]

const ProviderMenu = ({ handleChange, step, values, error, query }) => {

  if (step !== 0) {
    return null
  }

  const handleSelect = (e) => {
    handleChange(e)
    query(e.target.value)
  }

  return (
    <Box sx={{
      '& .MuiFormControl-root': {
        width: '100%'
      }
    }}>
      <CustomSelect 
        name={'provider'}
        label={'Provider'}
        value={values.provider} 
        onChange={handleSelect}
        options={providers}
        error={error}>
      </CustomSelect>
    </Box>
  )
}

export default ProviderMenu