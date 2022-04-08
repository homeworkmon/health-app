import React from 'react'
import PageHeader from '../components/pageHeader'
import ProfileForm from '../components/profileForm'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'


const Profile = ({ pageStyle }) => {

  return (
    <div style={pageStyle} className='profile'>
      <PageHeader title={'Profile'} subtitle={'My Health Profile'} icon={<AccountCircleIcon fontSize={'large'}/>}/>
      <Paper sx={{display: 'flex', width: {md: '70%', xs: '100%'}, alignSelf: 'center', justifyContent: 'center', pt: 1, m: 0}}>
        <Box sx={{ width: { xs: '100%', md: '100%', lg: '70%'}}}>
          <ProfileForm />
        </Box>
      </Paper>
    </div>
  )
}

export default Profile