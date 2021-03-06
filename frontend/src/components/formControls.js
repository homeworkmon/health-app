import React from 'react'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'

export const Input = ({ name, label, value, onChange, required, error=null, ...other }) => {
  return (
    <div>
      <TextField 
        variant="filled"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        required={required ? true : false}
        {...other}
        {...(error && { error:true, helperText:error})}
      />
    </div>
  )
}

export const CustomSelect = ({ name, label, value, onChange, options, error=null }) => {
  return (
    <FormControl
      variant="filled"
      {...(error && { error:true, helpertext:error})}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        defaultValue=''
      > 
        {
          options.map(
            item => (<MenuItem key={item} value={item}>{item}</MenuItem>)
          )
        }
      </Select>
      { error && <FormHelperText>{error}</FormHelperText> }
    </FormControl>
  )
}

export const CustomCheckbox = ({ name, label, value, onChange, required }) => {

  const convertToDefEventPara = (name, value) => ({
    target: {
      name, value
    }
  })

  return (
    <FormControl>
      <FormControlLabel 
        control={<Checkbox 
          name={name}
          color="primary"
          checked={value}
          onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
          required={required ? true : false}
        />}
        label={label}
      />
    </FormControl>
  )
}

export const CustomDatePickerYear = ({ name, label, value, onChange, error=null }) => {

  const convertToDefEventPara = (name, value) => ({
    target: {
      name, value
    }
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={e => onChange(convertToDefEventPara(name, e))}
        renderInput={(props) => <TextField {...props}
          {...(error && { error:true, helperText:error})}
        />}
      />
    </LocalizationProvider>
  )
}

export const CustomButton = ({ text, size, color, variant, onClick, isSubmit=false, ...other}) => {

  if (isSubmit) {
    return (
      <Button
        sx={{m: 2, spacing: 0.5}}
        variant={variant || 'contained'}
        size={size || 'large'}
        color={color || 'primary'}
        onClick={onClick}
        type='submit'
        {...other}>
        {text}
      </Button>
    )
  }

  return (
    <Button
      sx={{m: 2, spacing: 0.5}}
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      {...other}>
      {text}
    </Button>
  )
}

export const ActionButton = ({color, children, onClick}) => {

  return (
    <Button
      onClick={onClick}
      color={color || 'secondary'}
      size='medium'
      sx={{
        minWidth: 0,
        alignSelf: 'flex-start',
        justifySelf: 'flex-start'
      }}
    >
      {children}
    </Button>
  )
}