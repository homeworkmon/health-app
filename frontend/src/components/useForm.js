import React, { useState } from 'react'

export const useForm = (initialFieldValues, validateOnChange=false, validate) => {
  const [values, setValues] = useState(initialFieldValues)
  const [errors, setErrors] = useState({})

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
    if(validateOnChange) 
      validate({[name]:value})
  }
    
  return {
    values, 
    setValues,
    errors,
    setErrors,
    handleInputChange
  }
}

export const Form = (props) => (
  <form autoComplete="off" {...props}>
    {props.children}
  </form>
)