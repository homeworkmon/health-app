import React, { useState } from 'react'
import { green } from '@mui/material/colors'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'

const useTable = (headCells) => {
  const [records, setRecords] = useState([])
  const pages = [5, 10]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[page])

  const TblContainer = props => (
    <Table sx={{
      '& thead th' :{
        fontWeight: 1000,
        fontSize: 'medium',
        backgroundColor: green[200]
      },
      '& tbody tr:hover' :{
        backgroundColor: green[50],
        cursor: 'pointer'
      }
    }}>
      {props.children}
    </Table>
  )

  const TblHead = () => {
    return (
      <TableHead>
        <TableRow>
          { headCells.map(headCell => (
            <TableCell key={headCell.id}>
              {headCell.label}
            </TableCell>))}
        </TableRow>
      </TableHead>
    )
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value,10))
    setPage(0)
  }

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions = {pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )

  const recordsAfterPagingAndSorting = () => {
    console.log('executing records after paging and sorting')
    return records.slice(page*rowsPerPage,(page+1)*rowsPerPage)
  }

  return {
    setRecords,
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  }

}

export default useTable