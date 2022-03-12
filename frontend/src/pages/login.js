import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import Notification from '../components/notification'

const LoginForm = ({ setToken, pageStyle }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [ login, result ] = useMutation(LOGIN , {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
      setTimeout(() => setError(''), 1500)
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
    
  const submit = async (event) => {
    event.preventDefault()
    await login({ variables: { username, password }})
    setUsername('')
    setPassword('')
  }
    
  return (
    <div>
      <Notification error={error}/>
      <form onSubmit={submit}>
        <div style={pageStyle}>
            username <input
            type="text"
            value = {username}
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
            password <input
            value = {password}
            type="password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default LoginForm