import React from 'react'
import '@fontsource/roboto/400.css'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import PageHeader from '../components/pageHeader'
import ProfileForm from '../components/profileForm'
import Paper from '@mui/material/Paper'


const Profile = ({ pageStyle }) => {

  return (
    <div style={pageStyle} className='profile'>
      <PageHeader title={'Profile'} subtitle={'Your Health Profile'} icon={<HealthAndSafetyIcon/>}/>
      <Paper sx={{m: 2}}>
        <ProfileForm />
      </Paper>
    </div>
  )
}

export default Profile