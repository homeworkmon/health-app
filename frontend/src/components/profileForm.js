import React from 'react'
import TextField from '@mui/material/TextField'
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
// import LocalizationProvider from '@mui/lab/LocalizationProvider'
// import DatePicker from '@mui/lab/DatePicker'
import Grid from '@mui/material/Grid'
import { useForm } from '../components/useForm'


const initialFieldValues = {
  name: '',
  dob: new Date(),
  healthcard: ' ',
  street: ' ',
  city: ' ',
  postalCode: ' ',
  gender: ' ',
  maritalStatus: ' ',
  phone: ' ',
  contactByPhone: false,
  emergencyContact: ' ',
  emergencyPhone: ' ',
  allergies: false,
  allergyDetails: ' ',
  medications: false,
  medicationDetails: ' ',
  id: ''
}

const ProfileForm = () => {

  const {
    values,
    handleInputChange
  } = useForm(initialFieldValues)

  return (
    <form>
      <Grid container>
        {/* using v5 MUI sx prop to style children w nested selector!*/}
        <Grid item xs={12} sx={{'& .MuiFormControl-root': { width: '60%', m: 2}}}>
          <TextField 
            variant="outlined"
            label="name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
          />
          <TextField 
            variant="outlined"
            label="healthcard"
            name="healthcard"
            value={values.healthcard}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default ProfileForm