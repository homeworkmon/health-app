import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { CustomButton, Input } from '../components/formControls'
import { Form, useForm } from '../components/useForm'
import Notification from '../components/Notification'

const initialFieldValues = {
  username: '',
  password: ''
}

const LoginForm = ({ setToken, pageStyle }) => {
  const [message, setMessage] = useState('')
  const [display, setDisplay] = useState(false)
  let navigate = useNavigate()

  const [ login, result ] = useMutation(LOGIN , {
    onError: (error) => {
      setMessage(error.graphQLErrors[0].message)
      setDisplay(true)
      setTimeout(() => setDisplay(false), 1500)
      setTimeout(() => setMessage(''), 1500)
    } 
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const validate = (fieldValues = values) => {
    let temp = {...errors}
    if (fieldValues.username === '') {
      temp.username = 'Please enter a username'
    }
    if (fieldValues.password === '') {
      temp.password = 'Please enter a password'
    }
    setErrors ({ ...temp })
  }

  const {
    values, 
    setValues,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialFieldValues, false, validate)
    
  const submit = async (e) => {
    e.preventDefault()
    await login({ variables: { ...values }})
    setValues(initialFieldValues)
    setErrors('')
  }
    
  return (
    <div style={{...pageStyle, alignItems: 'center'}}>
      <Typography variant='h4' sx={{justifySelf: 'flex-start', mt: 3}}>My Health App</Typography>
      <Form 
        onSubmit={submit} 
        style={{
          marginTop: '36px',
          width: '80%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'}}>
        <Box sx={{width: {xs: '100%', sm: '50%', lg: '25%'}}}>
          <Notification message={message} display={display} severity='error' sx={{m: 2}}/>
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
            />
            <Input
              name='password'
              type='password' 
              label='Password'
              value={values.password}
              onChange={handleInputChange}
            />
            <Box>
              <CustomButton type='Sign In' text='submit'></CustomButton>
            </Box>
            <Divider sx={{ width: '70%', alignSelf: 'center'}}/>
            <Box>
              <CustomButton text='Sign Up' color='secondary' onClick={() => navigate('/signup')}></CustomButton>
            </Box>
          </Stack>
        </Box>
      </Form>
    </div>
  )
}

export default LoginForm