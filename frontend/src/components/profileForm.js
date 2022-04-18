import React, { useEffect, useState } from 'react'
import { isSameDay } from 'date-fns'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_PROFILE, GET_PROFILE } from '../queries'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import { Form, useForm } from './useForm'
import Notification from './Notification'
import { Input, CustomSelect, CustomCheckbox, CustomDatePickerYear, CustomButton } from './formControls'

const initialFieldValues = {
  name: '',
  dob: new Date(),
  healthcard: '',
  street: '',
  city: '',
  postalCode: '',
  gender: '',
  maritalStatus: '',
  phone: '',
  contactByPhone: false,
  emergencyContact: '',
  emergencyPhone: '',
  allergies: false,
  allergyDetails: '',
  medications: false,
  medicationDetails: '',
  id: ''
}

const maritalOptions = ['single', 'married', 'separated']

const isToday = (date) => {
  return isSameDay(new Date(), new Date(date))
}

const ProfileForm = () => {
  const [display, setDisplay] = useState(false)
  const result = useQuery(GET_PROFILE)
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [{ query: GET_PROFILE }]
  })

  useEffect(() => {
    if (result.data) {
      if (result.data.getProfile.profile) {
        setValues(result.data.getProfile.profile)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if('dob' in fieldValues)
      temp.dob = isToday(fieldValues.dob) ? 'Date of Birth is required': ''
    if('phone' in fieldValues)
      temp.phone = (/^[0-9]{3}[-]?[0-9]{3}[-]?[0-9]{4}$/).test(fieldValues.phone) ? '' : 'Phone format is not valid'
    if('postalCode' in fieldValues)
      temp.postalCode = (/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i).test(fieldValues.postalCode)? '': 'Postal Code format is not valid'
    if('healthcard' in fieldValues)
      temp.healthcard = (/^[0-9]{4}[-]?[0-9]{3}[-]?[0-9]{3}[-]?[A-Z]{2}$/i).test(fieldValues.healthcard)? '': 'Health Card format is not valid'
    if('emergencyPhone' in fieldValues)
      temp.emergencyPhone = (/^[0-9]{3}[-]?[0-9]{3}[-]?[0-9]{4}$/).test(fieldValues.emergencyPhone) ? '' : 'Phone format is not valid'
    setErrors({
      ...temp
    })

    if(fieldValues === values)
      return Object.values(temp).every(x => x === '')
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialFieldValues, true, validate)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      updateProfile({
        variables: {
          ...values
        }
      })
      setDisplay(true)
      setTimeout(() => setDisplay(false), 4000)
    }
  }

  const resetForm = () => {
    setValues(initialFieldValues)
    setErrors({})
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Notification message={'Information updated'} severity={'success'} display={display}/>
      <Grid container sx={{ '& .MuiFormControl-root': { width: '70%', m: 1 } }}>
        <Grid item xs={12} md={6} align="center">
          <Input
            label='Name'
            name='name'
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
            required={true}
          />
          <CustomDatePickerYear
            label="Date of Birth"
            name="dob"
            value={values.dob}
            onChange={handleInputChange}
            required={true}
            error={errors.dob}
          />
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup row
              name="gender"
              value={values.gender}
              onChange={handleInputChange}
              required={true}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          <Input
            label="Healthcard"
            name="healthcard"
            value={values.healthcard}
            onChange={handleInputChange}
            required={true}
            error={errors.healthcard}
          />
          <Input
            label="Street"
            name="street"
            value={values.street}
            onChange={handleInputChange}
          />
          <Input
            label="City"
            name="city"
            value={values.city}
            onChange={handleInputChange}
          />
          <Input
            label="Postal Code"
            name="postalCode"
            value={values.postalCode}
            onChange={handleInputChange}
            required={true}
            error={errors.postalCode}
          />
          <CustomSelect
            name="maritalStatus"
            label="Marital Status"
            value={values.maritalStatus}
            onChange={handleInputChange}
            options={maritalOptions}
          />
        </Grid>
        <Grid item ></Grid>
        <Grid item xs={12} md={6} align="center">
          <Input
            label="Phone Number"
            name="phone"
            value={values.phone}
            onChange={handleInputChange}
            required={true}
            error={errors.phone}
          />
          <CustomCheckbox
            name="contactByPhone"
            label="Contact By Phone?"
            value={values.contactByPhone}
            onChange={handleInputChange}
          />
          <Input
            label="Emergency Contact"
            name="emergencyContact"
            value={values.emergencyContact}
            onChange={handleInputChange}
            required={true}
          />
          <Input
            label="Emergency Contact Phone Number"
            name="emergencyPhone"
            value={values.emergencyPhone}
            onChange={handleInputChange}
            required={true}
            error={errors.emergencyPhone}
          />
          <CustomCheckbox
            name="allergies"
            label="Allergies?"
            value={values.allergies}
            onChange={handleInputChange}
          />
          <Input
            label="Allergy Details"
            name="allergyDetails"
            value={values.allergyDetails}
            onChange={handleInputChange}
          />
          <CustomCheckbox
            name="medications"
            label="Medications?"
            value={values.medications}
            onChange={handleInputChange}
          />
          <Input
            label="Medication Details"
            name="medicationDetails"
            value={values.medicationDetails}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item md={6} sx={{ display: { xs: 'none', md:'block' } }}></Grid>
        <Grid item xs={12} md={6} display='flex' justifyContent='space-evenly'>
          <CustomButton
            text='reset'
            onClick={resetForm}
            color='secondary'
          />
          <CustomButton
            text='submit'
            type='submit'
          />
        </Grid>
      </Grid>
    </Form>
  )
}

export default ProfileForm