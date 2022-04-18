import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { CREATE_ACCOUNT } from '../queries'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { CustomButton, Input } from '../components/formControls'
import { Form, useForm } from '../components/useForm'
import Notification from '../components/Notification'

const initialFieldValues = {
  username: '',
  password: ''
}

const CreateAccount = ({ pageStyle }) => {
  const navigate = useNavigate()
  const [severity, setSeverity] = useState('success')
  const [message, setMessage] = useState('')
  const [display, setDisplay] = useState(false)

  const [ signUp ] = useMutation(CREATE_ACCOUNT)
  /* , {
    onError: (error) => {
      setMessage(error.message)
      setSeverity('error')
      setDisplay(true)
    }
  }) */

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if('username' in fieldValues) {
      temp.username = fieldValues.username.length<3 ? 'Please make username longer than 3 characters': ''
    }
    if('password' in fieldValues) {
      temp.password = fieldValues.password.length<3 ? 'Please make username longer than 3 characters': ''
    }
    setErrors({ ...temp })

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(values)
    try {
      await signUp({ variables: { ...values } })
      setMessage('Account created!')
      setSeverity('success')
      setTimeout(
        () => navigate('/'),
        3000)
    } catch(error) {
      setMessage(error.message)
      setSeverity('error')
    }
    setValues(initialFieldValues)
    setDisplay(true)
    setTimeout(
      () => setDisplay(false),
      3000
    )
  }

  return (
    <div style={{ ...pageStyle, alignItems: 'center' }}>
      <Typography variant='h4' sx={{ justifySelf: 'flex-start', mt: 3 }}>Create Account</Typography>
      <Form
        onSubmit={handleSubmit}
        style={{
          marginTop: '36px',
          width: '80%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column' }}>
        <Box sx={{ width: { xs: '100%', sm: '50%', lg: '25%' } }}>
          <Notification message={message} display={display} severity={severity} sx={{ m: 2 }}/>
          <Stack spacing={3} align="center" sx={{
            '& .MuiFormControl-root': {
              width: '90%'
            }
          }}>
            <Input
              name='username'
              label='Username'
              value={values.username}
              onChange={handleInputChange}
              error={errors.username}
            />
            <Input
              name='password'
              type='password'
              label='Password'
              value={values.password}
              onChange={handleInputChange}
              error={errors.password}
            />
            <Box>
              <CustomButton text='Sign Up' color='primary' type="submit"></CustomButton>
            </Box>
          </Stack>
        </Box>
      </Form>
    </div>
  )
}

export default CreateAccount