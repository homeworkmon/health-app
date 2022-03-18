import React from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TabelCell'

const useTable = (records, headCells) => {

  const TblContainer = props => (
    <Table>
      {props.children}
    </Table>
  )

  const TblHead = props => {

    return (
      <TableHead>
        <TableRow>
          { headCells.map(headCell => (<TableCell key={headCell.id}>
            {headCell.label}
          </TableCell>))}
        </TableRow>
      </TableHead>
    )
  }

  return {
    TblContainer
  }

}

export default useTable