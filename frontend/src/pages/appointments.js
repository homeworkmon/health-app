import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_USER_APPTS, GET_ALL_APPTS } from '../queries'
import moment from 'moment'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import PageHeader from '../components/pageHeader'
import useTable from '../components/useTable'

const headCells = [
  {id: 'date', label: 'Date'},
  {id: 'time', label: 'Time'},
  {id: 'provider', label: 'Provider'}
]

const Appointments = ({ pageStyle }) => {
  const result = useQuery(GET_USER_APPTS)
  const [records, setRecords] = useState([])

  useEffect(() => {
    if (result.data) {
      if (result.data.apptByUser) {
        setRecords(result.data.apptByUser)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const {
    TblContainer
  } = useTable(records, headCells)

  if (result.loading)
    return <div>loading</div>
    

  return (
    <div style={pageStyle}>
      <PageHeader title={'Appointments'} subtitle={'My Appointments'} icon={<CalendarMonthIcon fontSize={'large'}/>}/>
      <TblContainer>
        <TableBody>
          {records.map(item => 
            (<TableRow key={item.id}>
              <TableCell>{moment((item.date)).format('DD-MMMM-YYYY')}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>{item.provider}</TableCell>
            </TableRow>)
          )} 
        </TableBody>
      </TblContainer>
    </div>
  )
}

export default Appointments