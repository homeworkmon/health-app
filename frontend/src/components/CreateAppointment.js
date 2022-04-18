/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react' 
import { format, isEqual, addBusinessDays, addMinutes, setMilliseconds } from 'date-fns'
import { useLazyQuery, useMutation } from '@apollo/client'
import { BOOKED_APPTS, CREATE_APPT, GET_USER_APPTS } from '../queries'
import ProviderMenu from './providerMenu'
import Box from '@mui/material/Box'
// re-use custom form component and hook
import { Form, useForm } from './useForm'
import DateMenu from './dateMenu'
import TimeMenu from './timeMenu'
import { CustomButton } from './formControls'

const initialFieldValues = {
  provider: '',
  date: '',
  time: ''
}

const generateHours = (date) => {
  let slots = [date]
  let curr = date
  while (curr.getHours() < 17) {
    curr = addMinutes(curr, 30)
    curr.setMilliseconds(0)
    slots.push(curr)
  }
  return slots
}

const generateDay = (prev, booked) => {
  const day = addBusinessDays(prev, 1)
  day.setHours(9, 0, 0)
  setMilliseconds(day, 0)
  const times = generateHours(day)
  const bookedDates = booked.map(appt => new Date(appt.date))
  const result = times.filter(t => bookedDates.some(b => isEqual(b, t))===false)
  if (result.length > 1) {
    return {date: format(day, 'cccc d MMMM yyyy'), times: result}
  }
  return false
}

const generateAvailability = (booked) => {
  let week = []
  let curr = new Date()
  while (week.length < 5) {
    const t = generateDay(curr, booked)
    if (t) {
      week.push(t)
    }
    curr = addBusinessDays(curr, 1)
  }
  return week
}

const CreateAppointment = ({ setOpenPopup }) => {
  const [step, setStep] = useState(0)
  const [available, setAvailable] = useState([])
  const [apptsByProvider, result] = useLazyQuery(BOOKED_APPTS)
  const [createAppt] = useMutation(CREATE_APPT, {
    refetchQueries: [ { query: GET_USER_APPTS }]
  })

  const validate = (step) => {

    if (step === 0) {
      if( values.provider === '' ||  values.provider === 'None') {
        setErrors({provider: 'Please select an option'})
        return true
      } 
      return false
    }
    else if (step === 1) {
      if ( values.date === '' ||  values.date === 'None' ) {
        setErrors({date: 'Please select an option'})
        return true
      } 
      return false
    }
    else if (step === 2) {
      if ( values.time === '' ||  values.time === 'None' ) {
        setErrors({time: 'Please select an option'})
        return true
      }
      return false
    }
  }

  // don't check for all validate fields here bc multi-step form
  const handleSubmit = (e) => {
    setOpenPopup(false)
    e.preventDefault()
    setValues(initialFieldValues)
    setErrors({})
    createAppt({ variables: { provider: values.provider, date: format(new Date(values.date + ' ' + values.time), 'yyyy-MM-dd HH:mm') }})
  }

  const {
    values, 
    setValues,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialFieldValues, false, validate)

  const queryProvider = (provider) => {
    apptsByProvider({ variables: { provider: provider }})
  }

  useEffect(() => {
    if (result.data) {
      setAvailable(generateAvailability(result.data.apptByProvider))
    }
  }, [result.data])
    
  return (
    <Form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
      <Box>
        <ProviderMenu handleChange={handleInputChange} step={step} values={values} error={errors.provider} query={queryProvider}/>
        <DateMenu handleChange={handleInputChange} step={step} values={values} error={errors.date} available={available} />
        <TimeMenu handleChange={handleInputChange} step={step} values={values} error={errors.time} available={available} />
      </Box>
      <CustomButton
        text={ step === 2 ? 'submit' : 'next'}
        onClick={() => validate(step) ? null : setStep(step+1)}
        isSubmit={step > 2 ? true : false}
        sx={{alignSelf: 'flex-end', mt: 2}}>
      </CustomButton>
    </Form>
  )
}

export default CreateAppointment