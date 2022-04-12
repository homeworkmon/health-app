import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USER_APPTS, DELETE_APPT } from '../queries'
import { format } from 'date-fns'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Notification from '../components/Notification'
import PageHeader from '../components/pageHeader'
import useTable from '../components/useTable'
import { CustomButton } from '../components/formControls'
import Popup from '../components/popup'
import CreateAppointment from '../components/CreateAppointment'

const headCells = [
  {id: 0, label: 'Date'},
  {id: 1, label: 'Time'},
  {id: 2, label: 'Provider'},
  {id: 3}
]

const Appointments = ({ pageStyle }) => {
  const [display, setDisplay] = useState(false)
  const result = useQuery(GET_USER_APPTS)
  const [ deleteAppt ] = useMutation(DELETE_APPT, {
    refetchQueries: [{ query: GET_USER_APPTS }]
  })
  const [openPopup, setOpenPopup] = useState(false)

  console.log('component rendering')

  useEffect(() => {
    if (result.data) {
      if (result.data.apptByUser) {
        setRecords(result.data.apptByUser)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const {
    setRecords,
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(headCells)


  const removeAppt = (id) => {
    deleteAppt({ variables: { id: id }})
    setDisplay(true)
    setTimeout(() => setDisplay(false), 4000)
  }

  if (result.loading) {
    return <div>loading...</div>
  } else {

    return (
      <div style={pageStyle}>
        <PageHeader title={'Appointments'} subtitle={'My Appointments'} icon={<CalendarMonthIcon fontSize={'large'}/>}/>
        <Paper sx={{
          display: 'flex',
          width: {ml: '80%', xs: '100%'}, 
          height: 'auto', 
          flexDirection: 'column', 
          alignSelf: 'center', 
          justifyContent: 'space-between', 
          pt: 1, 
          m: 0}}>
          <Box sx={{m: 3, justifySelf: 'flex-start'}}>
            <Notification message={'Appointment deleted'} severity={'success'} display={display}/>
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map(item => 
                  (<TableRow key={item.id}>
                    <TableCell>{format(new Date(item.date), 'MMMM d Y')}</TableCell>
                    <TableCell>{format(new Date(item.date), 'h:mm a')}</TableCell>
                    <TableCell>{item.provider} </TableCell>
                    <TableCell><IconButton onClick={() => removeAppt(item.id)}><DeleteIcon /></IconButton></TableCell>
                  </TableRow>)
                )} 
              </TableBody>
            </TblContainer>
            <TblPagination />
          </Box>
          <Box sx={{m: 2, alignSelf: 'flex-end'}}>
            <CustomButton 
              color={'secondary'}
              text={'+ Create Appointment'}
              onClick={() => setOpenPopup(true)}>
            </CustomButton>
          </Box>
        </Paper>
        <Popup 
          setOpenPopup={setOpenPopup}
          openPopup={openPopup}
          title='Create Appointment'>
          <CreateAppointment setOpenPopup={setOpenPopup}/>
        </Popup>
      </div>
    )
  }
}

export default Appointments