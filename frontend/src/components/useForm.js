import { useState } from 'react'

export const useForm = (initialFieldValues) => {
  const [values, setValues] = useState(initialFieldValues)

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }
    
  return {
    values, 
    setValues,
    handleInputChange
  }
}