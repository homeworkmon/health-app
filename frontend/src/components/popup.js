import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import { ActionButton } from '../components/formControls'

const Popup = ({ openPopup, setOpenPopup, title, children}) => {

  return (
    <div>
      <Dialog open={openPopup} maxWidth='sm' fullWidth= { true }
        sx={{
          '& .MuiPaper-root': {position: 'absolute', top: 1},
          '& .MuiTypography-root': {pt: 1, pb: 1}
        }}>
        <DialogTitle>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Typography variant='h6' component='div' style={{flexGrow:1}}>{title}</Typography>
            <ActionButton
              onClick={() => setOpenPopup(false)}
            >
              {<CloseIcon/>}
            </ActionButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Popup