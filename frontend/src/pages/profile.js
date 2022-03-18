import React from 'react'
// components
import PageHeader from '../components/pageHeader'
import ProfileForm from '../components/profileForm'
// mui imports
import '@fontsource/roboto/400.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Paper from '@mui/material/Paper'


const Profile = ({ pageStyle }) => {

  return (
    <div style={pageStyle} className='profile'>
      <PageHeader title={'Profile'} subtitle={'My Health Profile'} icon={<AccountCircleIcon fontSize={'large'}/>}/>
      <Paper sx={{display: 'flex', width: '80%', alignSelf: 'center', justifyContent: 'center', pt: 1, m: 0}}>
        <ProfileForm />
      </Paper>
    </div>
  )
}

export default Profile